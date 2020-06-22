import React, {
  useReducer,
  useState,
  createContext,
  Reducer,
  Fragment,
} from "react";
import {
  initialState,
  MultipleUserData,
  PostList,
  reducer,
  InitalState,
} from "./Reducers/Reducer";
import { UnionedAction } from "./actions/ActionCreator";
import CurrentUser from "./containers/CurrentUser";
import IntroduceUser from "./containers/IntroduceUser";
import TimeLine from "./containers/TimeLine";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

export const Context: any = createContext([]);

//永続化
const useLocalStorageReducer = (
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

const App: React.FC = () => {
  //localStorage無ければ作る
  if (localStorage.getItem("initialState") === null) {
    localStorage.setItem("initialState", JSON.stringify(initialState));
  }

  //型がうまくいかない（ ;  ; ）
  const [state, dispatch]: any = useLocalStorageReducer(
    reducer,
    initialState,
    "initialState"
  );

  //参照渡し回避
  const copyCurrent: MultipleUserData[] = JSON.parse(
    JSON.stringify(state.multipleUserData)
  );
  const copyIntroduce: MultipleUserData[] = JSON.parse(
    JSON.stringify(state.multipleUserData)
  );

  //紹介する側とされる側のoptionの状態を分割
  const [selectionUser, setSelectionUser] = useState({
    current: copyCurrent,
    currentValue: "お父さん",
    introduce: copyIntroduce,
    introduceValue: "default",
  });

  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Context.Provider
          value={[state, dispatch, selectionUser, setSelectionUser]}
        >
          <CurrentUser />
          <IntroduceUser />
          {state.postList.map((item: PostList, index: number) => (
            <TimeLine
              currentUserImage={item.currentUserImage}
              currentUserName={item.currentUserName}
              introduceUserImage={item.introduceUserImage}
              introduceUserName={item.introduceUserName}
              comment={item.comment}
              date={item.date}
              currentValue={selectionUser.currentValue}
              index={index}
              key={index}
            />
          ))}
        </Context.Provider>
      </Container>
    </Fragment>
  );
};

export default App;
