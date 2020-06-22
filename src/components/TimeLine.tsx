import React from "react";
import { ClappingUserData } from "../Reducers/Reducer";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

type TimeLineProps = {
  currentUserImage: string;
  introduceUserImage: string;
  comment: string;
  date: string;
  disabled: boolean;
  totalClappingNum: number;
  clappingUserList: ClappingUserData[];
  clappingClick: () => void;
};

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: "1px solid #ccc",
    "& > *": {
      margin: theme.spacing(3),
    },
  },
  users: {
    display: "flex",
    alignItems: "center",
    "& img": {
      marginRight: 10,
    },
  },
  box: {
    display: "flex",
  },
  clappingData: {
    display: "flex",
    alignItems: "center",
    "& button": {
      marginRight: 15,
    },
  },
  date: {
    width: "100%",
    textAlign: "right",
  },
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    backgroundColor: "#263b6a",
    color: "#fff",
  },
}));

const TimeLine: React.FC<TimeLineProps> = ({ ...props }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <section className={classes.root}>
      <div className={classes.users}>
        <img src={props.currentUserImage} alt="userImage" width="130" />
        <img src="/images/arrow.png" alt="arrow" width="50" />
        <img src={props.introduceUserImage} alt="userImage" width="130" />
      </div>
      <div>
        <p>{props.comment}</p>
        <div className={classes.box}>
          <div className={classes.clappingData}>
            <Button
              disableElevation
              variant="contained"
              color="primary"
              disabled={props.disabled}
              onClick={props.clappingClick}
            >
              拍手
            </Button>
            <Typography
              aria-owns={open ? "mouse-over-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
            >
              {props.totalClappingNum}
            </Typography>
            <Popover
              id="mouse-over-popover"
              className={classes.popover}
              classes={{
                paper: classes.paper,
              }}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <div>
                <p>拍手一覧</p>
                {props.clappingUserList.map((item) => (
                  <p key={item.name}>
                    {item.name}：{item.clickNum}
                  </p>
                ))}
              </div>
            </Popover>
          </div>
          <p className={classes.date}>{props.date}</p>
        </div>
      </div>
    </section>
  );
};

export default TimeLine;
