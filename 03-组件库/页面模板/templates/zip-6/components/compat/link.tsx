import React from "react"

const exactRouteMap: Record<string, string> = {
  "/": "dashboard-cms",
  "/dashboard-cms": "dashboard-cms",
  "/dashboard": "dashboard",
  "/dashboard-saas": "dashboard-saas",
  "/plugins": "plugins",
  "/plugins/super-cache/settings": "super-cache-settings",
  "/plugins/allsite-seo/settings": "allsite-seo-settings",
  "/settings": "settings",
  "/blank": "blank",
  "/auth/login": "login",
  "/auth/register": "register",
  "/auth/forgot": "forgot",
  "/auth/reset-password": "reset-password",
}

const prefixRouteMap: Array<[RegExp, string]> = [
  [/^\/dashboard-saas(?:\/|$)/, "dashboard-saas"],
  [/^\/dashboard(?:\/|$)/, "dashboard"],
  [/^\/analytics(?:\/|$)/, "dashboard-cms"],
  [/^\/organization(?:\/|$)/, "dashboard-cms"],
  [/^\/projects(?:\/|$)/, "dashboard-cms"],
  [/^\/products(?:\/|$)/, "dashboard"],
  [/^\/orders(?:\/|$)/, "dashboard"],
  [/^\/customers(?:\/|$)/, "dashboard"],
  [/^\/transactions(?:\/|$)/, "dashboard"],
  [/^\/invoices(?:\/|$)/, "dashboard"],
  [/^\/payments(?:\/|$)/, "dashboard"],
  [/^\/pages(?:\/|$)/, "dashboard-cms"],
  [/^\/media(?:\/|$)/, "dashboard-cms"],
  [/^\/seo(?:\/|$)/, "allsite-seo-settings"],
  [/^\/members(?:\/|$)/, "settings"],
  [/^\/chat(?:\/|$)/, "blank"],
  [/^\/meetings(?:\/|$)/, "blank"],
  [/^\/plugins(?:\/|$)/, "plugins"],
  [/^\/api(?:\/|$)/, "plugins"],
  [/^\/integrations(?:\/|$)/, "plugins"],
  [/^\/backup(?:\/|$)/, "blank"],
  [/^\/help(?:\/|$)/, "blank"],
  [/^\/terms(?:\/|$)/, "blank"],
  [/^\/privacy(?:\/|$)/, "blank"],
  [/^\/support(?:\/|$)/, "blank"],
]

function normalizeInternalHref(href: string) {
  if (!href.startsWith("/")) {
    return null
  }
  return href.split(/[?#]/, 1)[0] || "/"
}

export function pageFromHref(href: string) {
  if (href.startsWith("#page=")) {
    return href.slice("#page=".length)
  }

  const path = normalizeInternalHref(href)
  if (!path) {
    return undefined
  }

  if (exactRouteMap[path]) {
    return exactRouteMap[path]
  }

  return prefixRouteMap.find(([pattern]) => pattern.test(path))?.[1] ?? "blank"
}

export function prototypeHref(href: string) {
  const page = pageFromHref(href)
  return page ? `#page=${page}` : href
}

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
}

export default function Link({ href, onClick, target, ...props }: LinkProps) {
  const nextHref = prototypeHref(href)

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (
      event.defaultPrevented ||
      target === "_blank" ||
      !nextHref.startsWith("#page=")
    ) {
      return
    }
    event.preventDefault()
    window.location.hash = nextHref.slice(1)
  }

  return <a href={nextHref} target={target} onClick={handleClick} {...props} />
}
