ALTER TABLE applications
ADD COLUMN user_id INTEGER,
ADD CONSTRAINT applications_user_id_fkey
FOREIGN KEY (user_id) REFERENCES users(id);
