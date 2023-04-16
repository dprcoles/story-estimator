FROM node:17-alpine
WORKDIR /app

ARG PORT
ARG DATABASE_URL
ARG WEB_URL

ENV PORT=$PORT
ENV DATABASE_URL=$DATABASE_URL
ENV WEB_URL=$WEB_URL

RUN npm install -g pnpm

RUN pnpm fetch

ADD ./apps/server/ .
ADD pnpm-lock.yaml .

RUN pnpm i

RUN npx prisma db push --accept-data-loss --schema=./src/infrastructure/prisma/schema.prisma

RUN pnpm build

CMD ["node", "dist/main"]