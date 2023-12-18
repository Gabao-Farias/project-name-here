# Get started

## Quick Start

The quickest way to get things up and running locally is by using docker, so be sure that you already have it installed on your machine!

> Normally the docker setup files are found in the root of the project, but in this case, as in the backend project there are dependencies files coming from the frontend, I opted for a more creative approach instead of a standardized one to deal with image creation process.

1. Setup `.env` file in the root of the repository, an example of a valid .env you can check below:

```sh
NODE_ENV="dev"

APP_PORT="3001"
APP_DOCKER_PORT="3001"

# 64 byte generated string
# require('crypto').randomBytes(64).toString('hex');
ACCESS_TOKEN_SECRET="039bd45c9156466d4acc86f4407d05ad794760ac94cf8644394ad3fb37a3e859e0151d6166242bcca9c6c1b9571fc14548929bde893ec9ec7d8f45cc91410c44"

# 64 byte generated string
# require('crypto').randomBytes(64).toString('hex');
REFRESH_TOKEN_SECRET="1f07d04376c5e51675dbc06be0ef0201682122629f5c57c3aaf0f64f521abd168869e3192734cc67f3d0593cdae1e9ea76adf644671009de50b57905f6e0a7a6"

POSTGRES_PORT="5432"
POSTGRES_DOCKER_PORT="5432"
POSTGRES_HOST="postgresdb"
POSTGRES_USER_NAME="operator"
POSTGRES_PASSWORD="1111111"
POSTGRES_DATABASE_NAME="machinery"
```

2. Run the script in the root of the repository (not in the root of ./backend)

```
./containerize.sh
```

> If you have permissions issue while running the script above, try to give the permissions for the script with `chmod 755 ./containerize.sh`

The script above is supposed to:

- Create a container image of your backend
- Deploy it using `docker-compose` together with a Postgres image.

# About the app

## Techs and tools

### Postgres

Using it as a database, I decided to go with pg cause I had a previous project that I used it for storing data of solar pannels, and I could manage it nicely. Also in this project MongoDB could be a very good option to get things developed faster and to get more flexible in an environment (IoT like) that data might not be structured or changes it's structure frequently.

### TypeORM

The same applyes to TypeORM, I'm more used to use the repository approach to deal with data transactions in the database, also pretty easy to stablish new connections to other datasources

### Postman

Tool used to debug and make http calls against the server, also the files that I used you can find [here](./.postman)

## Future improvements

### Data validators

In frameworks like NestJS they recommend to use tools like [class-validator](https://github.com/typestack/class-validator) for data validation. Those validators are massively useful, mainly to use on middlewares to check wether the data sent on request is structurally correct. In this project I would use the zod which has some great features like automatic typing for objects.

### API versioning strategy

As the projects starts to grow, more functionalities get added to it. For that, versioning strategies are crucial to keep a backwards compatibility. There are several ways to deal with that, so it's would be great to align with the CTO/tech team what would be the best one for the current needs.

### Tests

This topic was totally out of my focus, but I do understand that for large applications tests are crucial and expensive though. In this project I would be using vitest that has great performance and better integration with Typescript.

### Pipelines for CI/CD

Further on development, pipelines would be largely used not only for deployments but also for code checking. This topic was also out of focus.

######################################################################

# BellSant Machine Health API

Welcome to the BellSant Machine Health API! This API allows you to evaluate the health of various machines and their components based on provided data. This README provides instructions on how to set up and use the API.

## Prerequisites

Before you get started, make sure you have the following prerequisites installed on your system:

- Node.js: [Download Node.js](https://nodejs.org/)
- Yarn (optional but recommended, can use NPM instead): [Install Yarn](https://classic.yarnpkg.com/en/docs/install/)

## Installation

Follow these steps to set up the BellSant Machine Health API:

1. Navigate to the project directory:

   ```bash
   cd api
   ```

2. Install dependencies using Yarn (or npm if you prefer):

   ```bash
   yarn
   ```

## Usage

### Starting the API

To start the API, run the following command:

```bash
yarn start
```

The API will be accessible at `http://localhost:3001` by default. You can change the port or other configurations in the `app.ts` file.

### Evaluating Machine Health

You can evaluate the health of a machine by sending a POST request to the `/machine-health` endpoint. Here's an example using cURL:

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "machines": {
    "weldingRobot": {
      "errorRate": "0.5",
      "vibrationLevel": "2.5"
    }
  }
}' http://localhost:3001/machine-health
```

The response will include the machine name and its health score.

### API Endpoints

- `POST /machine-health`: Calculate the health of a machine based on provided data.

## Testing

You can add and run tests to ensure the correctness of the API. Follow these steps to add tests:

1. Locate the "tests" folder

2. Inside the "tests" folder, you can create test files for your code. You can use testing libraries like Jest, Mocha, or others to write your tests. There is a starter example test to help you get started.

3. To run the tests, use the following command:

   ```bash
   yarn test
   ```

## Customization

You can customize machine data and health evaluation logic by modifying the `machineData.json` file and the calculation functions in `app.ts`.
