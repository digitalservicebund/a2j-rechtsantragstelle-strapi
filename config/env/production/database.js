module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', ''),
      port: env.int('DATABASE_PORT', undefined),
      database: env('DATABASE_NAME', '').trim(),
      user: env('DATABASE_USERNAME', '').trim(),
      password: env('DATABASE_PASSWORD', '').trim(),
      ssl: env.bool('DATABASE_SSL', false)
    }
  }
});
