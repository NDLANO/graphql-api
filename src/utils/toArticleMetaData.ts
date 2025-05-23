/**
 * Copyright (c) 2023-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import sortBy from "lodash/sortBy";
import { IConceptDTO, IConceptSummaryDTO } from "@ndla/types-backend/concept-api";
import { IImageMetaInformationV3DTO } from "@ndla/types-backend/image-api";
import { ConceptVisualElementMeta, EmbedMetaData } from "@ndla/types-embed";
import { licenseFixer, roleMapper } from "./apiHelpers";
import { ndlaUrl } from "../config";
import {
  GQLArticleMetaData,
  GQLAudioLicense,
  GQLBrightcoveLicense,
  GQLConceptLicense,
  GQLCopyright,
  GQLTextblockLicense,
  GQLFootNote,
  GQLGlossLicense,
  GQLH5pLicense,
  GQLImageLicense,
  GQLPodcastLicense,
} from "../types/schema";
import { unreachable } from "./unreachable";

type Success<T extends EmbedMetaData["resource"]> = Extract<EmbedMetaData, { resource: T; status: "success" }>;

const footnoteMetaData = ({ embedData, data }: Success<"footnote">, acc: MetaData) => {
  acc["footnotes"] = acc["footnotes"].concat({
    ...embedData,
    ref: data.entryNum,
    authors: data.authors,
    year: data.year,
  });
};

const imageMetaData = (data: IImageMetaInformationV3DTO, acc: MetaData) => {
  acc["images"] = acc["images"].concat({
    id: data.id,
    title: data.title.title,
    altText: data.alttext.alttext,
    copyright: data.copyright,
    src: data.image.imageUrl,
  });
};

const audioMetaData = ({ data }: Success<"audio">, acc: MetaData) => {
  if (data.podcastMeta) {
    acc["podcasts"] = acc["podcasts"].concat({
      id: data.id.toString(),
      title: data.title.title,
      copyright: data.copyright,
      src: data.audioFile.url,
      description: data.podcastMeta?.introduction,
      coverPhotoUrl: data.podcastMeta?.coverPhoto.url,
    });
  } else {
    acc["audios"] = acc["audios"].concat({
      id: data.id.toString(),
      title: data.title.title,
      copyright: data.copyright,
      src: data.audioFile.url,
    });
  }

  if (data.imageMeta) {
    imageMetaData(data.imageMeta, acc);
  }
};

const brightcoveMetaData = ({ data, embedData }: Success<"brightcove">, acc: MetaData) => {
  const src = `https://players.brightcove.net/${embedData.account}/${embedData.player}_default/index.html?videoId=${embedData.videoid}`;
  const download = sortBy(
    data.sources.filter((src) => src.container === "MP4" && src.src),
    (src) => src.size,
  )?.[0]?.src;
  const source = sortBy(
    data.sources.filter((s) => s.width && s.height),
    (s) => s.height,
  )?.[0];
  acc["brightcoves"] = acc["brightcoves"].concat({
    id: data.id,
    title: data.name ?? "",
    description: data.description ?? data["long_description"] ?? data.name,
    uploadDate: data["published_at"] ?? undefined,
    cover: data.images?.poster?.src,
    src,
    iframe: {
      src,
      height: source?.height ?? 480,
      width: source?.width ?? 640,
    },
    download,
    copyright: data.copyright,
  });
};

const h5pMetaData = ({ data, embedData }: Success<"h5p">, acc: MetaData) => {
  const h5p = data.h5pLicenseInformation?.h5p;

  const authors =
    h5p?.authors
      ?.filter((author) => !!author.name)
      ?.map((author) => ({
        type: roleMapper(author.role ?? ""),
        name: author.name,
      })) ?? [];

  const copyright: GQLCopyright | undefined = h5p
    ? {
        license: {
          license: licenseFixer(h5p.license ?? "", h5p.licenseVersion ?? "4.0"),
          url: h5p.source ?? "",
          description: h5p.licenseExtras ?? "",
        },
        creators: [],
        processors: [],
        rightsholders: authors,
        origin: h5p.source ?? "",
      }
    : undefined;
  acc["h5ps"] = acc["h5ps"].concat({
    id: embedData.path.replace("/resource/", ""),
    copyright: copyright,
    title: h5p?.title ?? embedData.title ?? "",
    thumbnail: h5p?.thumbnail ?? h5p?.assets?.[0]?.thumbnail ?? "",
    src: data.h5pUrl,
  });
};

const conceptMetaData = (
  concept: IConceptDTO | IConceptSummaryDTO,
  visualElement: ConceptVisualElementMeta | undefined,
  acc: MetaData,
) => {
  const data = {
    id: concept.id.toString(),
    title: concept.title.title,
    copyright: concept.copyright,
    src: `${ndlaUrl}/embed-iframe/concept/${concept.id}`,
    content: concept.content?.htmlContent ?? "",
  };
  if (concept.conceptType === "gloss") {
    acc["glosses"] = acc["glosses"].concat(data);
  } else {
    acc["concepts"] = acc["concepts"].concat(data);
  }
  if (visualElement?.status === "success") {
    switch (visualElement.resource) {
      case "brightcove":
        brightcoveMetaData(visualElement, acc);
        break;
      case "image":
        imageMetaData(visualElement.data, acc);
        break;
      case "audio":
        audioMetaData(visualElement, acc);
        break;
      case "h5p":
        h5pMetaData(visualElement, acc);
        break;
      case "iframe":
      case "external": {
        if (visualElement.data.iframeImage) {
          imageMetaData(visualElement.data.iframeImage, acc);
        }
        break;
      }
      default:
        unreachable(visualElement);
    }
  }
};

const textblockMetaData = ({ embedData }: Success<"copyright">, acc: MetaData) => {
  acc["textblocks"] = acc["textblocks"].concat({
    title: embedData.title,
    copyright: embedData.copyright,
  });
};

interface MetaData {
  footnotes: GQLFootNote[];
  images: GQLImageLicense[];
  audios: GQLAudioLicense[];
  podcasts: GQLPodcastLicense[];
  brightcoves: GQLBrightcoveLicense[];
  h5ps: GQLH5pLicense[];
  concepts: GQLConceptLicense[];
  glosses: GQLGlossLicense[];
  textblocks: GQLTextblockLicense[];
}

export const toArticleMetaData = (embeds: (EmbedMetaData | undefined)[]): Omit<GQLArticleMetaData, "__typename"> => {
  return embeds.reduce<MetaData>(
    (acc, curr) => {
      if (!curr || curr.status === "error") {
        return acc;
      }
      switch (curr.resource) {
        case "footnote":
          footnoteMetaData(curr, acc);
          break;
        case "image":
          imageMetaData(curr.data, acc);
          break;
        case "audio":
          audioMetaData(curr, acc);
          break;
        case "brightcove":
          brightcoveMetaData(curr, acc);
          break;
        case "h5p":
          h5pMetaData(curr, acc);
          break;
        case "concept":
          conceptMetaData(curr.data.concept, curr.data.visualElement, acc);
          break;
        case "iframe":
        case "external": {
          if (curr.data.iframeImage) {
            imageMetaData(curr.data.iframeImage, acc);
          }
          break;
        }
        case "contact-block":
        case "campaign-block":
          if (curr.data.image) {
            imageMetaData(curr.data.image, acc);
          }
          break;
        case "key-figure":
        case "pitch":
          if (curr.data.metaImage) {
            imageMetaData(curr.data.metaImage, acc);
          }
          break;
        case "copyright":
          textblockMetaData(curr, acc);
          break;
        case "content-link":
        case "related-content":
        case "code-block":
        case "file":
        case "link-block":
        case "uu-disclaimer":
        case "comment":
        case "symbol":
          break;
        default:
          unreachable(curr);
      }
      return acc;
    },
    {
      footnotes: [],
      images: [],
      audios: [],
      podcasts: [],
      brightcoves: [],
      h5ps: [],
      concepts: [],
      glosses: [],
      textblocks: [],
    },
  );
};
