import type { Core } from '@strapi/strapi';
import { getPluginConfig } from './config';

const githubHeaders = (token: string) => ({
  Accept: 'application/vnd.github.v3+json',
  Authorization: 'token ' + token,
});

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async listWorkflows() {
    const { owner, repo, workflow_id, token, branch } = getPluginConfig(strapi);

    let url = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow_id}/runs?branch=${branch}`;

    return fetch(url, { headers: githubHeaders(token) })
      .then((response) => response.json() as Promise<Record<string, unknown>>)
      .catch((error) => {
        console.error('Error:', error);
      });
  },

  async trigger(username?: string) {
    const { owner, repo, workflow_id, token, branch: ref, inputs } = getPluginConfig(strapi);

    // Ideally, we would pass the strapi username to the workflow dispatch to display later
    // However, there currently is no way to retrieve the inputs of a workflows: https://github.com/orgs/community/discussions/73223
    const data = { ref, inputs };

    const url = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow_id}/dispatches`;
    return fetch(url, {
      method: 'POST',
      headers: githubHeaders(token),
      body: JSON.stringify(data),
    })
      .then((response) => ({ success: response.status === 204 }))
      .catch((error) => ({ success: false, error }));
  },

  async cancel(cancelUrl?: string) {
    if (!cancelUrl) return false;

    return fetch(cancelUrl, {
      method: 'POST',
      headers: githubHeaders(getPluginConfig(strapi).token),
    })
      .then((response) => ({ success: response.status === 204 }))
      .catch((error) => ({ success: false, error }));
  },
});
