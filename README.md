# nodejs-boilerplate-ms

This the base microservice for next projects.

### Run docker

_To build a docker image you simple have to run:_

```
$ ./run-docker.sh
```

### How to run the ms without docker

1. Set env vars.
2. npm run build
3. npm run start

### How to develop without docker

1. Set env vars.
2. npm run dev

### How to test

```
$ npm run test
```

## Envars
- NODE_ENV
- LOG_LEVEL (info)
- APP_NAME
- APP_ENV
- PORT (5000)
- AUTH_HEADER (x-auth-secret)
- AUTH_SECRET
- REST_TIMEOUT (2000)
- MONGO_URI
- MONGO_DATABASE
- MONGO_TIMEOUT

## Routes

| METHOD | PATH | DESCRIPTION |
| ------ | ---- | ----------- |
| **GET** | */ping* | pings database for health check |
| **GET** | */example/:id* | get an example |
| **POST** | */example* | create a new example |
| **PUT** | */example/:id* | update an example |
| **DELETE** | */example/:id* | delete an example |
