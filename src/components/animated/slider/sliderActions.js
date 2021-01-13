// prop types
import PropTypes from "prop-types";
// mui
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
// icons
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  actions: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 1,
    "& .chevron_left": {
      background: "rgb(0 188 212 / 0.85)",
      position: "absolute",
      top: 0,
      left: 0,
      transform: "translate(-50%, -50%)",
      filter: "drop-shadow(1px 1px 1px black)",
    },
    "& .chevron_right": {
      background: "rgb(0 188 212 / 0.85)",
      position: "absolute",
      top: 0,
      right: 0,
      transform: "translate(50%, -50%)",
      filter: "drop-shadow(1px 1px 1px black)",
    },
  },
}));

const SliderActions = ({ onLeft, onRight, itemWidth, borders, overflow }) => {
  const classes = useStyles();

  const fullWidth = window.innerWidth - 16;
  const actionsWidth = overflow
    ? borders
      ? `${itemWidth}px`
      : `calc(${fullWidth}px - 50px)`
    : `calc(${itemWidth}px - 50px)`;

  return (
    <Box classes={{ root: classes.actions }} style={{ width: actionsWidth }}>
      <IconButton
        className="chevron_left"
        aria-label="go left"
        component="div"
        onClick={onLeft}
      >
        <ChevronLeftIcon />
      </IconButton>
      <IconButton
        className="chevron_right"
        aria-label="go right"
        component="span"
        onClick={onRight}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
};

SliderActions.propTypes = {
  onRight: PropTypes.func.isRequired,
  onLeft: PropTypes.func.isRequired,
  itemWidth: PropTypes.number.isRequired,
  borders: PropTypes.bool,
  overflow: PropTypes.bool,
};

export default SliderActions;
