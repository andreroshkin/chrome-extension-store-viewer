import { useState } from "react";

function ActionItem(props) {
    const [isShow, setIsShow] = useState(false);

    function handleToggle() {
        setIsShow(!isShow);
    }

    return (
        <div className="action">
            <div className="action__key" onClick={handleToggle}>
                {props.action.key}
            </div>
            {isShow ? (
                <div className="action__state">
                    <pre>
                        {JSON.stringify(
                            props.action.state,
                            null,
                            2
                        )}
                    </pre>
                </div>
            ) : null}
        </div>
    );
}

export default ActionItem;