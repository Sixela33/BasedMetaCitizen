# Etapa 1: Builder
FROM node:20-slim AS builder
LABEL com.centurylinklabs.watchtower.enable="true"

WORKDIR /app

RUN npm install -g pnpm@8.15.5

# Add build arguments
ARG NEXT_PUBLIC_PRIVY_APP_ID
ARG NEXT_PUBLIC_GATEWAY_URL
ARG PINATA_JWT
ARG NEXT_PUBLIC_BACKEND_URL

# Set environment variables
ENV NEXT_PUBLIC_PRIVY_APP_ID=$NEXT_PUBLIC_PRIVY_APP_ID
ENV NEXT_PUBLIC_GATEWAY_URL=$NEXT_PUBLIC_GATEWAY_URL
ENV PINATA_JWT=$PINATA_JWT
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

COPY . .

RUN pnpm install

ENV NEXT_PUBLIC_IGNORE_BUILD_ERROR=true

RUN pnpm build

# Etapa 2: Producción
FROM node:20-slim

WORKDIR /app

RUN npm install -g pnpm@8.15.5

# Add build arguments again for runtime
ARG NEXT_PUBLIC_PRIVY_APP_ID
ARG NEXT_PUBLIC_GATEWAY_URL
ARG PINATA_JWT
ARG NEXT_PUBLIC_BACKEND_URL

# Set environment variables for runtime
ENV NEXT_PUBLIC_PRIVY_APP_ID=$NEXT_PUBLIC_PRIVY_APP_ID
ENV NEXT_PUBLIC_GATEWAY_URL=$NEXT_PUBLIC_GATEWAY_URL
ENV PINATA_JWT=$PINATA_JWT
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.ts ./next.config.ts

RUN pnpm install --prod

EXPOSE 3000

CMD ["pnpm", "start"]
