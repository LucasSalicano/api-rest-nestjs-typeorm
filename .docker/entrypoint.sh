#! /bin/bash

npm install
npm run build
npx typeorm migrate:run -d dist/database/database.module.js
npm run start:dev