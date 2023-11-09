const modal = document.getElementById("imageModal");

function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return {
        width: srcWidth * ratio,
        height: srcHeight * ratio,
        offsetX: (maxWidth - srcWidth * ratio) / 2,
        offsetY: (maxHeight - srcHeight * ratio) / 2
    };
}

async function captureCanvasAndBackground() {
    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = 1080;
    finalCanvas.height = 1080;
    const ctx = finalCanvas.getContext('2d');

    // Draw the background color
    const backgroundColor = window.getComputedStyle(document.querySelector('.main-container')).backgroundColor;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, 1080, 1080);

    // Get the actual size of the drawing surface of 'myCanvas'
    const flowerCanvas = document.getElementById('myCanvas');
    const realWidth = flowerCanvas.width;
    const realHeight = flowerCanvas.height;

    // Calculate aspect ratio fit based on actual size of 'myCanvas'
    const aspectFit = calculateAspectRatioFit(realWidth, realHeight, finalCanvas.width, finalCanvas.height);
    ctx.drawImage(flowerCanvas, aspectFit.offsetX, aspectFit.offsetY, aspectFit.width, aspectFit.height);

    // Here, consider what you want to do with 'finalCanvas' after capture
    // For example, appending it to the document, saving it, etc.
}
