
-- Java 5: Hyrja dhe lejet në RideShare

CREATE TABLE IF NOT EXISTS profilet (
    github_user_id TEXT PRIMARY KEY,
    emri TEXT,
    roli TEXT NOT NULL DEFAULT 'pasagjer'
);

ALTER TABLE udhetimet
ADD COLUMN IF NOT EXISTS shofer_id TEXT;

-- Lidhja e udhëtimit 2 me shoferin
UPDATE udhetimet
SET shofer_id = '332863365'
WHERE id = 2;
