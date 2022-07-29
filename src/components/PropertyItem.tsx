import { useState } from "react";

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

export default PropertyItem;