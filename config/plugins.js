module.exports = ({ env }) => {
  const config = {};
  if (env("OBS_ENDPOINT") && env("OBS_BUCKET_NAME")) {
    Object.assign(config, {
      upload: {
        config: {
          provider: "aws-s3",
          providerOptions: {
            s3Options: {
              endpoint: env("OBS_ENDPOINT"),
              params: {
                Bucket: env("OBS_BUCKET_NAME"),
              },
            },
          },
        },
      },
    });
  }
  return config;
};
