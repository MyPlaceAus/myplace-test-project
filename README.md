# Candidate Setup and Run Guide

This repo contains two apps:

- `backend/`: NestJS API (TypeScript + TypeORM + SQLite)
- `frontend/`: React + Vite app (TypeScript)

## 1) Prerequisites

- Node.js 20+ (recommended LTS)
- npm 10+

Check versions:

```bash
node -v
npm -v
```

## 2) Install Dependencies

From the project root, install each app separately:

```bash
cd backend && npm install
cd ../frontend && npm install
```

## 3) Environment Variables

### Backend env

Create `backend/.env` from the example:

```bash
cd backend
cp .env.example .env
```

Default values in `.env.example` are suitable for local development.

### Frontend env

Create `frontend/.env` from the example:

```bash
cd ../frontend
cp .env.example .env
```

Important:

- Backend serves APIs under `/api/v1`.
- Frontend should point to that path for local development.

Recommended local value in `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000/api/v1/
```

## 4) Run the Backend

In a terminal:

```bash
cd backend
npm run dev
```

What this does:

- Runs DB migrations (`npm run db:migrate`)
- Starts Nest in watch mode (`npm run start:dev`)

Default API URL:

- `http://localhost:3000/api/v1`

## 5) Run the Frontend

In another terminal:

```bash
cd frontend
npm run dev
```

Vite will print the local URL (commonly `http://localhost:8080`).

## 6) Verify Everything Works

- Frontend loads in browser
- Backend is reachable at `http://localhost:3000/api/v1`
- Frontend can call backend endpoints without CORS errors

## 7) Useful Commands

Backend:

```bash
cd backend
npm run test
npm run test:arnie
npm run lint
npm run build
```

Frontend:

```bash
cd frontend
npm run lint
npm run build
npm run start
```

## 8) Common Issues

- Port conflict on 3000:
  - Change `PORT` in `backend/.env`.
  - Update `VITE_API_URL` in `frontend/.env` to match.
- CORS errors:
  - Ensure `CORS_ORIGIN` in `backend/.env` matches your frontend dev URL.
- API path mismatch:
  - If requests fail with 404, confirm frontend uses `/api/v1` in `VITE_API_URL`.

## 9) Interview Exercise: Arnie Quotes

As part of the interview, complete the quote aggregation utility in:

- `backend/src/common/utils/arnie/get-arnie-quotes.ts`

### Task

Implement `getArnieQuotes(urls)` in a clean and reliable way.

Use the existing mocks and tests to understand expected behavior and shape your solution.

### Validation

Run the dedicated test suite:

```bash
cd backend
npm run test:arnie
```

Your solution is considered complete when all tests in:

- `backend/src/common/utils/arnie/get-arnie-quotes.spec.ts`

are passing, including the timing constraint test.

## 10) Candidate Submission Instructions

Please submit your solution using your own repository:

1. Fork this repository.
2. Work in your fork (create your branch there).
3. Submit either:

- a pull request from your fork, or
- a link to your fork/branch with your final solution.
