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

Strapi comes with a fully featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI)

```bash
# Start strapi instance
npm run start

# Build admin panel
npm run build

# Start strapi instance with autoreload & content builder enabled
npm run develop
```

## Transfer staging data to local database

**Deletes all you local data!**

[docs](https://docs.strapi.io/dev-docs/data-management/transfer)

* Strapi versions must match exactly

```sh
npm run strapi transfer -- --from "https://a2j-rast-strapi.dev.ds4g.net/admin/" --to-token=<PUSH_TRANSFER_TOKEN_FROM_LOCAL_STRAPI> --from-token=<PULL_TRANSFER_TOKEN_FROM_STAGING_STRAPI>
```

Create your own transfer tokens in Strapi Admin Settings "Transfer Tokens".

## Data migrations

**Be careful. Test with local dump first before committing.**

[docs](https://docs.strapi.io/dev-docs/database-migrations)

* read the (short) docs!
* run **once** on Strapi server start-up (or reload when using `npm run develop`)
* migration files are run in alphabetical order (use time stamps in front)
* **no revert** possible
* only(?) use for data migration, not for changing database structure (do this in the schemas instead)
* you might not want to run a migration in unit tests -> check for `process.env.NODE_ENV === "test"` and return early
