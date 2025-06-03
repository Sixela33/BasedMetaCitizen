# Stage 1: Builder
FROM node:20-slim AS builder

WORKDIR /app

RUN npm install -g pnpm@10.11.0

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# Stage 2: Production
FROM node:20-slim AS production

WORKDIR /app

RUN npm install -g pnpm@10.11.0

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

COPY --from=builder /app/dist ./dist

EXPOSE 8000

USER node

CMD ["pnpm", "start:prod"]