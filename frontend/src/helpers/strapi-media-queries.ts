import { ImageDataLike } from "gatsby-plugin-image/dist/src/components/hooks";

export type StrapiImageQuery = {
  alternativeText: string;
  localFile: ImageDataLike;
};

export type StrapiVideoQuery = {
  alternativeText: string;
  url: string;
};

export type StrapiMediaQuery = {
  alternativeText: string;
  mime: string;
  localFile: ImageDataLike & { url: string };
};
