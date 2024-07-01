# Song Searcher

A full-stack Next.js application with an API to retrieve popular songs.

Contains 1,000,000 popular tracks from Spotify.

## Prerequisites

* Docker
* Node

## Setup

```shell
npm i  # install dependencies
npm run init  # create database, run migrations, import sample data
```

## Run the development server:

```shell
npm run dev
```

Open [http://localhost:2000](http://localhost:2000) with your browser to view the application.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Database

This creates a postgres database running on port 5440. You can access it with username: `postgres`, password: `pass`.

You can connect to postgres with:
```shell
docker exec -it jb-fs psql -U postgres
```

## Task Description

As a user, I want to see a list of songs based on the author I input.
To do so, I need search autocomplete functionality.

Example keywords to test the implementation: `jason`, `winter`

> **Note**
> 1. Styling is not the main focus of the task
> 2. Google usage is allowed
> 3. Co-Pilot, Quodana, ChatGPT or any other AI-assisting tooling is not allowed
