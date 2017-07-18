// @flow

export function getExt(url: string): string {
  const index = url.lastIndexOf('.')

  return url.slice(index + 1)
}

export function getDownloadName(src: Source): string {
  let ext: string
  if (src.type === 'image') {
    ext = getExt(src.images[0].src)
  } else {
    ext = 'zip'
  }
  return `${src.author} - ${src.title}.${ext}`
}
