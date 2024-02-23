const video = document.getElementById("camera");
video.setAttribute("autoplay", "");
video.style.width = "400px";
video.style.height = "300px";

const imageTag = document.getElementById("image");

const captureButoon = document.getElementById("capture-image");
captureButoon.addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  //Scaling canvas
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  //Drawing the video at that frame
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  //Converting to a usable data URL
  const dataURL = canvas.toDataURL();
  console.log(dataURL);
  window.electronAPI.sendImage(dataURL);
  new Notification("Image captured", {
    body: "Image is successfully captured from the live video.",
  });
});

navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
  console.log(stream);
  video.srcObject = stream;
});
