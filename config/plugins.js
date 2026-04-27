module.exports = ({ env }) => {
  const config = {
    "gh-workflow-trigger-v5": {
      config: {
        owner: "digitalservicebund",
        repo: "a2j-rechtsantragstelle",
        workflow_id: "build-content.yml",
        token: env("GITHUB_TOKEN", "dummy"),
        branch: "main",
        inputs: {},
      },
    },
  };
  if (env("OBS_ENDPOINT") && env("OBS_BUCKET_NAME")) {
    Object.assign(config, {
      upload: {
        config: {
          provider: "aws-s3",
          providerOptions: {
            baseUrl: `https://${env("OBS_BUCKET_NAME")}.${env("OBS_ENDPOINT")}`,
            s3Options: {
              endpoint: `https://${env("OBS_ENDPOINT")}`,
              forcePathStyle: false,
              region: env("OBS_REGION") ?? "eu-de",
              credentials: {
                accessKeyId: env("AWS_ACCESS_KEY_ID"),
                secretAccessKey: env("AWS_SECRET_ACCESS_KEY"),
              },
              params: {
                Bucket: env("OBS_BUCKET_NAME"),
              },
            },
          },
          actionOptions: {
            upload: {},
            uploadStream: {},
            delete: {},
          },
        },
      },
    });
  }
  return config;
};
