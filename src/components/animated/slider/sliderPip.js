import PropTypes from "prop-types";
// spring
import { animated } from "react-spring";
// els
import SliderDot from "./sliderDot";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	sliderDot: {
		"& .pip": {
			position: "absolute",
			top: "50%",
			left: "50%",
			width: 16,
			height: 16,
			padding: 2,
			background: "aliceblue",
			borderRadius: "50%",
			zIndex: -1,
		},
	},
}));

const SliderPip = ({ scale, active, jumpTo }) => {
	const classes = useStyles();

	return (
		<animated.div
			className={classes.sliderDot}
			style={{
				transform: scale.interpolate((val) => `scale(${val})`),
				WebkitTransform: scale.interpolate((val) => `scale(${val})`),
			}}
		>
			<SliderDot active={active} handleTeleport={jumpTo} />
			<animated.div
				className="pip"
				style={{
					transform: active
						? scale
								.interpolate({
									range: [0.9, 0.95, 1],
									output: [0.25, 0.95, 0.0],
								})
								.interpolate((val) => `translate(-50%, -50%) scale(${val})`)
						: `translate(-50%, -50%) scale(0.0)`,
					WebkitTransform: active
						? scale
								.interpolate({
									range: [0.9, 0.95, 1],
									output: [0.25, 0.95, 0.0],
								})
								.interpolate((val) => `translate(-50%, -50%) scale(${val})`)
						: `translate(-50%, -50%) scale(0.0)`,
				}}
			></animated.div>
		</animated.div>
	);
};

SliderPip.propTypes = {
	scale: PropTypes.object.isRequired,
	active: PropTypes.bool.isRequired,
	jumpTo: PropTypes.func.isRequired,
};

export default SliderPip;
