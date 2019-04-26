# Getting started

## Installation

Install dependencies

```bash
yarn install
```

Run the development server

```bash
yarn run dev
```

## Setup server base URL

This boilerplate use [redux-axios-middleware](https://github.com/svrcekmichal/redux-axios-middleware) to handle API requests. The reasons is for the sake of simplicity and elegance of the code.

The root server API is configured in [`src/store.js`](../src/store.js), in which `baseURL` stored as an environment variable. As `dotenv-webpack` is already installed as a dependency. You can create a `.env` file and add `TEST_API` variable, which initial testing used `'https://api.iida.vertics.co'`.

### Test user for the above API:

- Email: max@vertics.co
- Password: 12345678

## Boom!

You should be able to login now. If you want to quickly get the most out of the pre-configuration of this project, welcome to the [Hack guide](./project-guide.md).

Otherwise. Happy hacking! 💪🔥
