import { fetchUptimeIssues } from '../api';

export const Query = {
  async alerts(
    _: any,
    __: any,
    context: ContextWithLoaders,
  ): Promise<GQLUptimeAlert[]> {
    return fetchUptimeIssues();
  },
};

export const resolvers = {};
