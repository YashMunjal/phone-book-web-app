# DOCS

## Quick Start

Please follow following steps before geting start

## Requirements
* Postgresql
* Node v10 or above
* Knex installed globally

Note: Before starting please do the following step:
* In Postgres create a new DATABASE named 'phone_book'

And then run the following commands
- ```npm install```
- ```npm run migrate```
- ```npm run build```
- ```npm start```

# API Reference

## Get All contacts
* Route: /contacts
* Method: GET

## Get Contact by ID
* Route: /api/contact/:id
* Method: GET
* Param: (id) - ID of the contact

## Create new contact
* Route: /api/create-contact
* Method: POST
* Params: { firstName, @optional lastName, @optional email, contactNumber }
  
## Add new number to exsisting contact
* Route: /api/add-contact
* Method: POST
* Params: { userId, contactNumber }

## Add new email to exsisting contact
* Route: /api/add-email
* Method: POST
* Params: { userId, email }

## Search Contact
* Route: /api/search
* Method: GET
* Query Params: { email, firstName, lastName, contact }

