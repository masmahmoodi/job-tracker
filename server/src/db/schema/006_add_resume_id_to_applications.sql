ALTER TABLE applications
ADD COLUMN IF NOT EXISTS resume_id INTEGER;

ALTER TABLE applications
DROP CONSTRAINT IF EXISTS applications_resume_id_fkey;

ALTER TABLE applications
ADD CONSTRAINT applications_resume_id_fkey
FOREIGN KEY (resume_id) REFERENCES resumes(id);
