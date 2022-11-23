#! /bin/bash

npm install
npm run build
npx typeorm migrate:run ./typeorm.config.ts
npm run start:dev