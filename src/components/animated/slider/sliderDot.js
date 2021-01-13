import PropTypes from "prop-types";
// mui
import IconButton from "@material-ui/core/IconButton";
// icons
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	active: {
		color: "#2196F3",
		"&$disabled": {
			color: "#05a6bb",
		},
	},
	disabled: {
		color: "#05a6bb",
	},
}));

const SliderDot = ({ active, handleTeleport }) => {
	const classes = useStyles();

	return (
		<IconButton
			classes={{
				root: classes.active,
				disabled: classes.disabled,
			}}
			aria-label="slider dot"
			component="span"
			color="inherit"
			disabled={active}
			size="small"
			onClick={handleTeleport}
		>
			{active ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
		</IconButton>
	);
};

SliderDot.propTypes = {
	active: PropTypes.bool.isRequired,
	handleTeleport: PropTypes.func.isRequired,
};

export default SliderDot;
