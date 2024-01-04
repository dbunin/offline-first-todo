import { Action } from "../database/todoItems";

type TodoItems = Record<string, { text: string }>;

export const reduceActions = (actions: Action[]) => {
  return actions.reduce((state: TodoItems, action: Action) => {
    switch (action.type) {
      case "create": {
        return { ...state, [action.id]: { text: action.text } };
      }
      case "update": {
        return { ...state, [action.id]: { text: action.text } };
      }
      case "delete": {
        const newState = state;
        delete newState[action.id];
        return newState;
      }
      default: {
        action satisfies never;
        console.log("unexpected action", action);
        return state;
      }
    }
  }, {});
};

// Returns only actions that are valid. Keeps only order per item id
// For now I only consider actions invalid if:
//  Any actions appear after deletion
//  Any actions appear before creation
//  If create action doesn't exist
export const validateActions = (actions: Action[]) => {
  // Object.groupBy?
  const actionsPerItem = actions.reduce<Record<string, Action[]>>(
    (acc, curr) => {
      const group = acc[curr.id] || [];
      group.push(curr);
      return { ...acc, [curr.id]: group };
    },
    {},
  );

  return Object.values(actionsPerItem).flatMap((actions) => {
    let newActions = actions;
    const createIndex = actions.findIndex(({ type }) => type === "create");
    if (createIndex === -1) {
      return [];
    }
    newActions = newActions.slice(createIndex, newActions.length);

    console.log("ACTIONS BEFORE DELETE", newActions);
    const deleteIndex = newActions.findIndex(({ type }) => type === "delete");
    console.log("HEY THERE", deleteIndex);
    if (deleteIndex === -1) {
      return newActions;
    }
    console.log({ deleteIndex, count: newActions.length });
    return newActions.slice(0, deleteIndex + 1);
  });
};
