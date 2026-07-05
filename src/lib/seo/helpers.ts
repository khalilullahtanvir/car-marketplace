import { APP_NAME } from "@/constants";

export interface MetadataImage {
  readonly url: string;
  readonly width?: number;
  readonly height?: number;
  readonly alt?: string;
}

export interface SeoMetadataInput {
  readonly title?: string;
  readonly description?: string;
  readonly canonicalPath?: string;
  readonly openGraphImage?: MetadataImage;
}

export function createCanonicalUrl(baseUrl: string, path: string): string {
  return new URL(path, baseUrl).toString();
}

export function buildMetadataTitle(title?: string): string {
  return title ? `${title} | ${APP_NAME}` : APP_NAME;
}
