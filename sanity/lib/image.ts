import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';
import { dataset, projectId } from './client';

const imageBuilder = projectId
  ? createImageUrlBuilder({
      projectId: projectId || '',
      dataset: dataset || '',
    })
  : null;

export const urlForImage = (source: Image | string) => {
  if (typeof source === 'string') return source;
  if (!imageBuilder || !source?.asset) return '';
  return imageBuilder?.image(source).auto('format').fit('max').url();
};
