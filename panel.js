document.querySelector("#init").addEventListener(
    "click",
    function () {
        console.log('test');
        sendObjectToInspectedPage({
            action: "script",
            content: "init.js",
        });
    },
    false
);
