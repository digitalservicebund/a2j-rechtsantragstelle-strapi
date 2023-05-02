module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 5431),
      database: env('DATABASE_NAME', 'strapi').trim(),
      user: env('DATABASE_USERNAME', 'strapi').trim(),
      password: env('DATABASE_PASSWORD', 'STRAPI').trim(),
      ssl: env.bool('DATABASE_SSL', false)
    }
  }
});
