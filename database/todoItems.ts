import { v4 as uuidv4 } from "uuid";

type Action =
  | { type: "update" | "create"; text: string; id: string }
  | { type: "delete"; id: string };

let actions: Action[] = [];

export const setActions = (newActions: Action[]) => {
  actions = newActions;
};
init();

// Initial data
function init() {
  actions.push({ type: "create", text: "Buy milk", id: uuidv4() });
  actions.push({ type: "create", text: "Buy strawberries", id: uuidv4() });
}

export { actions };
export type { Action };
