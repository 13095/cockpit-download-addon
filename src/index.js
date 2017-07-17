// @flow
import * as FileName from './fileName'
import * as GetBlob from './getBlob'
import * as DOM from './dom'

const script = document.createElement('script')

script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.js'
DOM.append(script)

const action = 'cockpit-download-addon'

window.addEventListener('message', (event) => {
  if (event.origin !== window.location.origin) { return }

  const {data} = event

  if (data.action === action) {
    const illust: Illust = data

    download(illust.src)
  }
})

async function download(src: Source) {
  let blob: Blob

  if (src.type === 'comic') {
    blob = await GetBlob.fromMultiple(src)
  } else {
    blob = await GetBlob.fromSingle(src)
  }

  const element = document.createElement('a')

  element.style.cssText = 'display: none'
  element.href = URL.createObjectURL(blob)
  element.download = FileName.getDownloadName(src)

  const remove = DOM.append(element)

  element.click()
  setTimeout(() => {
    remove()
    window.URL.revokeObjectURL(element.href)
  }, 100)
}
