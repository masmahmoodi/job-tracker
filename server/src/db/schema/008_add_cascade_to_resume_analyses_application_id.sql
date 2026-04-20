ALTER TABLE resume_analyses
DROP CONSTRAINT IF EXISTS resume_analyses_application_id_fkey;

ALTER TABLE resume_analyses
ADD CONSTRAINT resume_analyses_application_id_fkey
FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE;
