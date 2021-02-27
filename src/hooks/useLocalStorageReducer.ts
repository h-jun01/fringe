import { useReducer, Reducer } from "react";
import { InitalState } from "../reducers/Reducer";
import { UnionedAction } from "../actions/ActionCreator";

//永続化
export const useLocalStorageReducer = (
  reducer: Reducer<InitalState, UnionedAction>,
  defaultState: InitalState,
  storageKey: string
) => {
  const persisted: InitalState = JSON.parse(
    localStorage.getItem(storageKey) as string
  );
  defaultState = persisted;
  const [state, dispatch] = useReducer(reducer, defaultState);
  localStorage.setItem(storageKey, JSON.stringify(state));

  return [state, dispatch];
};
