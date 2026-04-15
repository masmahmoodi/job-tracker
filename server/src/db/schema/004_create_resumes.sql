CREATE TABLE IF NOT EXISTS resumes(
    id SERIAL PRIMARY KEY,
    user_id INTEGER  NOT NULL REFERENCES users(id),
    original_filename TEXT NOT NULL,
    stored_filename TEXT NOT NULL,
    file_path TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    extracted_text TEXT NOT NULL,
    created_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)