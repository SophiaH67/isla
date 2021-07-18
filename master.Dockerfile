# Dockerfile for master ONLY
FROM node:16
WORKDIR /app
COPY package* ./
RUN [ "npm", "install"]
COPY . .
CMD [ "npx", "--yes" ,"ts-node", "--transpile-only", "./src/master/index.ts"]