# GeTs Architects Project Brief Questionnaire

A premium Typeform-style project brief questionnaire built with Next.js for deployment on Vercel.

## How to run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy to Vercel

1. Upload this folder to a GitHub repository.
2. Connect the repository to Vercel.
3. Deploy.

## Optional Supabase setup

Create a table:

```sql
create table project_briefs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  client_name text,
  client_email text,
  project_location text,
  response jsonb
);
```

Add environment variables in Vercel:

```bash
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

Without Supabase, the form still works and returns a response ID, but it will not save to database.
