import { Action, actions, setActions } from "../../database/todoItems";
import { validateActions } from "../../state/actionsReducer";

export async function addAction(action: Action) {
  const newActions = [...actions];
  newActions.push(action);
  console.log("new actions", newActions);
  setActions(validateActions(newActions));
  return { actions };
}

export async function getActions() {
  return { actions };
}
