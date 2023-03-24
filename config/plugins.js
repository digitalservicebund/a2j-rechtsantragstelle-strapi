module.exports = ({ env }) => {
  const config = {
    'content-export-import': {
      enabled: true,
      resolve: './src/plugins/content-export-import', // path to plugin folder
    },
  };

  const uploadConfig = {
    upload: {
      config: {
        provider: 'aws-s3',
        providerOptions: {
          endpoint: env('OBS_ENDPOINT'),
          params: {
            Bucket: env('OBS_BUCKET_NAME'),
          },
        },
      },
    },
  };

  if (env('OBS_ENDPOINT')) {
    // uploads to OBS
    return { ...config, ...uploadConfig };
  }
  // uploads to local disk

  return config;
};
