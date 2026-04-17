CREATE TABLE IF NOT EXISTS resume_analyses(
    id SERIAL PRIMARY KEY,
    application_id INTEGER NOT NULL REFERENCES applications(id) ,
    resume_id INTEGER NOT NULL REFERENCES resumes (id),
    summary TEXT NOT NULL,
    strengths TEXT NOT NULL,
    missing_keywords TEXT NOT NULL,
    suggestions TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT  CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT  CURRENT_TIMESTAMP
)