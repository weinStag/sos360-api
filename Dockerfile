FROM node:18-alpine

WORKDIR /app

COPY package*.json yarn.lock ./

COPY prisma/ ./prisma/

RUN yarn run prisma:generate

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "run", "start:prod"]
