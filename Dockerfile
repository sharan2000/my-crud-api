FROM node:24 as build

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

FROM node:24-alpine as final

WORKDIR /app

COPY package*.json .

RUN npm ci --omit=dev

COPY --from=build /app/dist .

CMD ["npm", "start"]