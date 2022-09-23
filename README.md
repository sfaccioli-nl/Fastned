# Fastned challenge

This project was build with React and Express. And for the database MongoDB
This site was built using Github [Click here](https://github.com/sfaccioli-nl/Fastned).

## Before installation

I'm providing .env files with sensitive data to the recruiter. One for the client side, and another for the server side.

## Server Installation

In the server directory, install all the necessary packages

```bash
server> npm i
```

Once its done, you can start the server with npm run dev

```bash
server> npm run dev
```

You will see this if everything went ok:

```bash
Files successfully emitted, waiting for typecheck results...
Issues checking in progress...
No issues found.

```

CONGRATULATIONS! You can test the api from postman now :) . I'm providing a collection with some data that you can test with the following endpoints.

## API Reference

## Locations

#### Get all locations

```http
  GET /api/locations
```

#### Get location by id

```http
  GET /api/locations/${id}
```

#### Update location

```http
  PATCH /api/locations/${id}
```

#### Delete location

```http
  DELETE /api/locations/${id}
```

## Chargers

#### Get all chargers

```http
  GET /api/chargers
```

#### Get chargersby id

```http
  GET /api/chargers/${id}
```

#### Update chargers

```http
  PATCH /api/chargers/${id}
```

#### Delete chargers

```http
  DELETE /api/chargers/${id}
```

## Client Installation

In the server directory, install all the necessary packages

```bash
client> npm i
```

Once its done, you can start the server with npm start

```bash
client > npm start
```

Also, my trello board for this project was: [TRELLO BOARD](https://trello.com/b/gzlvOZ6J/fastend-challenge).
