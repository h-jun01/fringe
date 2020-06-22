// import { ActionTypes } from "./index";
import { MultipleUserData, InitalState, PostList } from "../Reducers/Reducer";
import { format } from "date-fns";
import ja from "date-fns/locale/ja";

export enum ActionTypes {
  POST_DATA = "POST_DATA",
  CLAPPING_DATA = "CLAPPING_DATA",
  POINT_MOVE = "POINT_MOVE",
}

export type UnionedAction =
  | ReturnType<typeof post>
  | ReturnType<typeof clapping>;

//投稿
export const post = (
  storageData: InitalState,
  currentUser: string,
  introduceUser: string,
  textValue: string,
  clappingUserList: []
) => {
  //名前から画像を持ってくる為に配列番号を取得
  const currentImage: number = storageData.multipleUserData.findIndex(
    ({ name }) => name === currentUser
  );
  const introduceImage: number = storageData.multipleUserData.findIndex(
    ({ name }) => name === introduceUser
  );

  //投稿内容に必要な情報
  const postData: PostList = {
    currentUserName: currentUser,
    currentUserImage: storageData.multipleUserData[currentImage].image,
    introduceUserName: introduceUser,
    introduceUserImage: storageData.multipleUserData[introduceImage].image,
    comment: textValue,
    date: format(new Date(), "Pp", { locale: ja }),
    clappingUserList: clappingUserList,
  };

  const initState = JSON.parse(localStorage.getItem("initialState") as string);
  initState.postList.unshift(postData);

  return {
    type: ActionTypes.POST_DATA,
    payload: initState.postList,
  } as const;
};

//拍手
export const clapping = (
  postList: PostList[],
  multipleUserData: MultipleUserData[],
  clappingUser: number,
  currentUser: number,
  introduceUser: number
) => {
  const newMultipleUserData = multipleUserData.slice();
  newMultipleUserData[clappingUser].clappingPoint -= 2;
  newMultipleUserData[currentUser].receivingPoint += 1;
  newMultipleUserData[introduceUser].receivingPoint += 1;

  return {
    type: ActionTypes.CLAPPING_DATA,
    payload: {
      postList: postList,
      multipleUserData: newMultipleUserData,
    },
  } as const;
};
