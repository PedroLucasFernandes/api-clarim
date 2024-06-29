-- CRIE E ACESSE O DATABASE
CREATE DATABASE clarim;
\c clarim

-- CRIE AS TABELAS
CREATE TYPE account_type AS ENUM ('user', 'author', 'editor', 'administrator');

CREATE TABLE account (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    login VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    image TEXT NOT NULL,
    type account_type NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE post_type AS ENUM ('noticia', 'analise', 'entrevista', 'opiniao', 'curiosidade');
CREATE TYPE sport_type AS ENUM ('futebol', 'basquete', 'volei', 'ufc', 'formula_1', 'esports');

CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(300) NOT NULL,
    content TEXT NOT NULL,
    type post_type NOT NULL,
    sport sport_type NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by INT NOT NULL,
    updated_by INT NOT NULL,
    CONSTRAINT check_type CHECK (type IN ('noticia', 'analise', 'entrevista', 'opiniao', 'curiosidade')),
    CONSTRAINT check_sport CHECK (sport IN ('futebol', 'basquete', 'volei', 'ufc', 'formula_1', 'esports')),
    CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES account(id) ON DELETE NO ACTION,
    CONSTRAINT fk_updated_by FOREIGN KEY (updated_by) REFERENCES account(id) ON DELETE NO ACTION
);

CREATE TABLE tag (
    id SERIAL PRIMARY KEY,
    name VARCHAR(32) NOT NULL
);

CREATE TABLE post_tag (
    id SERIAL PRIMARY KEY,
    post_id INT NOT NULL,
    tag_id INT NOT NULL,
    CONSTRAINT fk_post FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE,
    CONSTRAINT fk_tag FOREIGN KEY (tag_id) REFERENCES tag(id) ON DELETE CASCADE
);

CREATE TABLE image (
    id SERIAL PRIMARY KEY,
    post_id INT NOT NULL,
    image_path TEXT NOT NULL,
    is_banner BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE
);

CREATE TABLE comment (
    id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES post(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by INTEGER NOT NULL REFERENCES account(id) ON DELETE CASCADE
);

-- CRIE UM USUÁRIO
CREATE USER nome_de_usuario WITH PASSWORD 'suasenha';
ALTER USER nome_de_usuario SUPERUSER;
GRANT ALL PRIVILEGES ON DATABASE clarim TO nome_de_usuario;