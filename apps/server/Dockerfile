FROM node:17-alpine
WORKDIR /app

RUN npm install -g pnpm

RUN pnpm fetch

ADD . .
RUN pnpm install -r --prefer-offline

RUN npx prisma db push --accept-data-loss --schema=./src/infrastructure/prisma/schema.prisma

RUN pnpm build

CMD ["node", "dist/main"]