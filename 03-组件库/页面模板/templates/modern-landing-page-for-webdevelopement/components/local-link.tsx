import React from "react"

type LocalLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
}

export default function Link({ href, children, ...props }: LocalLinkProps) {
  const resolvedHref = href === "/" ? "#" : href

  return (
    <a href={resolvedHref} {...props}>
      {children}
    </a>
  )
}
