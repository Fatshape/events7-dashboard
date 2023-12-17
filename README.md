# Events 7 Dashboard

**Event 7 dashboard** is an example of a simple NestJS server application and VueJS front-end interface for adding, editing and deleting events. 

![Events 7 Dashboard Screenshot](./screenshot.jpg)

In addition to the basic CRUD functionality, the app also includes:
- a simple error notification system that communicates from the server to a graphical interface,
- a simple system for checking IDs and preventing duplication,
- an example of a more complex verification by external stakeholders (in this case an IP address and its location is used as permission to publish an event with the title 'ads'),
- URL friendly converter,
- basic code testing utilities.

The app uses:
- **NestJS** for server
- **VueJS** for the front-end interface
- **Jest** for testing
- **Does not use a database**, you can add your favourite DB instance if needed

## Installation

Install NestJS packages: `npm install`\
Install VueJS packages: `cd client` => `npm install`

## Running / developing the application

NestJS, back-end:\
`npm run start`  or `npm run start:dev`

VueJS, fron-end:\
`cd client` => `npm run build`  or `npm run serve`

*That's all!*

## Testing

To test all modules, run Jest: `npx jest`
