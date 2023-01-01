FROM node:18.12.1-alpine
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
CMD ["yarn", "start"]

