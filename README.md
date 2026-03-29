# PawAdopt: Dog Adoption Management System

PawAdopt is a full-stack dog adoption management system built with Angular, Node.js, Express, GraphQL, and MariaDB/MySQL. It supports user registration and login, dog browsing, adoption applications, and an admin workflow for managing dogs and reviewing applications.

## Overview

This project was built as a real-world CRUD and workflow system for an animal shelter or NGO.

There are two user roles:

- `user`
  - Register and log in
  - Browse dogs
  - Filter dogs by breed and status
  - Submit adoption applications
- `admin`
  - Manage dog records
  - View all adoption applications
  - Approve or reject applications

## Tech Stack

### Frontend

- Angular 18
- TypeScript
- Angular Router
- Angular Forms
- Angular HttpClient

### Backend

- Node.js
- Express
- GraphQL
- `express-graphql`
- JWT authentication with `jsonwebtoken`
- Password hashing with `bcryptjs`

### Database

- MariaDB / MySQL
- `mysql2`
- Designed to work with XAMPP phpMyAdmin local databases

## Main Features

- User registration
- User login with JWT
- Dog listing page
- Breed and status filtering
- Adoption application form
- Admin dog CRUD
- Admin application review
- Dashboard summary cards
- Seeded admin account

## Project Structure

```text
chDogAdoptionManagementSystem/
├── client/                         # Angular frontend
│   └── src/app/
│       ├── app.component.ts
│       ├── app.routes.ts
│       ├── pages/
│       │   ├── login-page.component.ts
│       │   ├── register-page.component.ts
│       │   ├── dashboard-page.component.ts
│       │   ├── dogs-page.component.ts
│       │   ├── admin-dogs-page.component.ts
│       │   └── admin-applications-page.component.ts
│       └── services/
│           ├── api.service.ts
│           └── auth.service.ts
├── server/                         # Node + Express + GraphQL backend
│   └── src/
│       ├── index.js
│       ├── config/
│       │   └── db.js
│       ├── graphql/
│       │   ├── schema.js
│       │   └── resolvers.js
│       └── middleware/
│           └── auth.js
├── database/
│   └── schema.sql
├── package.json                    # Root helper scripts
└── README.md
```

## Database Design

### `users`

- `id`
- `name`
- `email`
- `password`
- `role`
- `created_at`

### `dogs`

- `id`
- `name`
- `breed`
- `age`
- `gender`
- `status`
- `image_url`
- `description`
- `created_at`

### `applications`

- `id`
- `user_id`
- `dog_id`
- `message`
- `status`
- `created_at`

## GraphQL API

The GraphQL API is mounted at:

- `http://localhost:4000/graphql`

Relevant files:

- Schema: [server/src/graphql/schema.js](/Applications/XAMPP/xamppfiles/htdocs/GithubProject/chDogAdoptionManagementSystem/server/src/graphql/schema.js)
- Resolvers: [server/src/graphql/resolvers.js](/Applications/XAMPP/xamppfiles/htdocs/GithubProject/chDogAdoptionManagementSystem/server/src/graphql/resolvers.js)
- Server setup: [server/src/index.js](/Applications/XAMPP/xamppfiles/htdocs/GithubProject/chDogAdoptionManagementSystem/server/src/index.js)

### Queries

- `me`
- `getDogs(status, breed)`
- `getDog(id)`
- `getApplications`

### Mutations

- `register`
- `login`
- `addDog`
- `updateDog`
- `deleteDog`
- `applyAdoption`
- `updateApplicationStatus`

### Example Query

```graphql
query {
  getDogs {
    id
    name
    breed
    age
    gender
    status
  }
}
```

### Example Login Mutation

```graphql
mutation {
  login(input: {
    email: "admin@pawadopt.local"
    password: "admin123"
  }) {
    token
    user {
      id
      name
      email
      role
    }
  }
}
```

## Installation and Setup

## 1. Clone or Open the Project

Open the project in:

```bash
/Applications/XAMPP/xamppfiles/htdocs/GithubProject/chDogAdoptionManagementSystem
```

## 2. Install Dependencies

From the project root:

```bash
npm install --prefix server
npm install --prefix client
```

Or install inside each folder manually:

```bash
cd server
npm install

cd ../client
npm install
```

## 3. Database Setup with XAMPP / phpMyAdmin

Start Apache and MySQL from XAMPP.

Open phpMyAdmin and import:

- [database/schema.sql](/Applications/XAMPP/xamppfiles/htdocs/GithubProject/chDogAdoptionManagementSystem/database/schema.sql)

This creates:

- `dog_adoption_system`
- `users`
- `dogs`
- `applications`

Seeded admin account:

- Email: `admin@pawadopt.local`
- Password: `admin123`

## 4. Backend Environment File

Create `server/.env` from the example:

```bash
cp server/.env.example server/.env
```

Default local example:

```env
PORT=4000
JWT_SECRET=change_this_secret
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=dog_adoption_system
```

If your XAMPP `root` user does not allow Node.js access, create a dedicated database user and use that instead.

Example:

```sql
CREATE USER 'dogapp'@'localhost' IDENTIFIED BY 'dogapp123';
GRANT ALL PRIVILEGES ON dog_adoption_system.* TO 'dogapp'@'localhost';
FLUSH PRIVILEGES;
```

Then update `.env`:

```env
DB_USER=dogapp
DB_PASSWORD=dogapp123
```

## 5. Run the Backend

From the project root:

```bash
npm run dev
```

Or:

```bash
npm run dev:server
```

Expected server URL:

- `http://localhost:4000`

Expected GraphQL URL:

- `http://localhost:4000/graphql`

When the database connection is correct, the terminal should show:

```text
Server running on http://localhost:4000
MySQL connection check passed
```

## 6. Run the Frontend

In another terminal:

```bash
npm run dev:client
```

Frontend URL:

- `http://localhost:4200`

Use only the Angular dev server URL above.

Do not use:

- `http://127.0.0.1:5500`

That is usually from Live Server and is not the correct frontend for this project.

## Available Scripts

From the root [package.json](/Applications/XAMPP/xamppfiles/htdocs/GithubProject/chDogAdoptionManagementSystem/package.json):

- `npm run dev`
  - Starts the backend server
- `npm run dev:server`
  - Starts the backend server
- `npm run dev:client`
  - Starts the Angular frontend
- `npm run build:client`
  - Builds the Angular frontend
- `npm run start:server`
  - Starts the backend without watch mode

Backend scripts from [server/package.json](/Applications/XAMPP/xamppfiles/htdocs/GithubProject/chDogAdoptionManagementSystem/server/package.json):

- `npm run dev`
- `npm run start`

Frontend scripts from [client/package.json](/Applications/XAMPP/xamppfiles/htdocs/GithubProject/chDogAdoptionManagementSystem/client/package.json):

- `npm start`
- `npm run build`

## Default URLs

- Frontend: `http://localhost:4200`
- Backend: `http://localhost:4000`
- GraphQL: `http://localhost:4000/graphql`

## Authentication Notes

- Authentication uses JWT.
- The token is stored in `localStorage` in the frontend.
- Admin-only actions require an authenticated admin account.
- User-only adoption flow requires a logged-in normal user account.

## Common Problems

### 1. `EADDRINUSE: address already in use :::4000`

Port `4000` is already occupied.

Fix:

```bash
lsof -i :4000
kill -9 <PID>
```

Or change `PORT` in [server/.env](/Applications/XAMPP/xamppfiles/htdocs/GithubProject/chDogAdoptionManagementSystem/server/.env).

### 2. `ER_ACCESS_DENIED_ERROR`

The backend cannot log into MariaDB with the current `.env` credentials.

Fix:

- verify `DB_USER`
- verify `DB_PASSWORD`
- use a dedicated MariaDB user instead of `root` if necessary

### 3. GraphQL returns `500`

This usually means:

- database connection failed
- wrong DB credentials
- wrong database name
- SQL error in a resolver

Check the terminal running the backend for the actual logged error.

### 4. `ws://127.0.0.1:5500//ws failed`

That is from Live Server, not Angular.

Use:

- `http://localhost:4200`

### 5. `favicon.ico 404`

This was fixed by adding:

- [client/src/assets/favicon.svg](/Applications/XAMPP/xamppfiles/htdocs/GithubProject/chDogAdoptionManagementSystem/client/src/assets/favicon.svg)

## Important Source Files

### Frontend

- [client/src/app/app.component.ts](/Applications/XAMPP/xamppfiles/htdocs/GithubProject/chDogAdoptionManagementSystem/client/src/app/app.component.ts)
- [client/src/app/app.routes.ts](/Applications/XAMPP/xamppfiles/htdocs/GithubProject/chDogAdoptionManagementSystem/client/src/app/app.routes.ts)
- [client/src/app/services/api.service.ts](/Applications/XAMPP/xamppfiles/htdocs/GithubProject/chDogAdoptionManagementSystem/client/src/app/services/api.service.ts)
- [client/src/app/services/auth.service.ts](/Applications/XAMPP/xamppfiles/htdocs/GithubProject/chDogAdoptionManagementSystem/client/src/app/services/auth.service.ts)
- [client/src/app/pages/login-page.component.ts](/Applications/XAMPP/xamppfiles/htdocs/GithubProject/chDogAdoptionManagementSystem/client/src/app/pages/login-page.component.ts)
- [client/src/app/pages/register-page.component.ts](/Applications/XAMPP/xamppfiles/htdocs/GithubProject/chDogAdoptionManagementSystem/client/src/app/pages/register-page.component.ts)
- [client/src/app/pages/dashboard-page.component.ts](/Applications/XAMPP/xamppfiles/htdocs/GithubProject/chDogAdoptionManagementSystem/client/src/app/pages/dashboard-page.component.ts)
- [client/src/app/pages/dogs-page.component.ts](/Applications/XAMPP/xamppfiles/htdocs/GithubProject/chDogAdoptionManagementSystem/client/src/app/pages/dogs-page.component.ts)
- [client/src/app/pages/admin-dogs-page.component.ts](/Applications/XAMPP/xamppfiles/htdocs/GithubProject/chDogAdoptionManagementSystem/client/src/app/pages/admin-dogs-page.component.ts)
- [client/src/app/pages/admin-applications-page.component.ts](/Applications/XAMPP/xamppfiles/htdocs/GithubProject/chDogAdoptionManagementSystem/client/src/app/pages/admin-applications-page.component.ts)

### Backend

- [server/src/index.js](/Applications/XAMPP/xamppfiles/htdocs/GithubProject/chDogAdoptionManagementSystem/server/src/index.js)
- [server/src/config/db.js](/Applications/XAMPP/xamppfiles/htdocs/GithubProject/chDogAdoptionManagementSystem/server/src/config/db.js)
- [server/src/middleware/auth.js](/Applications/XAMPP/xamppfiles/htdocs/GithubProject/chDogAdoptionManagementSystem/server/src/middleware/auth.js)
- [server/src/graphql/schema.js](/Applications/XAMPP/xamppfiles/htdocs/GithubProject/chDogAdoptionManagementSystem/server/src/graphql/schema.js)
- [server/src/graphql/resolvers.js](/Applications/XAMPP/xamppfiles/htdocs/GithubProject/chDogAdoptionManagementSystem/server/src/graphql/resolvers.js)

### Database

- [database/schema.sql](/Applications/XAMPP/xamppfiles/htdocs/GithubProject/chDogAdoptionManagementSystem/database/schema.sql)

## Current Notes

- The seeded admin password in SQL is plain text for local development convenience.
- In production, seeded passwords should always be hashed.
- `express-graphql` works for this project, but it is no longer actively maintained.

## Future Improvements

- Route guards in Angular
- Better admin dashboard analytics
- Image upload instead of URL-only images
- Search by age and gender
- User profile and adoption history
- Hashed SQL seed password
- Production deployment configuration
