import download from './download'

const key = Math.random().toString(36).substr(2, 8)

self.postMessage({
  type: 'register',
  payload: { download: key }
}, location.origin)

self.addEventListener('message', (event) => {
  if (event.origin !== location.origin) { return }
  const { data = {} } = event
  if (data.id === key) {
    download(data.payload)
  }
})
