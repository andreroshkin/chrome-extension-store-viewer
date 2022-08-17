import { useDispatch } from "react-redux";
import { set } from "./actionItemSlice";

function ActionItem(props) {
    const dispatch = useDispatch();
    function handleToggle() {
        dispatch(set(props.action))
    }

    return (
        <div className="action" onClick={handleToggle}>
            <div className="action__key">
                {props.action.key}
            </div>
            <div className="action__timestamp">
                {props.action.timestamp}
            </div>
        </div>
    );
}

export default ActionItem;
