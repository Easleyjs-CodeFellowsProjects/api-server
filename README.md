# Basic API Server

Basic API Server with CRUD db routes

## Install instructions:

npm i express cors dotenv jest supertest sequelize pg sqlite3

## Render.com URL:
https://basic-api-server-csz7.onrender.com/

## Assignment instructions

### SQL Models
- Create 2 SQL data models using the Sequelize library, make sure you export those model instances.
- Make sure your Models are configured with your SQL dialect and can properly connect to your database.

Your models should have appropriate field names declared with specific sequelize DataTypes.

### Routes
In your express server, create a route module for each data model that you’ve created. Within the router module, create REST route handlers for each of the REST Methods that properly calls the correct CRUD method from the matching data model.

Add a Record
CRUD Operation: Create
REST Method: POST
Path: /food
Input: JSON Object in the Request Body
Returns: The record that was added to the database.
You must generate an ID and attach it to the object.
You should verify that only the fields you define get saved as a record.

Get All Records
CRUD Operation: Read
REST Method: GET
Path: /food
Returns: An array of objects, each object being one entry from your database.

Get One Record
CRUD Operation: Read
REST Method: GET
Path: /food/1
Returns: The object from the database, which has the id matching that which is in the path.

Update a Record
CRUD Operation: Update
REST Method: PUT
Path: /food/1
Input: JSON Object in the Request Body
Returns: The object from the database, which has the id matching that which is in the path, with the updated/changed data.
You should verify that only the fields you define get saved as a record.

Delete a Record
CRUD Operation: Destroy
REST Method: DELETE
Path: /food/1
Returns: The record from the database as it exists after you delete it (i.e. null).