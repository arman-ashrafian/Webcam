// globals
let streaming = false,
    width = 0
    height = 0

// DOM Elements 
const video = document.getElementById('video')
const photoButton = document.getElementById('photoButton')
const canvas = document.getElementById('canvas')

// Get media stream
navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then((stream) => {
        // link to the video source
        video.srcObject = stream
        // play video
        video.play()
    })
    .catch((err) => {
        console.log(`Error: ${err}`);
    })

// Play when ready
video.addEventListener('canplay', (e) => {
    if(!streaming) {
        width = window.innerWidth / 1.25
        height = width * .75

        video.setAttribute('width', width)
        video.setAttribute('height', height)
        canvas.setAttribute('width', width)
        canvas.setAttribute('height', height)

        streaming = true
    }
}, false)

photoButton.addEventListener('click', takePicture)

function takePicture() {
    // create canvas
    const context = canvas.getContext('2d')
    if (width != 0 && height != 0) {
        context.drawImage(video, 0, 0, width, height)

        const imgData = canvas.toDataURL('image/png')
        
        // create image element
        const img = document.createElement('img');

        img.setAttribute('src', imgData)
    }
}
