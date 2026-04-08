# Career Mantri AI Recommendation System

Full-stack project with:

- React frontend (`CareerMantriAI/AICareerMantriApp`)
- Spring Boot backend (`BackendAPI`)
- PostgreSQL integration

## Frontend features

- Login and Signup pages
- Auto redirect to Home after signup/login
- Protected dashboard routes
- Profile management page
- Courses page with tag filters
- AI recommendations page

## Backend features

- Auth APIs (signup/login)
- User profile APIs (get/update)
- Courses API with seeded default data
- Recommendation APIs (manual payload and user-based)
- PostgreSQL persistence using Spring Data JPA

## Start order

1. Start PostgreSQL and create DB `careermantri`.
2. Start backend from `BackendAPI`.
3. Start frontend from `CareerMantriAI/AICareerMantriApp`.

## Commands

Backend:

```bash
cd BackendAPI
.\mvnw.cmd spring-boot:run
```

Frontend:

```bash
cd CareerMantriAI\AICareerMantriApp
npm install
npm run dev
```
