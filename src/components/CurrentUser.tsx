import React from "react";
import { MultipleUserData } from "../Reducers/Reducer";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

export type CurrentUserData = {
  image: string;
  clappingPoint: number;
  receivingPoint: number;
};

type CurrentUserProps = {
  selectionUser: MultipleUserData[];
  currentUserData: CurrentUserData;
  optionValue: string;
  userChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#62a5bd",
    color: "#fff",
    fontSize: 15,
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
}));

const CurrentUser: React.FC<CurrentUserProps> = ({ ...props }) => {
  const classes = useStyles();
  return (
    <section className={classes.root}>
      <div>
        <Avatar variant="rounded" className={classes.rounded}>
          <img src={props.currentUserData.image} alt="user" width="150" />
        </Avatar>
        <select
          defaultValue={props.optionValue}
          onChange={props.userChange}
          className={classes.select}
        >
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
      <p>拍手できる：{props.currentUserData.clappingPoint}</p>
      <p>拍手された：{props.currentUserData.receivingPoint}</p>
    </section>
  );
};

export default CurrentUser;
