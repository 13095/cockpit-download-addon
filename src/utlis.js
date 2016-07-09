/* global GM_xmlhttpRequest */
/* eslint-disable new-cap */

export function gmFetch(url, responseType = 'arraybuffer') {
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

export function createName(n, ext) {
  const str = String(n + 1)
  const pad = '000'
  const name = pad.substring(0, pad.length - str.length) + str
  return `${name}.${ext}`
}

export function download(name) {
  return (blob) => {
    const url = URL.createObjectURL(blob)
    const a = document.body.appendChild(document.createElement('a'))
    a.style = 'display: none'
    a.href = url
    a.download = name
    a.click()
    setTimeout(() => {
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }, 100)
  }
}
