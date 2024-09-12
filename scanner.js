window.onload = function () {
    const video = document.getElementById('video');
    const resultElement = document.getElementById('result');
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');

    let codeReader;

    function startCamera() {
        if (codeReader) {
            console.log('Camera is already running');
            return;
        }

        // resultElement.textContent = 'Camera started';

        codeReader = new ZXing.BrowserMultiFormatReader();
        codeReader.getVideoInputDevices()
            .then((videoInputDevices) => {
                if (videoInputDevices.length > 0) {
                    const deviceId = videoInputDevices[0].deviceId;

                    // Start decoding from the video device
                    codeReader.decodeFromVideoDevice(deviceId, 'video', (result, error) => {
                        if (result) {
                            resultElement.textContent = result.text;
                        }
                        if (error) {
                            console.error(error);
                        }
                    })
                        .catch((err) => {
                            console.error(err);
                        });

                    // Show stop button and hide start button
                    stopButton.style.display = 'block';
                    startButton.style.display = 'none';
                } else {
                    console.log('No camera found');
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    function stopCamera() {
        if (!codeReader) {
            console.log('No camera is running');
            return;
        }

        // Stop the camera and clear resources
        codeReader.reset();
        codeReader = null;
        // resultElement.textContent = 'Camera stopped';

        // Show start button and hide stop button
        stopButton.style.display = 'none';
        startButton.style.display = 'block';
    }

    // Event listeners for buttons
    startButton.addEventListener('click', startCamera);
    stopButton.addEventListener('click', stopCamera);

    // Automatically start camera on page load
    startCamera();
};
