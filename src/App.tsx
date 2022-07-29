import React, { useEffect, useState } from "react";
import PropertyItem from "./components/PropertyItem";
import ActionItem from "./components/ActionItem";
import "./App.css";

function sendObjectToInspectedPage(message) {
    message.tabId = chrome.devtools.inspectedWindow.tabId;
    chrome.runtime.sendMessage(message);
}

function App() {
    const [changes, setСhanges] = useState({});
    const [actions, setActions] = useState([]);

    function createChannel() {
        const port = chrome.runtime.connect({
            name: "State Communication",
        });

        port.onMessage.addListener(function (message) {
            const updatedProperty = { [message.content.key]: message.content };
            setActions((actions) => ([
                ...actions,
                updatedProperty,
            ]));
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
                    {actions.map((action) => (
                        <ActionItem
                            key={action.key}
                            action={action}
                        />
                    ))}
                </div>
                <div className="viewer-content__content"></div>
            </div>
        </div>
    );
}

export default App;
