# 🚀 Getting started with Strapi

## Requirement

- Node 18 - 22 (currently running version 22)

## Quickstart

1. Copy `.env.example` to `.env`
2. Build and start the application's containers

```bash
cp .env.example .env
docker compose up -d // or docker compose up strapiDB -d
```

1. Visit http://localhost:1337/admin/
2. Under Settings > Internationalization: Add `German (de)` & set it as default
3. Under Settings > API Tokens: Add new token (access key), set the token type to **read-only** and copy it to the `.env` of the A2J webapp

### Troubleshooting

- If you get an error like `ECONNREFUSED 172.**.*.*:5431` on Mac, this is a [known issue](https://github.com/docker/compose/issues/4783#issuecomment-301778969). Just remove the port binding to 5431 from docker-compose.yaml,
 
``` 
example#1 
  ports:
    - '5432:5432'
    
example#2  
 # Remove or comment out the ports section if not needed
 # ports:
 #   - "5431:5432"
  ```

- If you see this error, then you need to install Node 20.x not higher

```
(node:27666) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
```

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

## Sync with remote instance

Replaces all local data with a copy of remote instance

### Note

- Requires both strapi instances to be of the same version
- **Deletes all local data!**

### Steps

1. Create a `Push` transfer token in your local instance ([Settings / Transfer Tokens](http://localhost:1337/admin/settings/transfer-tokens)) & save as `TRANSFER_TOKEN_LOCAL` into your local `.env` file
2. Create a `Pull` transfer token on the [remote instance](https://a2j-rast-strapi.dev.ds4g.net/admin/settings/transfer-tokens) and save as `TRANSFER_TOKEN_REMOTE` into your `.env` file
3. Update the `TRANSFER_URL_REMOTE` (Note: this should point to the `/admin` endpoint)
4. Run `npm run transfer`. If the asset transfer process hangs, cancel it and retry with: `npm run transfer -- --exclude files`

## Data migrations

**Be careful. Test with local dump first before committing.**

[docs](https://docs.strapi.io/dev-docs/database-migrations)

- read the (short) docs!
- run **once** on Strapi server start-up (or reload when using `npm run develop`)
- migration files are run in alphabetical order (use time stamps in front)
- **no revert** possible
- only(?) use for data migration, not for changing database structure (do this in the schemas instead)
- you might not want to run a migration in unit tests -> check for `process.env.NODE_ENV === "test"` and return early
