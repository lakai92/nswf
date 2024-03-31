// worker.js

// Import TensorFlow.js and NSFWJS
importScripts('https://unpkg.com/@tensorflow/tfjs@2.6.0');
importScripts('https://unpkg.com/nsfwjs@2.3.0');

// Initialize NSFWJS
nsfwjs.load("MobileNetV2Mid", { quantBytes: 2 }).then((model) => {
  // Listen for messages from the main thread
  self.onmessage = async function(event) {
    const { imageData } = event.data;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageData;

    img.onload = async function () {
      // Classify the image
      const predictions = await model.classify(img);
      
      // Send the predictions back to the main thread
      self.postMessage(predictions);
    };
  };
});
