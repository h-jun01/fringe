import React from "react";
import { MultipleUserData } from "../Reducers/Reducer";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

export type IntroduceUserData = {
  image: string;
};

type IntroduceUserProps = {
  selectionUser: MultipleUserData[];
  introduceUserData: IntroduceUserData;
  optionValue: string;
  userChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setCommentContent: React.Dispatch<React.SetStateAction<string>>;
  commentContent: string;
  disabled: boolean;
  postClick: () => void;
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#eee",
    "& > *": {
      margin: theme.spacing(3),
    },
  },
  rounded: {
    width: 150,
    height: 150,
    backgroundColor: "#fff",
  },
  select: {
    width: 150,
    height: 25,
    marginTop: 5,
    border: "none",
    outline: "none",
  },
  box: {
    width: "100%",
    "& textarea": {
      width: "100%",
      height: 180,
      border: "1px solid #ccc",
      borderRadius: 3,
      outline: "none",
    },
    "&  p": {
      textAlign: "right",
    },
  },
}));

const IntroduceUser: React.FC<IntroduceUserProps> = ({ ...props }) => {
  const classes = useStyles();
  return (
    <section className={classes.root}>
      <div>
        <Avatar variant="rounded" className={classes.rounded}>
          <img src={props.introduceUserData.image} alt="user" height="150" />
        </Avatar>
        <select
          defaultValue={props.optionValue}
          onChange={props.userChange}
          className={classes.select}
        >
          <option value="default">ユーザを選択</option>
          {props.selectionUser.map((users: MultipleUserData) => (
            <option
              value={users.name}
              key={users.name}
              disabled={users.disabled}
            >
              {users.name}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.box}>
        <textarea
          placeholder="紹介する人を選択して5文字以上で入力してね！"
          value={props.commentContent}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            props.setCommentContent(e.target.value)
          }
        ></textarea>
        <p>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            disabled={props.disabled}
            onClick={props.postClick}
          >
            投稿
          </Button>
          {/* <button disabled={props.disabled} onClick={props.postClick}>
            投稿
          </button> */}
        </p>
      </div>
    </section>
  );
};

export default IntroduceUser;
