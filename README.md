# Aiven Cloud Selection

## Run production like
To run both client and server together you will need Docker and Docker Compose installed.

Then simply run
```bash
docker-compose up
```
This will build the client and server docker images and run two containers. Client container is nginx serving static React App.

Access the client at `http://localhost:5173` and server if needed at `http://localhost:8000`

If ports are already taken on your machine you can change them in `docker-compose.yml` file, but mind that you will also need to update the CORS setting in the server. Check where `Access-Control-Allow-Origin` is set to do that.

## Run client for development
To run client for development
```bash
cd ./client
npm install
npm run dev
```
This will run Vite default server to serve the static React app with Hot reload and other dev features

## Run server for development
To run server for development
```bash
cd ./server
npm install
npm run dev
```
This will run Typescript tsc complier in watch mode and nodemon to restart the server on file changes

