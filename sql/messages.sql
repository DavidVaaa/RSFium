-- Table: SocialNetwork.messages

-- DROP TABLE IF EXISTS "SocialNetwork".messages;

CREATE TABLE IF NOT EXISTS "SocialNetwork".messages
(
    id integer NOT NULL,
    chat_id integer NOT NULL,
    user_id integer NOT NULL,
    content "char" NOT NULL,
    "timestamp" timestamp without time zone NOT NULL,
    CONSTRAINT messages_pkey PRIMARY KEY (id),
    CONSTRAINT "Chat" FOREIGN KEY (chat_id)
        REFERENCES "SocialNetwork".chat (id_chat) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "user" FOREIGN KEY (user_id)
        REFERENCES "SocialNetwork".users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS "SocialNetwork".messages
    OWNER to postgres;