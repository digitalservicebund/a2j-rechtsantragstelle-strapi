# Adapted from https://docs.strapi.io/dev-docs/installation/docker#production-dockerfile
# Creating multi-stage build for production
FROM node:20-alpine AS build
RUN apk update && apk add --no-cache build-base zlib-dev libpng-dev vips-dev > /dev/null 2>&1
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/
COPY package.json package-lock.json ./
COPY ./patches/* ./patches/
RUN npm ci --omit=dev
ENV PATH /opt/node_modules/.bin:$PATH
WORKDIR /opt/app
COPY . .
RUN npm run build

# Creating final production image
FROM node:20-alpine
RUN apk add --no-cache vips-dev
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY --from=build /opt/node_modules ./node_modules
WORKDIR /opt/app
COPY --from=build /opt/app ./
ENV PATH /opt/node_modules/.bin:$PATH

RUN mkdir -p /opt/app/database/migrations
RUN chown -R node:node /opt/app
USER node
EXPOSE 1337
# Avoiding NPM as it wants to read to /.npm/ which doesn't work in read-only
CMD ["strapi", "start"]
