# Career Mantri Backend (Spring Boot + PostgreSQL)

Backend now includes auth, profile, courses, and recommendations APIs with PostgreSQL support.

## Main APIs

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/users/{userId}`
- `PUT /api/users/{userId}`
- `GET /api/courses?tag=Technology`
- `GET /api/recommendations/health`
- `GET /api/recommendations/user/{userId}`
- `POST /api/recommendations`

## PostgreSQL setup

Create DB:

`careermantri`

Default connection is in `application.properties`:

- `jdbc:postgresql://localhost:5432/careermantri`
- username `postgres`
- password `postgres`

You can override with env vars:

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`

## Run

From IntelliJ IDEA:

1. Open `BackendAPI` as Maven project.
2. Run `BackendApiApplication`.

From terminal:

```bash
.\mvnw.cmd spring-boot:run
```

## Tests

```bash
.\mvnw.cmd test
```

Tests run with H2 in-memory DB (`src/test/resources/application.properties`).
