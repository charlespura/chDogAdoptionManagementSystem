require('dotenv').config();

const cors = require('cors');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const pool = require('./config/db');
const authMiddleware = require('./middleware/auth');
const schema = require('./graphql/schema');
const createResolvers = require('./graphql/resolvers');

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json());
app.use(authMiddleware);

app.get('/', (_req, res) => {
  res.json({
    name: 'PawAdopt GraphQL API',
    graphql: '/graphql'
  });
});

app.use(
  '/graphql',
  graphqlHTTP((req) => ({
    schema,
    rootValue: createResolvers(req),
    graphiql: true,
    customFormatErrorFn: (error) => {
      console.error('[GraphQL Error]', error.message);
      if (error.originalError?.code) {
        console.error('[GraphQL Code]', error.originalError.code);
      }
      if (error.originalError?.sqlMessage) {
        console.error('[SQL Message]', error.originalError.sqlMessage);
      }

      return {
        message: error.message
      };
    }
  }))
);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  pool
    .query('SELECT 1 AS connected')
    .then(() => {
      console.log('MySQL connection check passed');
    })
    .catch((error) => {
      console.error('MySQL connection check failed');
      console.error(error.code || error.message);
      console.error(error.message);
    });
});
