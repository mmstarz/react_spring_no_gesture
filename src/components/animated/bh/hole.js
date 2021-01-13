// spring
import { useSprings, animated } from "react-spring";
// mui
import Box from "@material-ui/core/Box";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	box_container: {
		top: "50%",
		left: "50%",
		width: 40,
		height: 40,
		position: "absolute",
		transform: "translate(-50%, -50%)",
		background: "black",
		borderRadius: "50%",
		zIndex: 3,
		"@media (orientation: landscape)": {
			top: "60%",
		},
		"& > div": {
			position: "absolute",
			overflow: "visible",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			borderRadius: "50%",
			pointerEvents: "auto",
		},
	},
	box_shape: {
		width: 20,
		height: 20,
		borderRadius: "50%",
		filter: "drop-shadow(0px 0px 4px #010e15bf)",
		"&:before": {
			content: '""',
			position: "relative",
			background: `
  			radial-gradient(
  				circle at 50% 120%,
  				rgba(255, 255, 255, 0.5),
  				rgba(255, 255, 255, 0) 70%
  			)
  		`,
			borderRadius: "50%",
			bottom: "2.5%",
			left: "5%",
			opacity: 0.6,
			height: "100%",
			width: "90%",
			filter: "blur(5px)",
			zIndex: 2,
		},
		"&:after": {
			content: '""',
			position: "relative",
			width: "100%",
			height: "100%",
			top: "5%",
			left: "10%",
			borderRadius: "50%",
			background: `
		  	radial-gradient(
		  		circle at 50% 50%,
		  		rgba(255, 255, 255, 0.8),
		  		rgba(255, 255, 255, 0.8) 14%,
		  		rgba(255, 255, 255, 0) 24%
		  	)
		  `,
			transform: "translateX(-80px) translateY(-90px) skewX(-20deg)",
			filter: "blur(10px)",
		},
		"& .shadow": {
			position: "absolute",
			top: "50%",
			left: "50%",
			width: 20,
			height: 20,
			zIndex: "-1",
			transform: "translate(-10%, -15%) rotate(60deg) skew(-30deg, 50deg)",
			background: `
	    	radial-gradient(
	    		circle at 50% 50%,
	    		rgba(0, 0, 0, 0.4),
	    		rgba(0, 0, 0, 0.1) 40%,
	    		rgba(0, 0, 0, 0) 50% 
	    	)
	    `,
		},
	},
}));

// config.default	{ mass: 1, tension: 170, friction: 26 }
// config.gentle	{ mass: 1, tension: 120, friction: 14 }
// config.wobbly	{ mass: 1, tension: 180, friction: 12 }
// config.stiff	{ mass: 1, tension: 210, friction: 20 }
// config.slow	{ mass: 1, tension: 280, friction: 60 }
// config.molasses { mass: 1, tension: 280, friction: 120 }

const Hole = () => {
	const classes = useStyles();

	const randomColor = () => {
		let res = "#" + Math.floor(Math.random() * 16777215).toString(16);
		return res;
	};

	const randomInt = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	const setPos = () => {
		const toX = randomInt(1, 10) > 5 ? 1 : -1;
		const toY = randomInt(1, 10) > 5 ? 1 : -1;
		const toZ = randomInt(1, 10) > 5 ? 1 : -1;

		const res = [
			randomInt(10, 150) * toX,
			randomInt(10, 150) * toY,
			randomInt(10, 150) * toZ,
			1,
		];

		return res;
	};

	const setDS = () => {
		const toX = randomInt(1, 5) > 2 ? 1 : -1;
		const toY = randomInt(1, 5) > 2 ? 1 : -1;

		const res = [randomInt(1, 5) * toX, randomInt(1, 5) * toY];

		return res;
	};

	const [springs] = useSprings(10, (index) => {
		return {
			to: async (next, cancel) => {
				// await next({
				// 	xyzs: setPos(index),
				// 	ds: setDS(index),
				// 	display: 1,
				// 	opacity: 1,
				// 	zIndex: "0",
				// });
				while (1) {
					await next({
						xyzs: [0, 0, 0, 0.1],
						ds: [0, 0],
						display: 0,
						opacity: 0,
						zIndex: "0",
					});
				}
			},
			from: {
				xyzs: setPos(),
				ds: setDS(),
				display: 1,
				opacity: 1,
				zIndex: "0",
			},
			delay: randomInt(1, 100) * 100,
			config: { duration: 1000 },
			reset: true,
		};
	});

	return (
		<Box classes={{ root: classes.box_container }}>
			{springs.map(({ xyzs, ds, display, opacity, zIndex }, index) => (
				<animated.div
					key={index}
					style={{
						position: "absolute",
						display: display.interpolate((val) =>
							val === 0 ? "none" : "block"
						),
						zIndex,
						filter: ds.interpolate(
							(x, y) => `drop-shadow(${x}px ${y}px 4px #010e15bf)`
						),
						transform: xyzs.interpolate(
							(x, y, z, scale) =>
								`translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`
						),
						WebkitTransform: xyzs.interpolate(
							(x, y, z, scale) =>
								`translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`
						),
					}}
					children={
						<Box
							classes={{ root: classes.box_shape }}
							style={{
								background: `
									radial-gradient(
										circle at 50% 120%,
										#d4d4d4 10%,
										${randomColor()} 20%,
										#0a0a0a 120%
									)
								`,
							}}
						>
							<Box className="shadow"></Box>
						</Box>
					}
				/>
			))}
		</Box>
	);
};

export default Hole;
