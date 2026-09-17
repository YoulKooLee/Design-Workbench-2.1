import productForestImage from './public/images/02cdc426-dff4-4dff-b131-1b134c3699b5.png';
import gpsTrackingImage from './public/images/204cee22-9e85-49e8-9303-1d309af626b0.png';
import mountainPeaksImage from './public/images/3d4046a0-b072-4b07-941f-9141ee3ed4a7.png';
import accessoryBikeMountImage from './public/images/accessory-bike-mount.png';
import accessoryCarabinerImage from './public/images/accessory-carabiner.png';
import accessoryChargerImage from './public/images/accessory-charger.png';
import accessorySleeveImage from './public/images/accessory-sleeve.png';
import accessorySpeakerBaseImage from './public/images/accessory-speaker-base.png';
import accessoryStrapImage from './public/images/accessory-strap.png';
import bottleBikeImage from './public/images/bottle-bike.png';
import bottleCanyonImage from './public/images/bottle-canyon.png';
import bottleFireImage from './public/images/bottle-fire.png';
import bottleLakeImage from './public/images/bottle-lake.png';
import bottleMountainImage from './public/images/bottle-mountain.png';
import bottleSnowImage from './public/images/bottle-snow.png';
import bottleStreamImage from './public/images/bottle-stream.png';
import bottleWaterImage from './public/images/bottle-water.png';
import carImage from './public/images/car.jpg';
import smartTemperatureImage from './public/images/d18fe616-5596-4559-90f5-a90f5397d0d8.png';
import carbonFrameImage from './public/images/e26fa9c3-966d-4966-94a4-954a1e511c1c.png';
import heatingCampfireImage from './public/images/heating-campfire.png';
import heroMainImage from './public/images/hero-main.png';
import ledFlashlightBottleImage from './public/images/led-flashlight-bottle.png';
import productBackpackImage from './public/images/product-backpack.png';
import placeholderImage from './public/placeholder.svg';

const localAssets: Record<string, string> = {
  '/images/02cdc426-dff4-4dff-b131-1b134c3699b5.png': productForestImage,
  '/images/204cee22-9e85-49e8-9303-1d309af626b0.png': gpsTrackingImage,
  '/images/3d4046a0-b072-4b07-941f-9141ee3ed4a7.png': mountainPeaksImage,
  '/images/accessory-bike-mount.png': accessoryBikeMountImage,
  '/images/accessory-carabiner.png': accessoryCarabinerImage,
  '/images/accessory-charger.png': accessoryChargerImage,
  '/images/accessory-sleeve.png': accessorySleeveImage,
  '/images/accessory-speaker-base.png': accessorySpeakerBaseImage,
  '/images/accessory-strap.png': accessoryStrapImage,
  '/images/bottle-bike.png': bottleBikeImage,
  '/images/bottle-canyon.png': bottleCanyonImage,
  '/images/bottle-fire.png': bottleFireImage,
  '/images/bottle-lake.png': bottleLakeImage,
  '/images/bottle-mountain.png': bottleMountainImage,
  '/images/bottle-snow.png': bottleSnowImage,
  '/images/bottle-stream.png': bottleStreamImage,
  '/images/bottle-water.png': bottleWaterImage,
  '/images/car.jpg': carImage,
  '/images/d18fe616-5596-4559-90f5-a90f5397d0d8.png': smartTemperatureImage,
  '/images/e26fa9c3-966d-4966-94a4-954a1e511c1c.png': carbonFrameImage,
  '/images/heating-campfire.png': heatingCampfireImage,
  '/images/hero-main.png': heroMainImage,
  '/images/led-flashlight-bottle.png': ledFlashlightBottleImage,
  '/images/product-backpack.png': productBackpackImage,
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
