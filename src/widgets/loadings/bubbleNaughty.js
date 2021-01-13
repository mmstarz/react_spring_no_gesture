// spring
import { useSpring, animated } from "react-spring";
// mui
import Box from "@material-ui/core/Box";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	box_loading: {
		width: 100,
		height: 100,
		borderRadius: "50%",
		boxShadow: `rgba(236, 228, 232, 0.5) 0px 0px 4px 0px`,
		backgroundColor: "springgreen",
	},
}));

// config.default	{ mass: 1, tension: 170, friction: 26 }
// config.gentle	{ mass: 1, tension: 120, friction: 14 }
// config.wobbly	{ mass: 1, tension: 180, friction: 12 }
// config.stiff	{ mass: 1, tension: 210, friction: 20 }
// config.slow	{ mass: 1, tension: 280, friction: 60 }
// config.molasses { mass: 1, tension: 280, friction: 120 }

const BubblesNaughty = () => {
	const classes = useStyles();

	const { display, opacity, xyzr } = useSpring({
		to: [
			{
				display: 1,
				opacity: 1,
				xyzr: [
					(window.innerWidth / 8 - 50) * 1,
					(window.innerHeight / 16 - 50) * -1,
					0,
					-90,
				],
			},
			{
				display: 1,
				opacity: 1,
				xyzr: [
					(window.innerWidth / 8 - 50) * 1,
					(window.innerHeight / 2 - 50) * -1,
					0,
					90,
				],
			},
			{
				display: 1,
				opacity: 1,
				xyzr: [
					(window.innerWidth / 1 - 150) * 1,
					(window.innerHeight / 2 - 50) * -1,
					0,
					-90,
				],
			},
			{
				display: 0,
				opacity: 0,
				xyzr: [
					window.innerWidth / 2 - 50,
					(window.innerHeight / 8 - 50) * -1,
					0,
					90,
				],
			},
		],
		from: {
			display: 1,
			opacity: 1,
			xyzr: [
				window.innerWidth / 2 - 50,
				(window.innerHeight / 8 - 50) * -1,
				0,
				0,
			],
		},
		delay: 500,
		config: { duration: 500 },
	});

	return (
		<animated.div
			style={{
				display: display === 0 ? "none" : "block",
				position: "absolute",
				bottom: 0,
				left: 0,
				opacity: opacity.interpolate([0.1, 0.2, 0.6, 1], [0.1, 0.3, 0.5, 1]),
				transform: xyzr.interpolate(
					(x, y, z, r) => `translate3d(${x}px, ${y}px, ${z}px) rotate(${r}deg)`
				),
			}}
		>
			<Box classes={{ root: classes.box_loading }}></Box>
		</animated.div>
	);
};

export default BubblesNaughty;
