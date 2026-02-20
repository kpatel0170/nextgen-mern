# nextgen-mern (Next.js Refactor)

Migrated from separate `client/` and `server/` apps into one Next.js App Router project.

## Run

```bash
bun install
bunx prisma generate
bunx prisma db push
bun run dev
```

## API Endpoints

- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/logout`
- POST `/api/auth/refresh-tokens`
- POST `/api/auth/forgot-password`
- POST `/api/auth/reset-password?token=`
- POST `/api/auth/send-verification-email`
- POST `/api/auth/verify-email?token=`
- GET `/api/users`
- POST `/api/users`
- GET `/api/users/:id`
- PATCH `/api/users/:id`
- DELETE `/api/users/:id`
