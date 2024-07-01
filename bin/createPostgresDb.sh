#!/bin/bash

set -euxo pipefail

# Check if Docker is running
# FIXME: doesn't work great on windows
# if ! docker info >/dev/null 2>&1; then
# 	echo "Docker does not seem to be running, start it and try again."
# 	exit 1
# fi

# Remove existing container if it exists
if [ "$(docker ps -aq -f name=jb-fs)" ]; then
	echo "Removing existing container..."
	docker rm -f jb-fs
fi

# Start Postgres instance
docker run --name jb-fs -e POSTGRES_PASSWORD=pass -p 5440:5432 -d postgres

# Wait for Postgres to be ready
echo "Waiting for PostgreSQL to start..."
docker exec jb-fs bash -c 'until pg_isready -U postgres; do sleep 1; done'
echo "PostgreSQL started."

# Run the db migration script
npm run migrate

# Assuming you have a 'spotify_data.csv' file in your current directory
# And the table in your database is called 'song'

# First, copy the data.csv to the running docker container
unzip -o spotify_tracks.zip
docker cp spotify_data.csv jb-fs:/spotify_data.csv

# Then, use psql inside the docker container to import the data
docker exec -it jb-fs psql -U postgres -c "\copy song FROM '/spotify_data.csv' DELIMITER ',' CSV HEADER"
