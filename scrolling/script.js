const video = document.getElementById('video')
var iframe = document.getElementById('iframe')
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

//video.addEventListener('play', () => {
  //const canvas = faceapi.createCanvasFromMedia(video);
  //document.body.append(canvas)
  // const displaySize = { width: video.width, height: video.height }
  // faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    //const resizedDetections = faceapi.resizeResults(detections, displaySize)
    //canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    //faceapi.draw.drawDetections(canvas, resizedDetections)
    //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    //faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    //const detectionWithExpressions = await faceapi.detectSingleFace(video).withFaceLandmarks().withFaceExpressions()    
    //console.log(detections[0].expressions.surprised)
    const landmarks1 = await faceapi.detectFaceLandmarks(video)
    const mouth = landmarks1.getMouth()
    const leftEye = landmarks1.getLeftEye()
    const rightEye = landmarks1.getRightEye()
    console.log(video.offsetHeight)
   
    try {
      if(detections[0].expressions.surprised>0.1){
        console.log("놀라!")
        window.scrollBy(0, 70);
  
      }
      if(detections[0].expressions.happy>0.1){
        console.log("웃엇!")
        window.scrollBy(0, -70);
      }
    } catch (error) {
      
    }
  

  }, 100)
  getFaceInfo()=async()=>{
    const landmarks1 = await faceapi.detectFaceLandmarks(video)
    const mouth = landmarks1.getMouth()
    const leftEye = landmarks1.getLeftEye()
    const rightEye = landmarks1.getRightEye()
    console.log(mouth)
    console.log(leftEye)
    console.log(rightEye)
  }
    

//})