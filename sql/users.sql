-- Table: SocialNetwork.users

-- DROP TABLE IF EXISTS "SocialNetwork".users;

CREATE TABLE IF NOT EXISTS "SocialNetwork".users
(
    id integer NOT NULL,
    name "char" NOT NULL,
    last_name "char" NOT NULL,
    email "char" NOT NULL,
    rol integer,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS "SocialNetwork".users
    OWNER to postgres;