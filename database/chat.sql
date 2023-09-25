-- Table: SocialNetwork.chat

-- DROP TABLE IF EXISTS "SocialNetwork".chat;

CREATE TABLE IF NOT EXISTS "SocialNetwork".chat
(
    id_chat integer NOT NULL,
    name "char" NOT NULL,
    related_subject integer,
    CONSTRAINT chat_pkey PRIMARY KEY (id_chat),
    CONSTRAINT related_subject FOREIGN KEY (related_subject)
        REFERENCES "SocialNetwork".subject (id_subject) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS "SocialNetwork".chat
    OWNER to postgres;