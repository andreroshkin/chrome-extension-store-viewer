function sendObjectToDevTools(message) {
    chrome.extension.sendMessage(message, function (message) {});
}

function inserted() {
    document.addEventListener("stateChange", function (event) {
        sendObjectToDevTools({
            content: {
                key: event?.detail?.key,
                state: event?.detail?.state,
            },
        });
    });
}
inserted();
