import { Fragment } from "react";
// spring
import { useSprings, animated, interpolate } from "react-spring";
// mui
import Box from "@material-ui/core/Box";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	box_loading: {
		width: 200,
		height: 200,
		borderRadius: "50%",
		boxShadow: `rgba(236, 228, 232, 0.5) 0px 0px 4px 0px`,
	},
}));

// config.default	{ mass: 1, tension: 170, friction: 26 }
// config.gentle	{ mass: 1, tension: 120, friction: 14 }
// config.wobbly	{ mass: 1, tension: 180, friction: 12 }
// config.stiff	{ mass: 1, tension: 210, friction: 20 }
// config.slow	{ mass: 1, tension: 280, friction: 60 }
// config.molasses { mass: 1, tension: 280, friction: 120 }

const BubblesExplosion = () => {
	const classes = useStyles();

	const randomColor = () => {
		let res = "#" + Math.floor(Math.random() * 16777215).toString(16);
		return res;
	};

	const randomInt = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	const setPos = (index) => {
		switch (index) {
			case 0:
				return [`0px`, `0px`];
			case 1:
				return [`calc(90% - 100px)`, `calc(90% - 100px)`];
			case 2:
				return [`calc(50% - 100px)`, `calc(50% - 100px)`];
			case 3:
				return [`0px`, `calc(90% - 100px)`];
			case 4:
				return [`calc(90% - 100px)`, `0px`];
			default:
				return [0, 0];
		}
	};

	const [springs] = useSprings(5, (index) => {
		return {
			to: async (next, cancel) => {
				await next({
					pos: setPos(index),
					display: 0,
					opacity: 0,
					scale: 5,
					zIndex: "2",
				});
			},
			from: {
				pos: [0, 0],
				display: 1,
				opacity: 1,
				scale: 0,
				zIndex: "2",
			},
			delay: randomInt(1, 10) * 100,
			config: { duration: 1000 },
		};
	});

	return (
		<Fragment>
			{springs.map(({ display, pos, scale, opacity, zIndex }, index) => (
				<animated.div
					key={index}
					style={{
						position: "absolute",
						display: display.interpolate((val) =>
							val === 0 ? "none" : "block"
						),
						top: pos.interpolate((x, y) => `${x}`),
						left: pos.interpolate((x, y) => `${y}`),
						zIndex,
						transform: interpolate(
							[
								scale
									.interpolate({
										range: [4, 3, 2, 1, 0],
										output: [4, 3, 2, 1, 0],
									})
									.interpolate((v) => `scale(${v})`),
							],
							(scale) => `${scale}`
						),
						WebkitTransform: interpolate(
							[
								scale
									.interpolate({
										range: [4, 3, 2, 1, 0],
										output: [4, 3, 2, 1, 0],
									})
									.interpolate((v) => `scale(${v})`),
							],
							(scale) => `${scale}`
						),
					}}
					children={
						<Box
							classes={{ root: classes.box_loading }}
							style={{ backgroundColor: randomColor() }}
						></Box>
					}
				/>
			))}
		</Fragment>
	);
};

export default BubblesExplosion;
