module.exports = ({ env }) => {
  const config = {
    "site-publisher": {
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
            s3Options: {
              endpoint: "https://" + env("OBS_ENDPOINT"),
              region: "eu-de",
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
