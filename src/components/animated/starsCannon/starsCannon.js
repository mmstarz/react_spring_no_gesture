import { Fragment, useCallback, useEffect } from "react";
// prop types
import PropTypes from "prop-types";
// spring
import { useSprings, animated } from "react-spring";
// mui
import Box from "@material-ui/core/Box";
// icons
import StarIcon from "@material-ui/icons/Star";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	box_loading: {
		width: 50,
		height: 50,
	},
	icon_star: {
		color: "inherit",
		width: 150,
		height: 150,
		filter: "drop-shadow(0px 0px 2px black)",
	},
}));

// config.default	{ mass: 1, tension: 170, friction: 26 }
// config.gentle	{ mass: 1, tension: 120, friction: 14 }
// config.wobbly	{ mass: 1, tension: 180, friction: 12 }
// config.stiff	{ mass: 1, tension: 210, friction: 20 }
// config.slow	{ mass: 1, tension: 280, friction: 60 }
// config.molasses { mass: 1, tension: 280, friction: 120 }

const StarsCannon = ({ launch, stopLaunch }) => {
	const classes = useStyles();

	const randomInt = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	const randomNum = (min, max) => {
		return Math.random() * (max - min) + min;
	};

	const randomColor = () => {
		let res = "#" + Math.floor(Math.random() * 16777215).toString(16);
		return res;
	};

	const calcDirection = (i) => {
		return i % 2 === 0 ? 1 : -1;
	};

	const handler = useCallback(
		() => (i) => {
			return {
				to: [
					{
						xyrs: [
							0,
							randomInt(0, 200) * -1,
							randomNum(0, 90) * calcDirection(i),
							randomNum(25, 50) / 100,
						],
						opacity: 1,
					},
					{
						xyrs: [
							0,
							randomInt(200, 400) * -1,
							randomNum(90, 180) * calcDirection(i),
							randomNum(25, 50) / 100,
						],
						opacity: 1,
					},
					{
						xyrs: [
							randomInt(100, 180) * calcDirection(i),
							randomInt(400, 600) * -1,
							randomNum(180, 270) * calcDirection(i),
							randomNum(25, 50) / 100,
						],
						opacity: 1,
					},
					{
						xyrs: [
							randomInt(100, 180) * calcDirection(i),
							randomInt(100, 150),
							randomNum(270, 360) * calcDirection(i),
							randomNum(25, 50) / 100,
						],
						opacity: 0,
					},
				],
				from: {
					xyrs: [0, 100, 0, 0],
					opacity: 1,
				},
				delay: 100,
				config: { duration: 1000 },
			};
		},
		[]
	);

	const [springs, setSprings] = useSprings(15, handler());

	const handleCannon = useCallback(() => {
		setSprings(handler());
		stopLaunch();
	}, [setSprings, handler, stopLaunch]);

	useEffect(() => {
		let mount = true;
		if (mount && launch) {
			handleCannon();
		}
		return () => {
			mount = false;
		};
	}, [launch, handleCannon]);

	return (
		<Fragment>
			{springs.map(({ xyrs, opacity }, i) => (
				<animated.div
					key={i}
					style={{
						display: opacity === 0 ? "none" : "block",
						position: "absolute",
						top: "50%",
						left: "50%",
						opacity: opacity.interpolate(
							[0.1, 0.3, 0.6, 1],
							[0.1, 0.4, 0.8, 1]
						),
						transform: xyrs.interpolate(
							(x, y, r, s) => `
								translate(-50%, -50%)
								translate3d(${x}%, ${y}%, 0px)
								scale(${s})
								rotate(${r}deg)
							`
						),
						WebkitTransform: xyrs.interpolate(
							(x, y, r, s) => `
								translateX(-50%, -50%)
								translate3d(${x}%, ${y}%, 0px)
								scale(${s})
								rotate(${r}deg)
							`
						),
					}}
					children={
						<Box
							classes={{ root: classes.box_loading }}
							style={{ color: randomColor() }}
						>
							<StarIcon classes={{ root: classes.icon_star }} />
						</Box>
					}
				/>
			))}
		</Fragment>
	);
};

StarsCannon.propTypes = {
	launch: PropTypes.bool.isRequired,
	stopLaunch: PropTypes.func.isRequired,
};

export default StarsCannon;
