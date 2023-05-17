# 🚀 Getting started with Strapi

## Quickstart

1. Copy `.env.example` to `.env`
2. Build and start the application's containers

```bash
cp .env.example .env
docker compose up
```

1. Visit http://localhost:1337/admin/
2. Under Settings > Internationalization: Add `German (de)` & set it as default
3. Under Settings > API Tokens: Add new token and copy it to the `.env` of the A2J webapp

### Troubleshooting

If you get an error like `ECONNREFUSED 172.**.*.*:5431` on Mac, this is a [known issue](https://github.com/docker/compose/issues/4783#issuecomment-301778969). Just remove the port binding to 5431 for it to work.

## Strapi CLI

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI)

```bash
# Start strapi instance
npm run start

# Start strapi instance  with autoreload enabled
npm run develop

# Build admin panel
npm run build
```

## Plugins

To add a plugin, install it & rebuild the container:

```bash
npm install --save strapi-plugin-navigation
docker compose build
```
