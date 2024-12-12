import { type Context } from 'koa';
import type { Core } from '@strapi/strapi';
import githubService from './githubService';

export const githubController = ({ strapi }: { strapi: Core.Strapi }) => {
  const ghService = githubService({ strapi });

  return {
    async listWorkflows(ctx: Context) {
      ctx.body = await ghService.listWorkflows();
    },

    async trigger(ctx: Context) {
      ctx.body = await ghService.trigger(ctx.state?.user?.email);
    },

    async cancel(ctx: Context) {
      ctx.body = await ghService.cancel(ctx.request.body?.cancel_url);
    },
  };
};
