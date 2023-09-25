-- Table: SocialNetwork.subject

-- DROP TABLE IF EXISTS "SocialNetwork".subject;

CREATE TABLE IF NOT EXISTS "SocialNetwork".subject
(
    id_subject integer NOT NULL,
    subject_name "char" NOT NULL,
    teacher_id integer NOT NULL,
    CONSTRAINT subject_pkey PRIMARY KEY (id_subject),
    CONSTRAINT "Teacher_verification" FOREIGN KEY (teacher_id)
        REFERENCES "SocialNetwork".users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS "SocialNetwork".subject
    OWNER to postgres;