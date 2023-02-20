# motorway-test-backend-node

## Running provided infrastructure with Docker

### Initial requirements

Install requirements:

- [Docker](https://docs.docker.com/get-docker/).
- [Docker Compose](https://docs.docker.com/compose/install/).

### Initialise DB
  
To initialize this project, run `docker compose up` from the root of this project. This will build and seed the database.

By default, the database runs on port `5432` and is also exposed on `5432`, if you want to change this you can update `docker-compose.yml`.

## Running locally in development environment

### Initial requirements

- [Install NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
- [Install yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable) [OPTIONAL].

### Initial configuration

In the project directory, you must copy .env.example as .env a fill missing fields and/or modify existing ones as appropriate.

If CONNECTION_URL is omitted the server defaults to in-memory (SQLite) initialised with the same data as the provided DB.

In the project directory, you can run:

`yarn`

To download dependencies into node_modules directory.

### Available Scripts

In the project directory, you can run:

### `yarn lint`

Runs the linter.

#### `yarn start`

Runs the project locally.

Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

#### `yarn debug`

Runs the project locally in debugger mode.

Open [http://localhost:4000](http://localhost:3000) to view it in the browser.
Connect to [http://localhost:9229](http://localhost:9229) to debug.

### `yarn build`

Builds the app for production into the `build` folder.

### `yarn webpack`

Builds the app for Lambda deployment with Webpack into the `build-webpack` folder.

### `yarn test`

Runs unit and integration tests.

### `yarn e2e`

Runs E2E tests.

## Docker

This assumes Docker and Docker Compose are installed (see previous steps). To run the provided DB with the project, 
without it defaulting to in memory DB.

### Configuration

Add:

`CONNECTION_URL=postgres://user:password@localhost:5432/motorway`

to .env file.

### `docker-compose up`

Runs containerised DB using Docker.

### `yarn start`

Runs local server pointing to the running dockerised DB.
