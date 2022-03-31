/* Replace with your SQL commands */
CREATE TYPE status AS ENUM ('active', 'complete');
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id bigint REFERENCES users(id),
    curr_status status
);