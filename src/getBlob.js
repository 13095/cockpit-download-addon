// @flow
/* global unsafeWindow, GM_xmlhttpRequest */
import * as FileName from './fileName'

function fetch(url: string, responseType: string) {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      url,
      responseType,
      method: 'GET',
      headers: { referer: url },
      onload: (xhr) => resolve(xhr.response),
      onerror: reject
    })
  })
}

export function fromSingle(src: Source) {
  const image = src.images[0]

  return fetch(image.src, 'blob')
}

export async function fromMultiple(src: Source) {
  const zip = new unsafeWindow.JSZip()

  for (const image of src.images) {
    const ext = FileName.getExt(image.src)
    const name = `${image.alt}.${ext}`
    const blob = await fetch(image.src, 'blob')

    zip.file(name, blob)
  }
  return zip.generateAsync({type: 'blob'})
}
