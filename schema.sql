
CREATE TABLE IF NOT EXISTS udhetimet (
    id SERIAL PRIMARY KEY,
    shoferi VARCHAR(100) NOT NULL,
    nisja VARCHAR(100) NOT NULL,
    destinacioni VARCHAR(100) NOT NULL,
    ora VARCHAR(10) NOT NULL,
    vendtakimi VARCHAR(150) NOT NULL,
    vendet_lira INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS kerkesat (
    id SERIAL PRIMARY KEY,
    udhetimi_id INTEGER REFERENCES udhetimet(id),
    vende INTEGER DEFAULT 1,
    statusi VARCHAR(20) DEFAULT 'ne_pritje',
    krijuar_me TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
