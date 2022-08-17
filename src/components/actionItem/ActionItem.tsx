import { useDispatch } from "react-redux";
import { set } from "./actionItemSlice";

function ActionItem(props) {
    const dispatch = useDispatch();
    function handleToggle() {
        dispatch(set(props.action))
    }

    return (
        <div className="action">
            <div className="action__key" onClick={handleToggle}>
                {props.action.key}
            </div>
        </div>
    );
}

export default ActionItem;
