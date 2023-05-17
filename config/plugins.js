module.exports = ({ env }) => {
  const config = { };

  const uploadConfig = {
    upload: {
      config: {
        provider: 'aws-s3',
        providerOptions: {
          s3Options: {
            endpoint: env('OBS_ENDPOINT'),
            params: {
              Bucket: env('OBS_BUCKET_NAME'),
            },
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
