import { Fragment } from "react";
import { useSpring, animated } from "react-spring";
// icons
import StarBorderIcon from "@material-ui/icons/StarBorder";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	wrapper: {
		color: "#FF5722",
		background: "#263238",
		borderRadius: "50%",
		"& svg": {
			marginTop: 2,
			marginLeft: 2,
			marginRight: 2,
			width: "5rem",
			height: "5rem",
		},
	},
}));

const Spinner = () => {
	const classes = useStyles();

	const [spring] = useSpring(() => ({
		to: async (next, cancel) => {
			// one time
			// await next({
			// 	yz: [360, 360],
			// 	shadow: 1,
			// });

			// infinite
			while (1) {
				await next({
					yz: [360, 360],
					shadow: 1,
				});
			}
		},
		from: {
			yz: [0, 0],
			shadow: 0,
		},
		config: { duration: 1000 },
		reset: true,
	}));

	const { yz, shadow } = spring;

	return (
		<Fragment>
			<animated.div
				className={classes.wrapper}
				style={{
					boxShadow: shadow
						.interpolate({ range: [0, 0.5, 1], output: [0, 4, 2] })
						.interpolate((val) => `#FF5722 0px 0px ${val}px ${val}px`),
					transform: yz.interpolate(
						(y, z) =>
							`
								rotateY(${y}deg)
								rotateZ(${z}deg)									
							`
					),
					WebkitTransform: yz.interpolate(
						(y, z) =>
							`
								rotateY(${y}deg)
								rotateZ(${z}deg)									
							`
					),
				}}
			>
				<StarBorderIcon />
			</animated.div>
		</Fragment>
	);
};

export default Spinner;
