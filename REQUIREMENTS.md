# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index to get all Products     /products [GET]
- Show One product              /product/:id [GET]
- Create One product            /products [POST]     [token required] 

#### Users
- Index to get all Users        /users/ [GET]        [token required]
- Show One User                 /user/:id [GET]     [token required]   
- Create A new User             /signup [POST]      
- Login an existing User        /login [POST]

#### Orders
- Current Order by user (args: user id) /orders/:userID [GET] [token required]
- Create A new order                    /orders [POST] [token required]
- Index to get all Orders               /orders [GET]


## Data Shapes
#### Product
    id SERIAL PRIMARY  KEY,
    name VARCHAR(150),
    price integer


#### User
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    userName VARCHAR(10),
    password VARCHAR(120)

#### Orders
    id SERIAL PRIMARY KEY,
    product_id bigint REFERENCES products(id),
    qnt_product integer,
    user_id bigint REFERENCES users(id),
    curr_status status

#### status AS ENUM ('active', 'complete');    

