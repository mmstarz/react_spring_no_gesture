import PropTypes from "prop-types";
// mui els
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
// styles
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
  color_white: {
    color: "white",
  },  
  color_active: {
    color: "hotpink"
  },
  bg_white: {
    backgroundColor: "white",
  },
  typo_headline: {
    color: "white",
    fontWeight: "600"
  }, 
  track: {
    backgroundColor: "hotpink"
  },
  thumb: {
    color: "white",
    backgroundColor: "hotpink"
  },
  mark: {
    padding: theme.spacing(0, "2px"),    
    backgroundColor: "white"
  },
  label: {
    "& > span": {
      backgroundColor: "#d4418a",
      "& > span": {
        color: "white"
      }
    }
  },
}));

const CustomSlider = ({
  changeValue,
  title,
  marks,
  format,
  step,
  defVal,
  min,
  max,
  mode,
}) => {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    changeValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography
        classes={{ root: mode === "light" ? classes.typo_headline : "" }}
        id="discrete-slider-custom"
        gutterBottom
      >
        {title}
      </Typography>
      <Slider
        classes={{
          rail:
            mode === "light" ? clsx(classes.color_white, classes.bg_white) : "",
          track:
            mode === "light" ? classes.track : "",
          thumb:
            mode === "light" ? classes.thumb : "",
          mark:
            mode === "light" ? classes.mark : "",
          active:
            mode === "light" ? clsx(classes.color_white, classes.bg_white) : "",
          valueLabel:
            mode === "light" ? classes.label : "",
          markActive:
            mode === "light" ? clsx(classes.color_white, classes.bg_white) : "",
          markLabel:
            mode === "light" ? classes.color_white : "",
          markLabelActive:
            mode === "light" ? classes.color_active : "",
        }}
        aria-labelledby="discrete-slider-custom"
        valueLabelDisplay="auto"
        min={min}
        max={max}
        step={step}
        marks={marks}
        defaultValue={defVal}
        onChange={handleChange}
        getAriaValueText={(val) => format(val)}
        scale={(x) => format(x)}
      />
    </div>
  );
};

CustomSlider.propTypes = {
  changeValue: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  marks: PropTypes.array.isRequired,
  format: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  defVal: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  mode: PropTypes.string,
};

export default CustomSlider;
