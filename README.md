# EVOL Services
Technical Interview Project for EVOL Services

## Prerequisites
- **Docker Engine - Version 27.3.1 and up:** https://docs.docker.com/engine/install/
- **Docker Compose - Version 2.29.7 and up:** https://docs.docker.com/compose/install/

## Running the project
- **From the project root folder:** docker compose up --build
- **Check if the containers are running:** docker ps -a
- *If any container is not running, rerun* **docker compose up --build**

## Accessing the project
- **Front-end:** http://localhost:5173
- **Back-end:** http://localhost:3000/api/tasks

## Accessing the database (to check the saved data)
- **From the project root folder:** docker exec -it evoldatabase bash
- **In the evoldatabase container bash shell:** psql -h localhost -d evoldatabase -U postgres
- **In the evoldatabase database:** SELECT * FROM Task;