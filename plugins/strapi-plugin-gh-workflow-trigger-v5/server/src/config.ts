import { Core } from '@strapi/strapi';
import { PLUGIN_ID } from '../../admin/src/pluginId';

type PluginConfig = {
  owner: string;
  repo: string;
  workflow_id: string;
  token: string;
  branch: string;
  inputs: Record<string, string>;
};

export const getPluginConfig = (strapi: Core.Strapi) =>
  strapi.config.get<PluginConfig>(`plugin::${PLUGIN_ID}`);

export const config = {
  default: () =>
    ({
      owner: '',
      repo: '',
      workflow_id: '',
      token: '',
      branch: 'main',
      inputs: {},
    }) satisfies PluginConfig,
  validator(config: PluginConfig) {
    if (!config.owner) {
      throw new Error('owner is required');
    }
    if (!config.repo) {
      throw new Error('repo is required');
    }
    if (!config.workflow_id) {
      throw new Error('workflow_id is required');
    }
    if (!config.token) {
      throw new Error('token is required');
    }
    if (!config.branch) {
      throw new Error('branch is required');
    }
  },
};
