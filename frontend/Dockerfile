# Etapa 1: Builder
FROM node:20-slim AS builder
LABEL com.centurylinklabs.watchtower.enable="true"

WORKDIR /app

RUN npm install -g pnpm@8.15.5

COPY . .

RUN pnpm install

ENV NEXT_PUBLIC_USERS_API_URL=https://metacitizen.com.ar
ENV NEXT_PUBLIC_PRIVY_APP_ID=cm8v9esji028d7twhtlzl6v4p
ENV NEXT_PUBLIC_IGNORE_BUILD_ERROR=true

RUN pnpm build

# Etapa 2: Producción
FROM node:20-slim

WORKDIR /app

RUN npm install -g pnpm@8.15.5

COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.ts ./next.config.ts

RUN pnpm install --prod

EXPOSE 3000

CMD ["pnpm", "start"]
