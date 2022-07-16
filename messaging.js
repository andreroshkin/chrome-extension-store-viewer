(function createChannel() {
    const port = chrome.extension.connect({
        name: "State Communication",
    });

    port.onMessage.addListener(function (message) {
        const viewerContent = document.querySelector(".viewer-content");
        const div = document.createElement("div");
        const node = document.createTextNode(JSON.stringify(message.content));
        div.appendChild(node);
        viewerContent.appendChild(div);
    });
})();

function sendObjectToInspectedPage(message) {
    message.tabId = chrome.devtools.inspectedWindow.tabId;
    chrome.extension.sendMessage(message);
}
