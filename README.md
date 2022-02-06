# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js (v16+) - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

```
git checkout NESTJS
```

```
cd nodejs2021Q4-service
```

## To run application using Docker container run in your terminal
```
docker-compose up -d
```
# To see how containers are running
Open Docker Desktop and select 'Containers/Apps'
# To stop and to remove Docker containers run in your terminal
```
docker-compose down
```
# To check image's size run in your terminal
```
docker image ls
```
# To remove image run in your terminal
```
docker rmi {image ID}
```

## Running application without container
```
npm install
```
```
npm run start:dev
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests with authorization
```
npm test:auth
```

### Auto-fix and format
```
npm run lint
```
