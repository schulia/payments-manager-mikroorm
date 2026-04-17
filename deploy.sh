#!/bin/bash

# refresh
  git pull origin main

# add dependecies and build
echo "installing dependencies and building the project..."
  npm install

echo "running tests"
# test
    npm test

echo "starting the server"
# start
    npm run dev
