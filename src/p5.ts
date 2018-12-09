createMedia(this, 'video', src, callback)

function createMedia(
  pInst: any,
  type = 'video',
  src: any,
  callback = () => {
    console.log('done')
  }
) {
  var elt: any = document.createElement(type)

  // allow src to be empty
  src = src || ''
  if (typeof src === 'string') {
    src = [src]
  }
  for (var i = 0; i < src.length; i++) {
    var source = document.createElement('source')
    source.src = src[i]
    elt.appendChild(source)
  }
  if (typeof callback !== 'undefined') {
    var callbackHandler = function() {
      callback()
      elt.removeEventListener('canplaythrough', callbackHandler)
    }
    elt.addEventListener('canplaythrough', callbackHandler)
  }

  var c = addElement(elt, pInst, true)
  c.loadedmetadata = false
  // set width and height onload metadata
  elt.addEventListener('loadedmetadata', function() {
    c.width = elt.videoWidth
    c.height = elt.videoHeight
    //c.elt.playbackRate = s;
    // set elt width and height if not set
    if (c.elt.width === 0) c.elt.width = elt.videoWidth
    if (c.elt.height === 0) c.elt.height = elt.videoHeight
    if (c.presetPlaybackRate) {
      c.elt.playbackRate = c.presetPlaybackRate
      delete c.presetPlaybackRate
    }
    c.loadedmetadata = true
  })

  return c
}

function addElement(elt: any, pInst: any, media: any) {
  var node = pInst._userNode ? pInst._userNode : document.body
  node.appendChild(elt)
  var c = media ? new p5.MediafElement(elt, pInst) : new p5.Element(elt, pInst)
  pInst._elements.push(c)
  return c
}
