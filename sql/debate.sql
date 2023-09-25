-- Table: SocialNetwork.debate

-- DROP TABLE IF EXISTS "SocialNetwork".debate;

CREATE TABLE IF NOT EXISTS "SocialNetwork".debate
(
    id integer NOT NULL,
    name "char" NOT NULL,
    subject integer,
    CONSTRAINT debate_pkey PRIMARY KEY (id),
    CONSTRAINT subject FOREIGN KEY (subject)
        REFERENCES "SocialNetwork".subject (id_subject) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS "SocialNetwork".debate
    OWNER to postgres;