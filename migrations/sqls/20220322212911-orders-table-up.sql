/* Replace with your SQL commands */
CREATE TYPE status AS ENUM ('active', 'complete');
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    product_id bigint REFERENCES products(id),
    qnt_product ,
    user_id bigint REFERENCES users(id),
    curr_status status
);