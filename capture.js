async function captureCanvasAndBackground() {
    const video = document.querySelector('video');
    const flowerCanvas = document.getElementById('myCanvas');
    const outputCanvas = document.createElement('canvas');
    const ctx = outputCanvas.getContext('2d');

    const { width, height } = video.getBoundingClientRect();
    outputCanvas.width = width;
    outputCanvas.height = height;

    // Drawing video frame to the canvas
    ctx.drawImage(video, 0, 0, width, height);

    // Scaling and drawing flower canvas
    const ratio = Math.min(width / flowerCanvas.width, height / flowerCanvas.height);
    const x = (width - flowerCanvas.width * ratio) / 2;
    const y = (height - flowerCanvas.height * ratio) / 2;
    ctx.drawImage(flowerCanvas, x, y, flowerCanvas.width * ratio, flowerCanvas.height * ratio);

    // Return the combined canvas data
    return outputCanvas.toDataURL('image/png');
}