// Обработчик сообщений от основного потока
onmessage = async function(event) {
  const images = event.data.images;
  const predictions = [];

  // Загружаем модель
  tf.setBackend("webgl"); // Используем WebGL для ускорения вычислений
  const model = await nsfwjs.load("MobileNetV2Mid"); // Загружаем модель

  // Производим классификацию всех изображений
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const prediction = await model.classify(image);
    predictions.push(prediction);
  }

  // Отправляем предсказания обратно в основной поток
  postMessage(predictions);
};
