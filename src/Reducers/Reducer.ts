import { ActionTypes, UnionedAction } from "../actions/ActionCreator";

export type MultipleUserData = {
  name: string;
  image: string;
  clappingPoint: number;
  receivingPoint: number;
  disabled?: boolean;
};

export type ClappingUserData = {
  name: string;
  clickNum: number;
};

export type PostList = {
  currentUserName: string;
  currentUserImage: string;
  introduceUserName: string;
  introduceUserImage: string;
  comment: string;
  date: string;
  clappingUserList: [];
};

export type InitalState = {
  multipleUserData: MultipleUserData[];
  postList: PostList[];
};

export const initialState: InitalState = {
  multipleUserData: [
    {
      name: "お父さん",
      image: "/images/img1.png",
      clappingPoint: 100,
      receivingPoint: 0,
    },
    {
      name: "お母さん",
      image: "/images/img2.png",
      clappingPoint: 100,
      receivingPoint: 0,
    },
    {
      name: "お兄さん",
      image: "/images/img3.png",
      clappingPoint: 100,
      receivingPoint: 0,
    },
    {
      name: "お姉さん",
      image: "/images/img4.png",
      clappingPoint: 100,
      receivingPoint: 0,
    },
    {
      name: "ペット",
      image: "/images/img5.png",
      clappingPoint: 100,
      receivingPoint: 0,
    },
  ],
  postList: [],
};

export const reducer: React.Reducer<InitalState, UnionedAction> = (
  state: InitalState,
  action: UnionedAction
) => {
  switch (action.type) {
    case ActionTypes.POST_DATA:
      return {
        ...state,
        postList: action.payload,
      };
    case ActionTypes.CLAPPING_DATA:
      return {
        multipleUserData: action.payload.multipleUserData,
        postList: action.payload.postList,
      };
    default:
      throw new Error();
  }
};
