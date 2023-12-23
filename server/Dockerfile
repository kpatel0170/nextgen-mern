FROM node:latest AS base-dev
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

FROM node:latest AS base-prod
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .

FROM base-dev AS development
CMD ["node", "-r", "./src/config/tracing.cjs", "--watch", "bin/www.js"]

FROM gcr.io/distroless/nodejs:18 AS production
WORKDIR /app
COPY --from=base-prod /app /app
CMD ["bin/www.js"]