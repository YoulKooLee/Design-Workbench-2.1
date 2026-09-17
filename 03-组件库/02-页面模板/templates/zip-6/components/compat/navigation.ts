import { pageFromHref } from "./link"

export function navigateToPrototypeHref(href: string) {
  const page = pageFromHref(href)
  if (page) {
    window.location.hash = `page=${page}`
    return
  }
  if (href.startsWith("#")) {
    window.location.hash = href.slice(1)
    return
  }
  window.location.href = href
}
