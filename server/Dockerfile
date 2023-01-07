FROM node:17-alpine
WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn --frozen--lockfile

COPY . .

RUN yarn build

RUN npx prisma generate

CMD ["node", "dist/index.js"]