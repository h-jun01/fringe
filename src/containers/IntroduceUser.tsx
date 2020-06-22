import React, { useContext, useState, useEffect, Fragment } from "react";
import { Context } from "../App";
import { MultipleUserData } from "../Reducers/Reducer";
import { post } from "../actions/ActionCreator";
import IntroduceUser, { IntroduceUserData } from "../components/IntroduceUser";

const ContainerIntroduceUser: React.FC = () => {
  //Context
  const [state, dispatch, selectionUser, setSelectionUser] = useContext(
    Context
  );
  //初期データ
  const [introduceUserData, setIntroduceUserData] = useState<IntroduceUserData>(
    {
      image: "./images/default.png",
    }
  );
  const [disabled, setDisabled] = useState<boolean>(true);
  //コメント取得
  const [commentContent, setCommentContent] = useState("");

  //全ての条件が揃ったら投稿可能
  useEffect(() => {
    if (
      selectionUser.introduceValue !== "default" &&
      commentContent.length >= 5
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [commentContent.length, selectionUser.introduceValue]);

  //紹介されるユーザのを変更
  const userChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    let image: string;
    const optionValue = e.target.value;

    //未選択に戻ったとき全てのdisableをfalse
    const defaultSelect = (): void => {
      const newArray: MultipleUserData[] = selectionUser.current.slice();
      newArray.map((item: MultipleUserData) => {
        return (item.disabled = false);
      });

      //紹介される側の配列の更新
      setSelectionUser((prevState: MultipleUserData) => ({
        ...prevState,
        current: newArray,
      }));
    };

    //ユーザの情報を変更
    const dataChange = (selectedNum: number) => {
      //ユーザの画像
      image = state.multipleUserData[selectedNum].image;

      //選択中のユーザは紹介できないようにする
      const newArray = selectionUser.current.slice();
      newArray.map((item: MultipleUserData) => {
        switch (item.name) {
          case optionValue:
            return (item.disabled = true);
          default:
            return (item.disabled = false);
        }
      });

      //紹介する側の配列の更新
      setSelectionUser((prevState: MultipleUserData) => ({
        ...prevState,
        current: newArray,
      }));
    };

    switch (optionValue) {
      case "default":
        image = "./images/default.png";
        defaultSelect();
        break;
      case "お父さん":
        dataChange(0);
        break;
      case "お母さん":
        dataChange(1);
        break;
      case "お兄さん":
        dataChange(2);
        break;
      case "お姉さん":
        dataChange(3);
        break;
      case "ペット":
        dataChange(4);
        break;
      default:
        throw new Error();
    }

    //選択されたユーザに変更
    setIntroduceUserData((prevState: IntroduceUserData) => ({
      ...prevState,
      image: image,
    }));

    //変更後のユーザする;
    setSelectionUser((prevState: MultipleUserData) => ({
      ...prevState,
      introduceValue: optionValue,
    }));
  };

  //投稿をクリック
  const postClick = (): void => {
    dispatch(
      post(
        state,
        selectionUser.currentValue,
        selectionUser.introduceValue,
        commentContent,
        []
      )
    );
    setCommentContent("");
  };

  return (
    <Fragment>
      <IntroduceUser
        selectionUser={selectionUser.introduce}
        introduceUserData={introduceUserData}
        optionValue={selectionUser.introduceValue}
        userChange={userChange}
        commentContent={commentContent}
        setCommentContent={setCommentContent}
        disabled={disabled}
        postClick={postClick}
      />
    </Fragment>
  );
};

export default ContainerIntroduceUser;
