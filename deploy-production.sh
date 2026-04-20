#!/bin/bash

# Production deployment script for AWS EC2
# Mirrors deploy.sh but uses npm start instead of npm run dev

# refresh
echo "[$(date '+%Y-%m-%d %H:%M:%S')] pulling latest code..."
git pull origin main

# add dependencies and build
echo "[$(date '+%Y-%m-%d %H:%M:%S')] installing dependencies and building the project..."
npm install

echo "[$(date '+%Y-%m-%d %H:%M:%S')] running tests"
# test
npm test

echo "[$(date '+%Y-%m-%d %H:%M:%S')] starting the server with PM2..."
# start with PM2 (process manager) if available, otherwise use npm start
if command -v pm2 &> /dev/null; then
    pm2 restart payments-manager || pm2 start dist/src/server.js --name payments-manager
    pm2 save
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] server started with PM2"
else
    npm start
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] server started"
fi
