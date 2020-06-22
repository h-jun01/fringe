import React, { useContext, useState, useEffect, Fragment } from "react";
import { Context } from "../App";
import { ClappingUserData } from "../Reducers/Reducer";
import { clapping } from "../actions/ActionCreator";
import TimeLine from "../components/TimeLine";

interface TimeLineProps {
  currentUserImage: string;
  currentUserName: string;
  introduceUserImage: string;
  introduceUserName: string;
  comment: string;
  date: string;
  currentValue: string;
  index: number;
}

const ContainerTimeLine: React.FC<TimeLineProps> = ({ ...props }) => {
  //Context
  const [state, dispatch, selectionUser] = useContext(Context);
  //拍手切り替え
  const [disabled, setDisabled] = useState<boolean>(false);
  //ユーザーのクリック回数
  const [userClickNum, setUserClickNum] = useState<number>(0);
  //総拍手数
  const [totalClappingNum, setTotalClappingNum] = useState<number>(0);

  const newPostList = state.postList.slice();
  //clappingUserListから自分の配列番号取得
  const check: number = state.postList[props.index].clappingUserList.findIndex(
    ({ name }) => name === selectionUser.currentValue
  );
  // 拍手したユーザ
  const clappingUser: number = state.multipleUserData.findIndex(
    ({ name }) => name === selectionUser.currentValue
  );
  //紹介したユーザ
  const currentUser: number = state.multipleUserData.findIndex(
    ({ name }) => name === newPostList[props.index].currentUserName
  );
  //紹介さてたユーザ
  const introduceUser: number = state.multipleUserData.findIndex(
    ({ name }) => name === newPostList[props.index].introduceUserName
  );

  let clappingUserData: ClappingUserData;

  //拍手できる条件
  useEffect(() => {
    //紹介する人とされる人は拍手できないようにする
    if (
      props.currentValue === props.currentUserName ||
      props.currentValue === props.introduceUserName
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    //15回押した人は拍手できないようにする
    if (check !== -1) {
      setUserClickNum(
        newPostList[props.index].clappingUserList[check].clickNum
      );
      if (userClickNum >= 15) {
        setDisabled(true);
      }
    }
    //拍手できるポイントが0になったらできないようにする
    if (state.multipleUserData[clappingUser].clappingPoint === 0) {
      setDisabled(true);
    }
  }, [
    props.currentUserName,
    props.introduceUserName,
    props.currentValue,
    userClickNum,
    clappingUser,
    state.multipleUserData,
    check,
    newPostList,
    props.index,
  ]);

  //総拍手数を計算
  useEffect(() => {
    const result = newPostList[props.index].clappingUserList.reduce(
      (total: number, array: ClappingUserData) => total + array.clickNum,
      0
    );
    setTotalClappingNum(result);
  }, [newPostList, props.index, totalClappingNum]);

  //拍手をクリック
  const clappingClick = (): void => {
    if (check === -1) {
      clappingUserData = {
        name: selectionUser.currentValue,
        clickNum: 1,
      };
      newPostList[props.index].clappingUserList.push(clappingUserData);
    } else {
      clappingUserData = {
        ...clappingUserData,
        clickNum: newPostList[props.index].clappingUserList[
          check
        ].clickNum += 1,
      };
      setUserClickNum(
        newPostList[props.index].clappingUserList[check].clickNum
      );
    }

    dispatch(
      clapping(
        newPostList,
        state.multipleUserData,
        clappingUser,
        currentUser,
        introduceUser
      )
    );
  };

  return (
    <Fragment>
      <TimeLine
        currentUserImage={props.currentUserImage}
        introduceUserImage={props.introduceUserImage}
        comment={props.comment}
        date={props.date}
        disabled={disabled}
        totalClappingNum={totalClappingNum}
        clappingUserList={newPostList[props.index].clappingUserList}
        clappingClick={clappingClick}
      />
    </Fragment>
  );
};

export default ContainerTimeLine;
