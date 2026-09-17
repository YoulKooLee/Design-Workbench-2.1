import React from 'react';
import { resolveAssetSrc } from '../assets';

type PrototypeImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src?: string;
  fill?: boolean;
  priority?: boolean;
};

export function PrototypeImage({
  src,
  fill = false,
  priority = false,
  className,
  style,
  loading,
  ...props
}: PrototypeImageProps) {
  return (
    <img
      {...props}
      src={resolveAssetSrc(src)}
      className={className}
      loading={priority ? 'eager' : loading || 'lazy'}
      decoding="async"
      style={{
        ...(fill
          ? {
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            }
          : null),
        ...style,
      }}
    />
  );
}
