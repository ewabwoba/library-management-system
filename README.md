# Library Management System

A full-stack Library Management System built to simplify book discovery, catalog management, and access to library resources through a modern, responsive web application.

The project combines a **NestJS REST API** with a **React and Vite frontend**, backed by **PostgreSQL** and **Prisma ORM**. Its modular architecture separates backend business logic from the user interface, making the application easier to maintain, test, and extend.

---

## Project Overview

The Library Management System provides a foundation for managing a digital book catalog, organizing books by genre, and supporting user authentication and role-based access.

### Key Features

- **Book Management:** Create, retrieve, update, and delete book records.
- **Book Discovery:** Search books by title or author.
- **Genre Filtering:** Filter the catalog by book genre.
- **Book Details:** View detailed information about individual books.
- **User Authentication:** User registration and login with password hashing.
- **Role-Based Access Control:** Differentiate between Patron and Librarian roles.
- **Genre Management:** Organize books using dedicated genre records.
- **Responsive Interface:** Browse the catalog across desktop, tablet, and mobile devices.
- **Loading and Error States:** Provide feedback while data is being retrieved or when requests fail.

---

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, JavaScript |
| Routing | React Router |
| HTTP Client | Axios |
| Backend | NestJS, TypeScript, Node.js |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | JWT, bcrypt |
| Validation | DTOs and NestJS validation |
| Development Tools | Git, npm, ESLint |

---

## Project Structure

The repository is organized into two main applications:

```text
library-management-system/
│
├── api/                         # NestJS backend
│   ├── auth/                    # Authentication and authorization
│   ├── genres/                  # Genre management
│   ├── users/                   # User management
│   ├── src/
│   │   ├── books/               # Book CRUD and catalog operations
│   │   ├── prisma/              # Prisma service and database module
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── prisma/
│   │   ├── migrations/          # Database migrations
│   │   ├── schema.prisma        # Database schema
│   │   └── seed.ts              # Database seeding
│   ├── package.json
│   └── .env.example
│
├── client/                      # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── BookCard.jsx
│   │   │   ├── BookGrid.jsx
│   │   │   ├── BookSkeleton.jsx
│   │   │   ├── GenreFilter.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── pages/
│   │   │   ├── BookDetail.jsx
│   │   │   └── HomePage.jsx
│   │   ├── services/
│   │   │   └── bookService.js
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
├── .gitignore
└── README.md
```

---

## Application Architecture

The application follows a client-server architecture.

1. **React frontend:** Handles user interactions, navigation, catalog presentation, searching, filtering, and sorting.
2. **Axios service layer:** Sends HTTP requests to the backend API.
3. **NestJS backend:** Handles incoming requests, validation, authentication, authorization, and business logic.
4. **Prisma ORM:** Communicates with PostgreSQL and manages database operations.
5. **PostgreSQL:** Stores application data, including users, books, genres, and reviews.

```text
             USER
               |
               v
       REACT FRONTEND
         (Vite + React)
               |
               v
        AXIOS HTTP CLIENT
               |
               v
        NESTJS REST API
               |
        +------+------+
        |             |
        v             v
   AUTH MODULE    BOOKS MODULE
        |             |
        |        GENRES MODULE
        |             |
        +------+------+
               |
               v
          PRISMA ORM
               |
               v
          POSTGRESQL
```

---

## Getting Started

Follow these instructions to run the application locally.

### Prerequisites

Ensure the following are installed:

- Node.js (LTS recommended)
- npm
- PostgreSQL
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/ewabwoba/library-management-system.git

cd library-management-system
```

### 2. Set Up the Backend

Navigate to the API directory:

```bash
cd api
```

Install dependencies:

```bash
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Configure your database connection:

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/library_management?schema=public"
```

Replace the placeholders with your PostgreSQL credentials and database name.

Generate the Prisma client:

```bash
npx prisma generate
```

Apply database migrations:

```bash
npx prisma migrate dev
```

If your project uses the seed script, populate the database:

```bash
npx prisma db seed
```

Start the backend development server:

```bash
npm run start:dev
```

The API will be available at:

```text
http://localhost:3000
```

### 3. Set Up the Frontend

Open another terminal and navigate to the client directory:

```bash
cd library-management-system/client
```

Install dependencies:

```bash
npm install
```

Create the frontend environment file:

```bash
cp .env.example .env
```

Configure the backend API URL:

```env
VITE_API_URL=http://localhost:3000
```

Start the frontend development server:

```bash
npm run dev
```

Open the local URL printed by Vite, typically:

```text
http://localhost:5173
```

---

## API Overview

The backend exposes RESTful endpoints for interacting with application resources.

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Authenticate an existing user |

### Books

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Retrieve all books |
| GET | `/books?search=python` | Search by title or author |
| GET | `/books?genreId=1` | Filter books by genre |
| GET | `/books/:id` | Retrieve a book by ID |
| POST | `/books` | Create a book |
| PATCH | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |

Search and genre filters can be combined:

```http
GET /books?search=python&genreId=1
```

### Genres

The genre module provides endpoints for managing book genres.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/genres` | Retrieve genres |
| GET | `/genres/:id` | Retrieve a genre |
| POST | `/genres` | Create a genre |
| PATCH | `/genres/:id` | Update a genre |
| DELETE | `/genres/:id` | Delete a genre |

*Note: The API endpoints above assume the standard controller routes without an additional global prefix.*

---

## Frontend Functionality

The React application is organized into reusable components and dedicated pages.

### Home Page

The catalog homepage provides:

- A searchable book catalog.
- Genre-based filtering.
- Sorting by title or author.
- Responsive book cards.
- Loading indicators and empty states.
- Error feedback when API requests fail.

### Book Details Page

Each book has a dedicated details route:

```text
/books/:id
```

The page retrieves and displays information about the selected book.

### Search Experience

Search is implemented with a debounce mechanism to reduce unnecessary API requests while users type. Search requests support matching against book titles and authors.

---

## Database Design

The application uses PostgreSQL with Prisma ORM.

The core data models include:

| Model | Purpose |
|---|---|
| User | Stores user accounts and roles |
| Book | Stores book information and availability |
| Genre | Organizes books into categories |
| Review | Stores user reviews and ratings |

### Relationships

- A genre can contain multiple books.
- Each book belongs to one genre.
- A user can submit multiple reviews.
- A book can receive multiple reviews.
- A user can review a particular book only once.

---

## Available User Roles

The application defines two user roles:

| Role | Description |
|---|---|
| PATRON | Standard library user |
| LIBRARIAN | Library management user |

Role-based authorization is implemented on the backend using NestJS guards and role metadata.

---

## Development Workflow

The project maintains separate frontend and backend applications within one Git repository.

Run the backend and frontend in separate terminals during development.

**Backend:**

```bash
cd api
npm run start:dev
```

**Frontend:**

```bash
cd client
npm run dev
```

Build the applications:

```bash
# Backend
cd api
npm run build

# Frontend
cd client
npm run build
```

---

## Environment Variables

Keep environment-specific configuration out of version control.

### Backend — `api/.env`

```env
DATABASE_URL="your_postgresql_connection_string"
```

### Frontend — `client/.env`

```env
VITE_API_URL=http://localhost:3000
```

Use the provided `.env.example` files as templates. Never commit real credentials, secrets, or production environment variables.

---

## Future Improvements

Potential enhancements include:

- Book borrowing and return workflows.
- Reservation and availability management.
- Fine and overdue tracking.
- Advanced catalog filtering and pagination.
- User profile management.
- Review and rating interface.
- Automated frontend and backend testing.
- API documentation with Swagger.
- Docker-based development and deployment.
- Production deployment and CI/CD integration.

---

## Author

**Ezekiel Wekesa Wabwoba**

Computer Science Graduate | QA Engineer | Software Developer

- **GitHub:** [@ewabwoba](https://github.com/ewabwoba)
- **Portfolio:** [ezekielwekesa.vercel.app](https://ezekielwekesa.vercel.app/u)
- **LinkedIn:** [Ezekiel Wekesa](https://linkedin.com/in/ezekiel-wekesa-162578241/)

---

## License

<<<<<<< Updated upstream
This project is available for educational and development purposes. Add a formal license if you intend to distribute or reuse the project under specific terms.
=======
This project is available for educational and development purposes. Add a formal license if you intend to distribute or reuse the project under specific terms.
>>>>>>> Stashed changes
