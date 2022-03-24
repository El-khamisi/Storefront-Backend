/* Replace with your SQL commands */
CREATE TYPE status AS ENUM ('active', 'complete');
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    product_id integer,
    qnt_product integer,
    user_id integer,
    curr_status status
);