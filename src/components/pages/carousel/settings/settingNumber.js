import PropTypes from "prop-types";
// mui
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	wrapper: {
		width: 96,
		margin: theme.spacing(0, 1),
		"& legend": {
			fontWeight: 600,
			margin: theme.spacing(1, 0),
		},
		"& input": {
			fontSize: 16,
			border: "none",
			borderRadius: 4,
			padding: 8,
			filter: "drop-shadow(1px 1px 2px black)",
		},
	},
}));

const SettingMargin = ({
	title,
	name,
	min,
	max,
	step,
	handleChange,
	value,
	readOnly,
}) => {
	const classes = useStyles();

	return (
		<FormControl component="fieldset" classes={{ root: classes.wrapper }}>
			<FormLabel component="legend">{title}</FormLabel>
			<FormGroup>
				<input
					type="number"
					name={name}
					step={step}
					min={min}
					max={max}
					value={value}
					placeholder={value}
					onChange={handleChange}
					readOnly={readOnly}
				/>
			</FormGroup>
		</FormControl>
	);
};

SettingMargin.propTypes = {
	title: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	min: PropTypes.number.isRequired,
	max: PropTypes.number.isRequired,
	step: PropTypes.number.isRequired,
	handleChange: PropTypes.func.isRequired,
	value: PropTypes.number.isRequired,
	readOnly: PropTypes.bool.isRequired,
};

export default SettingMargin;
