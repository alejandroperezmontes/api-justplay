CREATE TABLE IF NOT EXISTS games (
    id SERIAL PRIMARY KEY,
    home_team VARCHAR(255) not null,
    away_team VARCHAR(255) not null,
    game_date DATE not null,
    ubication VARCHAR(255) not null,
    game_hour TIME not null,
    result VARCHAR(20),
    score_home INT,
    score_away INT,
    created_at TIMESTAMPTZ DEFAULT current_timestamp,
    updated_at TIMESTAMPTZ DEFAULT current_timestamp
);