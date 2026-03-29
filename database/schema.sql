CREATE DATABASE IF NOT EXISTS dog_adoption_system;
USE dog_adoption_system;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS dogs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  breed VARCHAR(100) NOT NULL,
  age INT NOT NULL,
  gender ENUM('Male', 'Female') NOT NULL,
  status ENUM('Available', 'Adopted') NOT NULL DEFAULT 'Available',
  image_url VARCHAR(255) NULL,
  description TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  dog_id INT NOT NULL,
  message TEXT NOT NULL,
  status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_applications_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_applications_dog FOREIGN KEY (dog_id) REFERENCES dogs(id) ON DELETE CASCADE
);

INSERT INTO users (name, email, password, role)
VALUES (
  'Admin User',
  'admin@pawadopt.local',
  'admin123',
  'admin'
)
ON DUPLICATE KEY UPDATE email = VALUES(email);

INSERT INTO dogs (name, breed, age, gender, status, image_url, description)
VALUES
  ('Buddy', 'Labrador Retriever', 3, 'Male', 'Available', 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80', 'Friendly and energetic, perfect for active families.'),
  ('Luna', 'Beagle', 2, 'Female', 'Available', 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80', 'Curious and playful dog who loves short walks and cuddles.'),
  ('Max', 'Aspin', 4, 'Male', 'Adopted', 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=900&q=80', 'Calm rescue dog with a gentle personality.')
ON DUPLICATE KEY UPDATE name = VALUES(name);
