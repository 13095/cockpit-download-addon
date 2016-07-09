import JSZip from 'jszip'
import { gmFetch, download, createName } from './utlis'

function createFileName(illust) {
  let ext = illust.illustExt
  if (illust.ugoira || illust.isMultiple) {
    ext = 'zip'
  }
  return `${illust.userName} - ${illust.illustTitle}.${ext}`
}

function downloadComic(name, illust) {
  const ext = illust.illustExt
  const { images } = illust
  const zip = new JSZip()
  const createFetch = (url) => () => gmFetch(url)
  const add = (fileName) => (buffer) => zip.file(fileName, buffer)
  const generateZip = () => zip.generateAsync({ type: 'blob' })

  images.reduce((p, image, index) => (
    p.then(createFetch(image.src)).then(add(createName(index, ext)))
  ), Promise.resolve())
    .then(generateZip)
    .then(download(name))
}

function downloadSingle(name, illust) {
  const image = illust.images[0]
  return gmFetch(image.src, 'blob').then(download(name))
}

function downloadUgoira(name, illust) {
  const image = illust.ugoira
  return gmFetch(image.src, 'blob').then(download(name))
}

export default function save(illust) {
  const name = createFileName(illust)

  if (illust.ugoira) {
    return downloadUgoira(name, illust)
  }
  if (illust.isMultiple) {
    return downloadComic(name, illust)
  }
  return downloadSingle(name, illust)
}
