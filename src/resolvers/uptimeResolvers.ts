/**
 * Copyright (c) 2022-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fetchUptimeIssues } from "../api";
import { fetchVersion } from "../api/taxonomyApi";
import { ipRanges } from "../config";
import { GQLUptimeAlert } from "../types/schema";

const localizedVersionHashTitle = (name: string, language: string) => {
  switch (language) {
    case "nb":
      return `Du ser på en forhåndsvisning av versjonen "${name}"`;
    case "nn":
      return `Du ser på ei førehandsvising av versjonen "${name}"`;
    default:
      return `You are viewing a preview of the version "${name}"`;
  }
};

const getAlertsFromUptime = async (context: ContextWithLoaders): Promise<GQLUptimeAlert[]> => {
  const alerts: GQLUptimeAlert[] = [];
  const uptimeResponse = await fetchUptimeIssues(context);

  const uptimeIssues = uptimeResponse.filter((iss) => iss.labels?.find((label) => label.name === "maintenance"));
  alerts.push(...uptimeIssues);

  const ipRange = context.req.headers["x-forwarded-for"]?.toString().split(".").slice(0, 2).join(".");
  const county = ipRange ? ipRanges[ipRange] : undefined;
  if (!county) {
    return alerts;
  }

  const geoAlerts = uptimeResponse.filter(
    (iss) => !!iss.labels?.find((label) => label.name === "county") && iss.labels.find((l) => l.name === county),
  );

  alerts.push(...geoAlerts);
  return alerts;
};

const getVersionHashAlert = async (context: ContextWithLoaders): Promise<GQLUptimeAlert | null> => {
  if (!context.versionHash) {
    return null;
  }

  const version = await fetchVersion(context.versionHash, context);
  if (version?.versionType !== "PUBLISHED") {
    return {
      number: -1,
      closable: false,
      title: localizedVersionHashTitle(version?.name ?? "", context.language),
    };
  }
  return null;
};

export const Query = {
  async alerts(_: any, __: any, context: ContextWithLoaders): Promise<GQLUptimeAlert[]> {
    const responses = await Promise.all([getVersionHashAlert(context), getAlertsFromUptime(context)]);
    return responses.flat().filter((alert) => !!alert);
  },
};

export const resolvers = {};
