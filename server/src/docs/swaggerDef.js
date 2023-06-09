const { version } = require('../../package.json');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'nextgen-mern boilerplate API documentation',
    version,
  },
  servers: [
    {
      url: `http://localhost:${3001}/`,
    },
  ],
};

module.exports = swaggerDef;
