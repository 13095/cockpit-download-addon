// @flow

export function append(element: Element) {
  if (document.body) {
    document.body.appendChild(element)
  }
  return () => {
    if (document.body) {
      document.body.removeChild(element)
    }
  }
}
