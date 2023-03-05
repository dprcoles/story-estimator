FROM node:17-alpine
WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-lock.yaml .

RUN pnpm fetch

ADD . .
RUN pnpm install -r --offline

RUN npx prisma db push --accept-data-loss
RUN npx prisma generate

RUN pnpm build

CMD ["node", "dist/main"]