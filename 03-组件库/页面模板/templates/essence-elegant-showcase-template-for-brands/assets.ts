import dishOneImage from './public/images/dish-1.jpg';
import dishTwoImage from './public/images/dish-2.jpg';
import dishThreeImage from './public/images/dish-3.jpg';
import heroImage from './public/images/hero.jpg';
import kitchenImage from './public/images/kitchen-1.jpg';
import platingImage from './public/images/plating-1.jpg';
import placeholderImage from './public/placeholder.svg';

const localAssets: Record<string, string> = {
  '/images/dish-1.jpg': dishOneImage,
  '/images/dish-2.jpg': dishTwoImage,
  '/images/dish-3.jpg': dishThreeImage,
  '/images/hero.jpg': heroImage,
  '/images/kitchen-1.jpg': kitchenImage,
  '/images/plating-1.jpg': platingImage,
  '/placeholder.svg': placeholderImage,
};

export function resolveAssetSrc(src: string | undefined): string {
  if (!src) return placeholderImage;
  if (/^(?:https?:|data:|blob:)/u.test(src)) return src;

  const [pathWithoutQuery, query = ''] = src.split('?');
  const normalizedPath = pathWithoutQuery.startsWith('/')
    ? pathWithoutQuery
    : `/${pathWithoutQuery}`;
  const resolved = localAssets[normalizedPath];

  if (!resolved) return src;
  return query ? `${resolved}?${query}` : resolved;
}
