# Sunnify Frontend Dockerfile
FROM node:18-alpine AS base
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Build
COPY . .
RUN npm run build

EXPOSE 3000
ENV PORT=3000
CMD ["npm", "start"]
