FROM node:17-alpine
WORKDIR /app

ARG PORT
ARG ORIGIN

COPY package.json .
COPY yarn.lock .

RUN yarn --frozen--lockfile

COPY . .

RUN yarn build

EXPOSE $PORT
CMD ["node", "dist/index.js"]