import React, { useEffect, useState } from "react";
import ActionItem from "./components/actionItem/ActionItem";
import "./App.css";
import ActionTree from "./components/actionTree/ActionTree";

function sendObjectToInspectedPage(message) {
    message.tabId = chrome.devtools.inspectedWindow.tabId;
    chrome.runtime.sendMessage(message);
}

function App() {
    const [actions, setActions] = useState([]);

    function createChannel() {
        const port = chrome.runtime.connect({
            name: "State Communication",
        });

        port.onMessage.addListener(function (message) {
            const updatedProperty = { 
                key: [message.content.key],
                value: message.content.stateByKey 
            };
            setActions((actions) => ([
                ...actions,
                updatedProperty,
            ]));
        });
    }

    function resetChanges() {
        setActions([]);
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
                    {actions.map((action) => (
                        <ActionItem
                            key={action.key}
                            action={action}
                        />
                    ))}
                </div>
                <div className="viewer-content__content">
                    <ActionTree/>
                </div>
            </div>
        </div>
    );
}

export default App;
