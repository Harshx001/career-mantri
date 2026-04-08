# Career Mantri Frontend (React + Vite)

Frontend now uses a clear page/component structure with protected routes.

## Included pages

- `/login`
- `/signup`
- `/home`
- `/profile`
- `/courses`
- `/recommendations`

After successful signup, user is redirected to `/home`.

## Folder structure

`src/app` - routing and protected route  
`src/components` - reusable UI components  
`src/context` - auth session context  
`src/pages` - page-level screens  
`src/services` - API service layer  
`src/styles` - global styling

## Run

```bash
npm install
npm run dev
```

Frontend URL: `http://localhost:5173`

## Backend connection

Default API base URL is `/api` and Vite proxy forwards it to `http://localhost:8080`.

`.env.example` is provided if you need custom API base URL.
