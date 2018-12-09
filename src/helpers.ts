export function arrayMove(
  arr: any[],
  oldIndex: number,
  newIndex: number
): any[] {
  if (newIndex >= arr.length) {
    let k = newIndex - arr.length + 1
    while (k--) {
      arr.push(undefined)
    }
  }
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])
  return arr
}

const readUploadedFileAsDataurl = (inputFile: File): Promise<any> => {
  const temporaryFileReader = new FileReader()

  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort()
      reject(new DOMException('Problem parsing input file.'))
    }

    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result)
    }
    temporaryFileReader.readAsDataURL(inputFile)
  })
}

export async function extractFramesFromVideo(file: File, fps = 25) {
  return new Promise(async resolve => {
    let videoObjectUrl = URL.createObjectURL(file)
    let video = document.createElement('video')
    video.preload = 'metadata'
    let width
    let height
    let duration: any

    video.onloadedmetadata = function() {
      window.URL.revokeObjectURL(video.src)
      duration = video.duration
      console.log('metadataloaded', duration)
      finish()
      // myVideos[myVideos.length - 1].duration = duration
    }
    video.src = videoObjectUrl

    async function finish() {
      let seekResolve: any

      video.addEventListener('seeked', async function() {
        if (seekResolve) seekResolve()
      })

      while (video.duration === Infinity && video.readyState < 2) {
        await new Promise(r => setTimeout(r, 1000))
        video.currentTime = 10000000 * Math.random()
      }
      // let duration = video.duration

      let canvas = document.createElement('canvas')
      let context = canvas.getContext('2d')
      let [w, h] = [video.videoWidth, video.videoHeight]
      canvas.width = w
      canvas.height = h

      let frames = []
      let interval = 1 / fps
      let currentTime = 0

      while (currentTime < duration && context) {
        console.log('going', currentTime)
        video.currentTime = currentTime
        console.log('1')
        await new Promise(r => (seekResolve = r))
        console.log('2')
        context.drawImage(video, 0, 0, w, h)
        console.log('3')
        let base64ImageData = canvas.toDataURL()
        console.log('4')
        frames.push(base64ImageData)
        console.log('5')
        currentTime += interval
      }
      debugger
      resolve(frames)
    }
  })
}
