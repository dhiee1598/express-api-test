# **Express API**

This is my first Express API using TypeScript with session management provides a secure and efficient way to handle user authentication and data persistence. By integrating sessions, you can store user-specific information and maintain stateful interactions throughout their journey in your application.This Express API integrated with rate limiting capabilities.By leveraging rate limiting, this API efficiently controls the number of requests clients can make within specified time intervals, ensuring fair usage and preventing potential abuse.API with rate limiting will help you maintain stability and reliability while safeguarding your server from potential threats.

### API Server utilities:

- [morgan](https://www.npmjs.com/package/morgan)
  - HTTP request logger middleware for node.js
- [mongoose](https://www.npmjs.com/package/mongoose)
  - Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports Node.js and Deno (alpha).
- [connect-mongo](https://www.npmjs.com/package/connect-mongo)
  - MongoDB session store for Connect and Express written in Typescript.
- [express-session](https://www.npmjs.com/package/express-session)
  - an HTTP server-side framework used to create and manage a session middleware
- [express-async-handler](https://www.npmjs.com/package/express-async-handler)
  - Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
- [dotenv](https://www.npmjs.com/package/dotenv)
  - Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`
- [cors](https://www.npmjs.com/package/cors)
  - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
  - Express rate limit is a rate-limiting middleware for ExpressJS. It limits repeated requests to public APIs and/or endpoints, such as password resets, user logins, etc.
- [bcrypt](https://www.npmjs.com/package/bcrypt)
  - The bcrypt hashing function allows us to build a password security platform that scales with computation power and always hashes every password with a salt.

#### Development utilities:

- [typescript](https://www.npmjs.com/package/typescript)
  - TypeScript is a language for application-scale JavaScript.
- [ts-node](https://www.npmjs.com/package/ts-node)
  - TypeScript execution and REPL for node.js, with source map and native ESM support.
- [nodemon](https://www.npmjs.com/package/nodemon)
  - nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
- [eslint](https://www.npmjs.com/package/eslint)
  - ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- [typescript-eslint](https://typescript-eslint.io/)
  - Tooling which enables ESLint to support TypeScript.

### Install dependencies

    npm install

### Lint

    npm run lint

### Development

    npm run dev
