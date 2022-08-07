function sendObjectToDevTools(message) {
    chrome.extension.sendMessage(message, function (message) {});
}

function inserted() {
    document.addEventListener("stateChange", function (event) {
        const message = {
            content: {
                key: event?.detail?.key,
                stateByKey: event?.detail.stateByKey,
            },
        }
        sendObjectToDevTools(message);
    });
}
inserted();
