FROM node:16.20.2-alpine AS builder

# Create app directory
WORKDIR /usr/app

RUN apk add --no-cache git curl python3 make gcc libc-dev g++ libc6-compat openssl openssl-dev \
    && curl -sL https://unpkg.com/@pnpm/self-installer | node
RUN ln -sf python3 /usr/bin/python

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json ./
COPY prisma ./prisma/

# Install app dependencies
#RUN npm install -g npm@latest
#RUN npm install --legacy-peer-deps
RUN yarn install

COPY . ./

RUN npm run build

FROM node:16.20.2-alpine

COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/package*.json ./
COPY --from=builder /usr/app/dist ./dist
COPY --from=builder /usr/app/prisma ./prisma/

EXPOSE $PORT
CMD [ "yarn", "start:migrate:prod" ]