// spring
import { useSpring, animated } from "react-spring";
// mui
import Box from "@material-ui/core/Box";
// icons
import StarsIcon from "@material-ui/icons/Stars";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	box_loading: {
		width: 200,
		height: 200,
		color: "springgreen",
	},
	icon_star: {
		color: "inherit",
		width: 200,
		height: 200,
		filter: "drop-shadow(0px 0px 2px black)",
	},
}));

const BubbleLoading = () => {
	const classes = useStyles();

	const { display, opacity, scale } = useSpring({
		to: [
			{
				display: 1,
				opacity: 1,
				scale: 5,
			},
			{
				display: 0,
				opacity: 0,
				scale: 1,
			},
		],
		from: {
			display: 1,
			opacity: 1,
			scale: 1,
		},
		delay: 100,
		config: { duration: 1000 },
	});

	// config.default	{ mass: 1, tension: 170, friction: 26 }
	// config.gentle	{ mass: 1, tension: 120, friction: 14 }
	// config.wobbly	{ mass: 1, tension: 180, friction: 12 }
	// config.stiff	{ mass: 1, tension: 210, friction: 20 }
	// config.slow	{ mass: 1, tension: 280, friction: 60 }
	// config.molasses { mass: 1, tension: 280, friction: 120 }

	return (
		<animated.div
			style={{
				display: display === 0 ? "none" : "block",
				position: "absolute",
				top: 0,
				right: 0,
				opacity: opacity.interpolate([0.1, 0.2, 0.6, 1], [0.1, 0.3, 0.5, 1]),
				transform: scale.interpolate((val) => `scale(${val})`),
				WebkitTransform: scale.interpolate((val) => `scale(${val})`),
			}}
		>
			<Box classes={{ root: classes.box_loading }}>
				<StarsIcon classes={{ root: classes.icon_star }} />
			</Box>
		</animated.div>
	);
};

export default BubbleLoading;
