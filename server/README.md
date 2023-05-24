# nextren-mern

## Installation

To install the dependencies for the backend, run the following command:

1. Clone the repository: `git clone https://github.com/kpatel0170/nextren-mern.git`
2. Install dependencies: `npm install`
3. Set up environment variables:
    - Create a `.env` file in the root directory of the project.
    - Copy the contents of `.env.example` into `.env` and fill in the required values.
4. Start the server: `npm start`
5. Navigate to `http://localhost:5000/docs` in your browser to view API documentation.


## Technologies
- `Node.js` - An open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside a web browser.
- `Express.js` - A minimalist web framework for Node.js that provides a set of features for building web and mobile applications.
- `MongoDB`- A document-based NoSQL database that provides high scalability, flexibility, and performance.
- `Postman` - A popular API development tool that allows developers to design, build, and test APIs.

## Project Directory Structure

Below is the directory structure of the project:

```
├── src/
│   ├── controller/
|   │   └── user.controller.js
│   ├── middleware/
|   │   └── validateUser.js
│   ├── models/
|   │   └── user.model.js
│   ├── schema/
|   │   └── user.schema.js
│   ├── service/
|   │   └── user.service.js
│   └──utils/
|   │   ├── connect.js
|   │   └── logger.js
|   ├── app.js
|   └── routes.js
├── .env-sample
├── package-lock.json
└── package.json
```

## Contributing

We welcome contributions to the project. To contribute, follow these steps:
1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b new-feature`.
3. Make the changes to the codebase

## Authors
 **Kartik Patel** - [@kpatel0170](https://github.com/kpatel0170)

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.
