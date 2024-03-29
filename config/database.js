module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5431),
      database: env('DATABASE_NAME', 'strapi').trim(),
      user: env('DATABASE_USERNAME', 'strapi').trim(),
      password: env('DATABASE_PASSWORD', 'strapi').trim(),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
