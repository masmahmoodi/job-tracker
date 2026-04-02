CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    company_name TEXT NOT NULL,
    job_title TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'saved',
    applied_date DATE,
    notes TEXT,
    location TEXT,
    job_type TEXT,
    salary TEXT,
    job_link TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
