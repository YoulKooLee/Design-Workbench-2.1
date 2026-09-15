import React from "react"

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
}

export default function Image({ priority: _priority, ...props }: ImageProps) {
  return <img {...props} />
}
