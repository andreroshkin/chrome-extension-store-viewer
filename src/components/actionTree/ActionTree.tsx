import type { RootState } from '../../store/store'
import { useSelector } from 'react-redux'

function ActionTree(props) {
    const currentAction = useSelector((state: RootState) => state.actionItem.value)
    return (
        <div className="action-tree">
            <div className="action-tree__value">
                <pre>
                    {JSON.stringify(
                        currentAction,
                        null,
                        2
                    )}
                </pre>
            </div>
        </div>
    );
}

export default ActionTree;