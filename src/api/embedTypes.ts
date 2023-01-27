export type EmbedData =
  | AudioEmbedData
  | BrightcoveEmbedData
  | ContentLinkEmbedData
  | H5pEmbedData
  | ImageEmbedData
  | RelatedContentEmbedData
  | ConceptEmbedData
  | NRKEmbedData
  | IframeEmbedData
  | CodeEmbedData
  | FootnoteEmbedData
  | ConceptListEmbedData;

export interface ContentLinkEmbedData {
  resource: 'content-link';
  contentId: string;
  linkText?: string;
  openIn?: string;
  contentType?: string;
}

export type ConceptEmbedData = {
  resource: 'concept';
  contentId: string;
  type: 'block' | 'inline';
  linkText: string;
};

export type ConceptListEmbedData = {
  resource: 'concept-list';
  tag: string;
  title: string;
  subjectId: string;
};

export interface CodeEmbedData {
  resource: 'code-block';
  codeFormat: string;
  codeContent: string;
  title?: string;
}

export type BrightcoveEmbedData = {
  resource: 'brightcove' | 'video';
  videoid: string;
  caption: string;
  url?: string;
  account: string;
  player: string;
  title: string;
  metaData?: any;
};

export type AudioEmbedData = {
  resource: 'audio';
  resource_id: string;
  type: string;
  url: string;
};

export interface FootnoteEmbedData {
  resource: 'footnote';
  title: string;
  type: string;
  year: string;
  edition: string;
  publisher: string;
  authors: string;
}

export interface H5pEmbedData {
  resource: 'h5p';
  path: string;
  url?: string;
  title?: string;
}

export interface IframeEmbedData {
  resource: 'iframe';
  type: string;
  url: string;
  width?: string;
  height?: string;
  title?: string;
  caption?: string;
  imageid?: string;
}

export interface RelatedContentEmbedData {
  resource: 'related-content';
  articleId?: string;
  url?: string;
  title?: string;
}

export interface NRKEmbedData {
  resource: 'nrk';
  nrkVideoId: string;
  url: string;
}

export interface ImageEmbedData {
  resource: 'image';
  resourceId: string;
  size?: string;
  align?: string;
  alt: string;
  caption?: string;
  url?: string;
  focalX?: string;
  focalY?: string;
  lowerRightY?: string;
  lowerRightX?: string;
  upperLeftY?: string;
  upperLeftX?: string;
  metaData?: any;
}
