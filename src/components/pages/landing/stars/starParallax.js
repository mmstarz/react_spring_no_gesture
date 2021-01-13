import PropTypes from "prop-types";
// spring
import { animated, useSpring } from "react-spring";
// icons
import StarBorderIcon from "@material-ui/icons/StarBorder";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	wrapper: {
		position: "absolute",
		top: "50%",
		left: "50%",
	},
	icon: {
		position: "absolute",
		left: "50%",
		top: "50%",
		width: "8rem",
		height: "8rem",
		zIndex: 1,
	},
}));

const StarParallax = ({ speed, animProps, inlineStyle }) => {
	const classes = useStyles();

	const [wrapperProps] = useSpring(() => ({
		to: async (next, cancel) => {
			// while (1) {
			// 	await next({
			// 		rotate: 360,
			// 	});
			// }
			await next({
				rotate: 360,
			});
		},
		from: {
			rotate: -360,
		},
		delay: 100,
		config: { duration: 3000 },
		reset: true,
	}));

	return (
		<animated.div
			className={classes.wrapper}
			style={{
				transform: wrapperProps.rotate.interpolate(
					(val) => `rotate(${val}deg)`
				),
				WebkitTransform: wrapperProps.rotate.interpolate(
					(val) => `rotate(${val}deg)`
				),
			}}
		>
			<animated.div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					display: animProps.opacity
						.interpolate({
							range: [1, 0.5, 0.2, 0.1, 0],
							output: [1, 1, 1, 1, 0],
						})
						.interpolate((val) => (val === 0 ? "none" : "block")),
					opacity: animProps.opacity.interpolate((val) => val),
					transform: animProps.xys.interpolate(
						(x, y, s) => `							
							translate3d(${x / speed}px,${y / speed}px,0)							
							scale(${s})
						`
					),
					WebkitTransform: animProps.xys.interpolate(
						(x, y, s) => `							
							translate3d(${x / speed}px,${y / speed}px,0)							
							scale(${s})
						`
					),
				}}
			>
				<StarBorderIcon className={classes.icon} style={inlineStyle} />
			</animated.div>
		</animated.div>
	);
};

StarParallax.propTypes = {
	speed: PropTypes.number.isRequired,
	animProps: PropTypes.object.isRequired,
	inlineStyle: PropTypes.object.isRequired,
};

export default StarParallax;
