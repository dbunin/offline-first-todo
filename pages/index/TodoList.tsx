import { useMemo, useState } from "react";
import { reduceActions } from "../../state/actionsReducer";
import { v4 as uuidv4 } from "uuid";
import { useActions } from "./actions";

export const TodoList = () => {
  const { actions, updateActions } = useActions();
  const todoItems = useMemo(() => {
    return reduceActions(actions);
  }, [actions]);
  const [draft, setDraft] = useState("");
  return (
    <>
      <ul>
        {Object.keys(todoItems).map((todoItemKey) => (
          <li className="flex w-full justify-between" key={todoItemKey}>
            {todoItems[todoItemKey].text}{" "}
            <button
              type="button"
              onClick={async (ev) => {
                ev.preventDefault();
                updateActions.mutate({
                  type: "delete",
                  id: todoItemKey,
                });
              }}
            >
              Delete
            </button>
          </li>
        ))}
        <li>
          <form
            onSubmit={async (ev) => {
              ev.preventDefault();
              updateActions.mutate({
                type: "create",
                text: draft,
                id: uuidv4(),
              });
              setDraft("");
            }}
          >
            <input
              className="border mr-4"
              type="text"
              onChange={(ev) => setDraft(ev.target.value)}
              value={draft}
            />
            <button type="submit">Add to-do</button>
          </form>
        </li>
      </ul>
    </>
  );
};
