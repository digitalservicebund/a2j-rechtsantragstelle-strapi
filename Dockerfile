FROM node:18-alpine

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
RUN echo "Building for NODE_ENV: ${NODE_ENV}"

# Installing libvips-dev for sharp compatibility
RUN apk add --update --no-cache vips-dev

WORKDIR /opt/
COPY ./package.json ./package-lock.json ./
ENV PATH /opt/node_modules/.bin:$PATH
RUN npm install

WORKDIR /opt/app
COPY ./ .
RUN npm run build

EXPOSE 1337
CMD exec npm run $([[ "$NODE_ENV" == "development" ]] && echo "develop" || echo "start")

