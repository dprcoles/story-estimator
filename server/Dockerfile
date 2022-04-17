FROM node:17-alpine
WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn --frozen--lockfile

COPY . .

RUN yarn build

CMD ["node", "dist/index.js"]