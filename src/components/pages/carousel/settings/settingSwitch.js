import PropTypes from "prop-types";
// mui
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	wrapper: {
		width: 96,
		margin: theme.spacing(1, 1),
	},
	label: {
		fontWeight: 600,
		color: "rgba(0, 0, 0, 0.54)",
		"&.Mui-focused": {
			color: "rgba(0, 0, 0, 0.54)",
		},
	},
	group: {
		margin: theme.spacing(1, 0),
		padding: theme.spacing(0, 1),
		borderRadius: 4,
		background: "white",
		filter: "drop-shadow(1px 1px 2px black)",
	},
	status_on: {
		color: "springgreen",
		fontWeight: 600,
		margin: theme.spacing(1, 0),
	},
	status_off: {
		color: "#f50057",
		fontWeight: 600,
		margin: theme.spacing(1, 0),
	},
	switch_track: {
		backgroundColor: "#f50057",
	},
	switch_base: {
		color: "#f50057",
		"&.Mui-disabled": {
			color: "#e886a9",
		},
		"&.Mui-checked": {
			color: "#95cc97",
		},
		"&.Mui-checked + .MuiSwitch-track": {
			backgroundColor: "#4CAF50",
		},
	},
	switch_primary: {
		"&.Mui-checked": {
			color: "#4CAF50",
		},
		"&.Mui-checked + .MuiSwitch-track": {
			backgroundColor: "#4CAF50",
		},
	},
}));

const SettingOverflow = ({ handleChange, value, disabled, name, title }) => {
	const classes = useStyles();

	return (
		<FormControl component="fieldset" classes={{ root: classes.wrapper }}>
			<FormLabel component="legend" classes={{ root: classes.label }}>
				{title}
			</FormLabel>
			<FormGroup classes={{ root: classes.group }}>
				<FormControlLabel
					classes={{ label: value ? classes.status_on : classes.status_off }}
					control={
						<Switch
							classes={{
								track: classes.switch_track,
								switchBase: classes.switch_base,
								colorPrimary: classes.switch_primary,
							}}
							color={!disabled ? "primary" : "default"}
							checked={value}
							onChange={handleChange}
							name={name}
							disabled={disabled}
						/>
					}
					label={value ? "on" : "off"}
				/>
			</FormGroup>
		</FormControl>
	);
};

SettingOverflow.propTypes = {
	handleChange: PropTypes.func.isRequired,
	value: PropTypes.bool.isRequired,
	disabled: PropTypes.bool.isRequired,
	name: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default SettingOverflow;
