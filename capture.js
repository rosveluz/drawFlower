/* capture.js */

const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");

// Function to calculate the scale and position to maintain aspect ratio
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

    // Draw the current generated image in the center with correct aspect ratio
    const flowerCanvas = document.getElementById('myCanvas');
    const aspectFit = calculateAspectRatioFit(flowerCanvas.width, flowerCanvas.height, 400, 400);
    ctx.drawImage(flowerCanvas, (1080 - aspectFit.width) / 2, (1080 - aspectFit.height) / 2, aspectFit.width, aspectFit.height);

    // Save the result canvas as an image
    const finalImage = finalCanvas.toDataURL("image/png");

    // Set the captured image source to the modal and show the modal
    modalImage.src = finalImage;
    modal.style.display = "flex";
}

function setupCaptureTimer() {
    const timerDiv = document.getElementById('timer');
    const buttonText = document.getElementById('button-text');
    let counter = 5;  // 5 seconds

    // Temporarily clear the button text while the timer is running
    buttonText.textContent = '';

    const interval = setInterval(async () => { // make this async to allow await inside
        if (counter <= 0) {
            clearInterval(interval);
            buttonText.textContent = 'Capture Timer'; // Reset to original text
            timerDiv.textContent = ''; // Clear the timer display
            await captureCanvasAndBackground(); // this will display the modal
            return;
        }

        // Display the counter in the timerDiv, effectively replacing the buttonText
        timerDiv.textContent = `Capture in ${counter}...`;
        counter--;
    }, 1000);
}

// Close the modal if clicked outside the content
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
