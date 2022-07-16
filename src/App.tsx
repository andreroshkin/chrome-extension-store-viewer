import React, { useEffect, useState } from "react";
import "./App.css";

function sendObjectToInspectedPage(message) {
    message.tabId = chrome.devtools.inspectedWindow.tabId;
    chrome.runtime.sendMessage(message);
}

function PropertyItem(props) {
    const [isShow, setIsShow] = useState(false);

    function handleToggle() {
        setIsShow(!isShow);
    }

    return (
        <div className="property">
            <div className="property__key" onClick={handleToggle}>
                {props.changes[props.changeKey].key}
            </div>
            {isShow ? (
                <div className="property__state">
                    <pre>
                        {JSON.stringify(
                            props.changes[props.changeKey].state,
                            null,
                            2
                        )}
                    </pre>
                </div>
            ) : null}
        </div>
    );
}

function App() {
    const [changes, setСhanges] = useState({});

    function createChannel() {
        const port = chrome.runtime.connect({
            name: "State Communication",
        });

        port.onMessage.addListener(function (message) {
            const updatedProperty = { [message.content.key]: message.content };
            setСhanges((changes) => ({
                ...changes,
                ...updatedProperty,
            }));
        });
    }

    function resetChanges() {
        setСhanges({});
    }

    useEffect(() => {
        createChannel();
        sendObjectToInspectedPage({
            action: "script",
            content: "init.js",
        });
    }, []);

    return (
        <div className="viewer">
            <div className="viewer-controls">
                <button
                    className="viewer-controls__reset"
                    onClick={resetChanges}
                >
                    Reset
                </button>
            </div>

            <div className="viewer-content">
                <div className="viewer-content__sidebar">
                    {Object.keys(changes).map((changeKey) => (
                        <PropertyItem
                            key={changes[changeKey].key}
                            changeKey={changeKey}
                            changes={changes}
                        />
                    ))}
                </div>
                <div className="viewer-content__content"></div>
            </div>
        </div>
    );
}

export default App;
