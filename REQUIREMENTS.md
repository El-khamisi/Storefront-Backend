# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index     products/ [GET]
- Show      products/show/:id [GET]
- Create [token required]       products [POST]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]    users/ [GET]
- Show [token required]     users/:id [GET]    
- Create N[token required]      users [POST]

#### Orders
- Current Order by user (args: user id)[token required] orders/:id [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id: Number
- name: String
- price: Number
- [OPTIONAL] category

#### User
- id: Number
- firstName: String
- lastName: String
- password: String

#### Orders
- id: Number
- id of each product in the order-> product_id: Number
- quantity of each product in the order-> qnt_product: Number
- user_id: Number
- status of order (active or complete) -> curr_status ENUM

