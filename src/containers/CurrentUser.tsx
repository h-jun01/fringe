import React, { useContext, useState, useEffect } from "react";
import { Context } from "../App";
import { MultipleUserData } from "../reducers/Reducer";
import CurrentUser, { CurrentUserData } from "../components/CurrentUser";

const ContainerCurrentUser: React.FC = () => {
  //Context
  const [state, dispatch, selectionUser, setSelectionUser] = useContext(
    Context
  );
  //現在ユーザの配列番号
  const currentUser: number = state.multipleUserData.findIndex(
    ({ name }) => name === selectionUser.currentValue
  );

  //初期データ
  const [currentUserData, setCurrentUserData] = useState<CurrentUserData>({
    image: state.multipleUserData[currentUser].image,
    clappingPoint: state.multipleUserData[currentUser].clappingPoint,
    receivingPoint: state.multipleUserData[currentUser].receivingPoint,
  });

  //選択されたユーザに変更
  useEffect(() => {
    setCurrentUserData({
      image: state.multipleUserData[currentUser].image,
      clappingPoint: state.multipleUserData[currentUser].clappingPoint,
      receivingPoint: state.multipleUserData[currentUser].receivingPoint,
    });
  }, [state.multipleUserData, currentUser]);

  //紹介する側の初期ユーザーを紹介される側で選択不可
  if (selectionUser.currentValue === "お父さん") {
    selectionUser.introduce[0].disabled = true;
  }

  //現在のユーザを変更
  const userChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const optionValue = e.target.value;
    //ユーザの情報を変更
    const dataChange = () => {
      //選択中のユーザは紹介できないようにする
      const newArray: MultipleUserData[] = selectionUser.introduce.slice();
      newArray.map((item: MultipleUserData) => {
        switch (item.name) {
          case optionValue:
            return (item.disabled = true);
          default:
            return (item.disabled = false);
        }
      });
      //紹介される側の配列の更新
      setSelectionUser((prevState: MultipleUserData) => ({
        ...prevState,
        introduce: newArray,
      }));
    };

    switch (optionValue) {
      case "お父さん":
        dataChange();
        break;
      case "お母さん":
        dataChange();
        break;
      case "お兄さん":
        dataChange();
        break;
      case "お姉さん":
        dataChange();
        break;
      case "ペット":
        dataChange();
        break;
      default:
        throw new Error();
    }

    //変更後のユーザ;
    setSelectionUser((prevState: MultipleUserData) => ({
      ...prevState,
      currentValue: optionValue,
    }));
  };

  return (
    <React.Fragment>
      <CurrentUser
        selectionUser={selectionUser.current}
        currentUserData={currentUserData}
        userChange={userChange}
        optionValue={selectionUser.currentValue}
      />
    </React.Fragment>
  );
};

export default ContainerCurrentUser;
