FROM node:17-alpine
WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-lock.yaml .

RUN pnpm fetch

ADD . .
RUN pnpm install -r --offline

RUN pnpm build

RUN npx prisma db push --accept-data-loss
RUN npx prisma generate

CMD ["node", "dist/main"]