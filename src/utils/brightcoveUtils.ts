/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { licenses, contributorGroups, contributorTypes, getLicenseByAbbreviation } from "@ndla/licenses";
import { BrightcoveCopyright } from "@ndla/types-embed";

const getLicenseByNBTitle = (title?: string) => {
  switch (title?.replace(/\s/g, "").toLowerCase()) {
    case "navngivelse-ikkekommersiell-ingenbearbeidelse":
      return licenses.CC_BY_NC_ND_4;
    case "navngivelse-ikkekommersiell-delpåsammevilkår":
      return licenses.CC_BY_NC_SA_4;
    case "navngivelse-ikkekommersiell":
      return licenses.CC_BY_NC_4;
    case "navngivelse-ingenbearbeidelse":
      return licenses.CC_BY_ND_4;
    case "navngivelse-delpåsammevilkår":
      return licenses.CC_BY_SA_4;
    case "navngivelse":
      return licenses.CC_BY_4;
    case "offentligdomene":
      return licenses.PD;
    case "publicdomaindedication":
      return licenses.CC0;
    case "publicdomainmark":
      return licenses.PD;
    case "fristatus-erklæring":
      return licenses.CC0;
    case "opphavsrett":
      return licenses.COPYRIGHTED;
    default:
      return title;
  }
};
const mapContributorType = (type: string) => {
  switch (type) {
    case "Manus":
      return "Manusforfatter";
    case "Musikk":
      return "Komponist";
    case "Opphavsmann":
      return "Opphaver";
    default:
      return type;
  }
};

interface Author {
  name: string;
  type: string;
}

interface CopyrightType {
  creators: Author[];
  processors: Author[];
  rightsholders: Author[];
}

const parseContributorsString = (contributorString: string): Author => {
  const contributorFields = contributorString.split(/: */);
  if (contributorFields.length !== 2) return { type: "", name: contributorFields[0] ?? "" };
  const [type, name] = contributorFields;
  const contributorType = Object.keys(contributorTypes.nb ?? {}).find(
    (key) => contributorTypes.nb![key] === mapContributorType(type!.trim()),
  );
  return { type: contributorType || "", name: name! };
};

export const getContributorGroups = (fields: Record<string, string>) => {
  const licenseInfoKeys = Object.keys(fields).filter((key) => key.startsWith("licenseinfo"));

  const contributors = licenseInfoKeys.map((key) => parseContributorsString(fields[key] ?? ""));

  return contributors.reduce<CopyrightType>(
    (groups, contributor) => {
      const objectKeys = Object.keys(contributorGroups) as Array<keyof typeof contributorGroups>;
      const group = objectKeys.find((key) => {
        return contributorGroups[key].find((type) => type === contributor.type);
      });
      if (group) {
        return { ...groups, [group]: [...groups[group], contributor] };
      }
      return { ...groups, creators: [...groups.creators, contributor] };
    },
    {
      creators: [],
      processors: [],
      rightsholders: [],
    },
  );
};

export const getBrightcoveCopyright = (
  customFields: Record<string, string>,
  locale: string,
  origin?: string,
): BrightcoveCopyright | undefined => {
  const licenseCode = getLicenseByNBTitle(customFields.license);
  if (!licenseCode) {
    return undefined;
  }
  const license = getLicenseByAbbreviation(licenseCode, locale);

  return {
    license: {
      license: licenseCode,
      description: license.description,
      url: license.url,
    },
    origin,
    ...getContributorGroups(customFields),
  };
};
