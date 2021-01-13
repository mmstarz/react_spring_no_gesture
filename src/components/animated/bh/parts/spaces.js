import { Fragment } from "react";
// spring
import { useSprings, animated } from "react-spring";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	box_space: {
		position: "absolute",
		top: "50%",
		left: "50%",
		zIndex: 2,
		borderRadius: "50%",
		height: 140,
		minWidth: 140,
		// portrait
		"@media (min-width: 280px) and (orientation: portrait)": {
			width: 140,
			height: 140,
		},
		"@media (min-width: 320px) and (orientation: portrait)": {
			width: 180,
			height: 180,
		},
		"@media (min-width: 360px) and (orientation: portrait)": {
			width: 220,
			height: 220,
		},
		"@media (min-width: 400px) and (orientation: portrait)": {
			width: 240,
			height: 240,
		},
		"@media (min-width: 440px) and (orientation: portrait)": {
			width: 280,
			height: 280,
		},
		"@media (min-width: 480px) and (orientation: portrait)": {
			width: 320,
			height: 320,
		},
		"@media (min-width: 520px) and (orientation: portrait)": {
			width: 360,
			height: 360,
		},
		// landscape
		"@media (min-height: 280px) and (orientation: landscape)": {
			top: "60%",
			width: 100,
			height: 100,
		},
		"@media (min-height: 320px) and (orientation: landscape)": {
			top: "60%",
			width: 140,
			height: 140,
		},
		"@media (min-height: 360px) and (orientation: landscape)": {
			top: "60%",
			width: 140,
			height: 140,
		},
		"@media (min-height: 400px) and (orientation: landscape)": {
			top: "60%",
			width: 200,
			height: 200,
		},
		"@media (min-height: 440px) and (orientation: landscape)": {
			top: "60%",
			width: 240,
			height: 240,
		},
		"@media (min-height: 480px) and (orientation: landscape)": {
			top: "60%",
			width: 280,
			height: 280,
		},
		"@media (min-height: 520px) and (orientation: landscape)": {
			top: "60%",
			width: 320,
			height: 320,
		},
	},
}));

// config.default	{ mass: 1, tension: 170, friction: 26 }
// config.gentle	{ mass: 1, tension: 120, friction: 14 }
// config.wobbly	{ mass: 1, tension: 180, friction: 12 }
// config.stiff	{ mass: 1, tension: 210, friction: 20 }
// config.slow	{ mass: 1, tension: 280, friction: 60 }
// config.molasses { mass: 1, tension: 280, friction: 120 }

const Spaces = () => {
	const classes = useStyles();

	const randomInt = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	const setInit = (index) => {
		const res = [0.9 + (index + 1) * 0.025, 0];
		return res;
	};

	const setAction = (index) => {
		const res = [0.9 + (index + 1) * 0.025, 360];
		return res;
	};

	const setShadow = (index) => {
		const res = index === 0 || index === 9 ? 1 : 0;
		return res;
	};

	const [springs] = useSprings(10, (index) => {
		return {
			to: async (next, cancel) => {
				// await next({
				// 	sr: setAction(index),
				// 	sh: setShadow(index)
				// });
				while (1) {
					await next({
						sr: setAction(index),
						sh: setShadow(index),
					});
				}
			},
			from: {
				sr: setInit(index),
				sh: 0,
			},
			delay: randomInt(1, 100) * 100,
			config: { duration: 1000 },
			reset: true,
		};
	});

	return (
		<Fragment>
			{springs.map(({ sr, sh }, index) => (
				<animated.div
					key={index}
					className={classes.box_space}
					style={{
						boxShadow: sh
							.interpolate({
								range: [0, 0.5, 1],
								output: [0, 4, 2],
							})
							.interpolate(
								(val) => `#FF5722 0px 0px ${val}px ${val}px`
							),
						background: index === 0 ? "black" : "transparent",
						borderLeft:
							index % 2 === 0
								? "2px solid yellow"
								: "2px dashed yellow",
						borderRight:
							index % 2 === 0
								? "2px dashed yellow"
								: "2px solid yellow",
						transform: sr.interpolate(
							(s, r) =>
								`
									translate(-50%, -50%)
									rotate3d(1, 0, 0, 60deg)
									rotateY(0deg)
									rotateX(0deg)
									rotateZ(${r}deg)
									scale(${s})
								`
						),
						WebkitTransform: sr.interpolate(
							(s, r) =>
								`
									translate(-50%, -50%)
									rotate3d(1, 0, 0, 60deg)
									rotateY(0deg)
									rotateX(0deg)
									rotateZ(${r}deg)
									scale(${s})
								`
						),
					}}
				/>
			))}
		</Fragment>
	);
};

export default Spaces;
