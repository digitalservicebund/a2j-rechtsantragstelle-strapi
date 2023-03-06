FROM node:16-alpine
# Installing libvips-dev for sharp Compatability
RUN apk update && apk add  build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/
COPY ./package.json ./yarn.lock ./
ENV PATH /opt/node_modules/.bin:$PATH

RUN yarn config set network-timeout 600000 -g && mkdir -p /tmp/.yarn-cache && yarn install --cache-folder /tmp/.yarn-cache

WORKDIR /opt/app
COPY ./ .
RUN yarn build
RUN mkdir -p /opt/app/database/migrations
RUN chown 1000:1000 -R /opt/app
EXPOSE 1337
# Override entrypoint
ENTRYPOINT []
CMD ["yarn", "develop"]



