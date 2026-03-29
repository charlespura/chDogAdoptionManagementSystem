const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

function requireAuth(req) {
  if (!req.user) {
    throw new Error('Authentication required');
  }
}

function requireAdmin(req) {
  requireAuth(req);
  if (req.user.role !== 'admin') {
    throw new Error('Admin access required');
  }
}

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    process.env.JWT_SECRET || 'change_this_secret',
    { expiresIn: '7d' }
  );
}

function mapDog(row) {
  return {
    id: row.id,
    name: row.name,
    breed: row.breed,
    age: row.age,
    gender: row.gender,
    status: row.status,
    imageUrl: row.image_url,
    description: row.description
  };
}

function mapApplication(row) {
  return {
    id: row.id,
    userId: row.user_id,
    dogId: row.dog_id,
    message: row.message,
    status: row.status,
    createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : row.created_at,
    dogName: row.dog_name || null,
    userName: row.user_name || null,
    userEmail: row.user_email || null
  };
}

function createResolvers(req) {
  return {
    me: async () => {
      if (!req.user) return null;
      const [rows] = await pool.query('SELECT id, name, email, role FROM users WHERE id = ?', [req.user.id]);
      return rows[0] || null;
    },

    getDogs: async ({ status, breed }) => {
      const filters = [];
      const values = [];

      if (status) {
        filters.push('status = ?');
        values.push(status);
      }

      if (breed) {
        filters.push('breed LIKE ?');
        values.push(`%${breed}%`);
      }

      const where = filters.length ? `WHERE ${filters.join(' AND ')}` : '';
      const [rows] = await pool.query(`SELECT * FROM dogs ${where} ORDER BY id DESC`, values);
      return rows.map(mapDog);
    },

    getDog: async ({ id }) => {
      const [rows] = await pool.query('SELECT * FROM dogs WHERE id = ?', [id]);
      return rows[0] ? mapDog(rows[0]) : null;
    },

    getApplications: async () => {
      requireAdmin(req);
      const [rows] = await pool.query(
        `SELECT a.*, d.name AS dog_name, u.name AS user_name, u.email AS user_email
         FROM applications a
         INNER JOIN dogs d ON d.id = a.dog_id
         INNER JOIN users u ON u.id = a.user_id
         ORDER BY a.created_at DESC`
      );
      return rows.map(mapApplication);
    },

    register: async ({ input }) => {
      const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [input.email]);
      if (existing.length) {
        throw new Error('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(input.password, 10);
      const [result] = await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [input.name, input.email, hashedPassword, 'user']
      );

      const user = {
        id: result.insertId,
        name: input.name,
        email: input.email,
        role: 'user'
      };

      return {
        token: signToken(user),
        user
      };
    },

    login: async ({ input }) => {
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [input.email]);
      const user = rows[0];

      if (!user) {
        throw new Error('Invalid credentials');
      }

      const passwordMatch =
        user.password === input.password || (await bcrypt.compare(input.password, user.password));
      if (!passwordMatch) {
        throw new Error('Invalid credentials');
      }

      const authUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      };

      return {
        token: signToken(authUser),
        user: authUser
      };
    },

    addDog: async ({ input }) => {
      requireAdmin(req);
      const [result] = await pool.query(
        `INSERT INTO dogs (name, breed, age, gender, status, image_url, description)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          input.name,
          input.breed,
          input.age,
          input.gender,
          input.status,
          input.imageUrl || null,
          input.description || null
        ]
      );

      const [rows] = await pool.query('SELECT * FROM dogs WHERE id = ?', [result.insertId]);
      return mapDog(rows[0]);
    },

    updateDog: async ({ id, input }) => {
      requireAdmin(req);
      await pool.query(
        `UPDATE dogs
         SET name = ?, breed = ?, age = ?, gender = ?, status = ?, image_url = ?, description = ?
         WHERE id = ?`,
        [
          input.name,
          input.breed,
          input.age,
          input.gender,
          input.status,
          input.imageUrl || null,
          input.description || null,
          id
        ]
      );

      const [rows] = await pool.query('SELECT * FROM dogs WHERE id = ?', [id]);
      if (!rows[0]) {
        throw new Error('Dog not found');
      }
      return mapDog(rows[0]);
    },

    deleteDog: async ({ id }) => {
      requireAdmin(req);
      const [result] = await pool.query('DELETE FROM dogs WHERE id = ?', [id]);
      return result.affectedRows > 0;
    },

    applyAdoption: async ({ input }) => {
      requireAuth(req);

      const [dogRows] = await pool.query('SELECT * FROM dogs WHERE id = ?', [input.dogId]);
      const dog = dogRows[0];
      if (!dog) {
        throw new Error('Dog not found');
      }
      if (dog.status !== 'Available') {
        throw new Error('This dog is not available for adoption');
      }

      const [existing] = await pool.query(
        'SELECT id FROM applications WHERE user_id = ? AND dog_id = ? AND status = ?',
        [req.user.id, input.dogId, 'pending']
      );
      if (existing.length) {
        throw new Error('You already have a pending application for this dog');
      }

      const [result] = await pool.query(
        'INSERT INTO applications (user_id, dog_id, message, status) VALUES (?, ?, ?, ?)',
        [req.user.id, input.dogId, input.message, 'pending']
      );

      const [rows] = await pool.query('SELECT * FROM applications WHERE id = ?', [result.insertId]);
      return mapApplication(rows[0]);
    },

    updateApplicationStatus: async ({ id, status }) => {
      requireAdmin(req);
      if (!['approved', 'rejected', 'pending'].includes(status)) {
        throw new Error('Invalid application status');
      }

      const [rows] = await pool.query('SELECT * FROM applications WHERE id = ?', [id]);
      const application = rows[0];
      if (!application) {
        throw new Error('Application not found');
      }

      await pool.query('UPDATE applications SET status = ? WHERE id = ?', [status, id]);

      if (status === 'approved') {
        await pool.query('UPDATE dogs SET status = ? WHERE id = ?', ['Adopted', application.dog_id]);
      }

      const [updated] = await pool.query(
        `SELECT a.*, d.name AS dog_name, u.name AS user_name, u.email AS user_email
         FROM applications a
         INNER JOIN dogs d ON d.id = a.dog_id
         INNER JOIN users u ON u.id = a.user_id
         WHERE a.id = ?`,
        [id]
      );

      return mapApplication(updated[0]);
    }
  };
}

module.exports = createResolvers;
