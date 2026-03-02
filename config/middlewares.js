module.exports = ({ env }) => {
  const deprecatedUploadBucket = `${env('OBS_BUCKET_NAME')}.${env('OBS_ENDPOINT')}`; // Delete after migration
  const uploadBucket = `${env('OBS_ENDPOINT')}/${env('OBS_BUCKET_NAME')}/`;

  return [
    'strapi::errors',
    'strapi::cors',
    'strapi::poweredBy',
    'strapi::logger',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
    // extend default security config as described here:
    // https://market.strapi.io/providers/@strapi-provider-upload-aws-s3
    {
      name: 'strapi::security',
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            'connect-src': [
              "'self'",
              'https:',
              'ws://localhost:5173/',
              'http://localhost:5173/',
            ],
            'img-src': [
              "'self'",
              'data:',
              'blob:',
              'market-assets.strapi.io',
              // allow display of image thumbnail previews
              deprecatedUploadBucket,
              uploadBucket
            ],
            'media-src': [
              "'self'",
              'data:',
              'blob:',
              'market-assets.strapi.io',
              // allow display of media thumbnail previews
              deprecatedUploadBucket,
              uploadBucket
            ],
            upgradeInsecureRequests: null,
          },
        },
      },
    },
  ];
};
