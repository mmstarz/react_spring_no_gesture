// prop types
import PropTypes from "prop-types";
import { useState, useLayoutEffect, useCallback } from "react";
import { useSpring, animated, config } from "react-spring";
// mui
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
// icons
import CachedIcon from "@material-ui/icons/Cached";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	container: {
		position: "relative",
		height: 500,
		textAlign: "center",
		"& > div": {
			position: "absolute",
			overflow: "visible",
			pointerEvents: "auto",
			borderRadius: "50%",
			top: "calc(50% - 50px)",
			left: "calc(50% - 50px)",
		},
	},
	box_root: {
		width: 100,
		height: 100,
		background: "hotpink",
		borderRadius: "50%",
		cursor: "-webkit-grab",
		color: "white",
		whiteSpace: "pre",
		boxShadow: "rgb(236 228 232 / 50%) 0px 0px 8px 0px",
		"&:active": {
			cursor: "-webkit-grabbing",
		},
	},
	fab_reset: {
		backgroundColor: "#2196F3",
		"& svg": {
			width: "3rem",
			height: "3rem",
		},
	},
}));

const Circle = () => {
	const classes = useStyles();

	return <Box classes={{ root: classes.box_root }}></Box>;
};

const Pull = ({ mass, tension, friction, velocity }) => {
	const classes = useStyles();
	const [mode, setMode] = useState(false);
	const [moving, setMoving] = useState(false);
	const [basePoint, setBasePoint] = useState({ x: 0, y: 0 });
	const [movePoint, setMovePoint] = useState({ x: 0, y: 0 });

	const handleSpring = useCallback(
		(moving, x, y) => {
			return {
				from: {
					xyzs: [x, y, 0, moving ? 1.1 : 1],
				},
				xyzs: [x, y, 0, moving ? 1.1 : 1],
				zIndex: moving ? "1" : "0",
				shadow: moving ? 15 : 1,
				config: moving
					? {
							mass: mass,
							tension: tension,
							friction: friction,
							velocity: velocity,
							precision: 0.01,
							clamp: true,
					  }
					: config.slow,
				reset: false,
				reverse: false,
			};
		},
		[mass, tension, friction, velocity]
	);

	const [spring, setSpring] = useSpring(() => handleSpring(false, 0, 0));

	const { xyzs, zIndex, shadow } = spring;

	/* TOUCH HANDLERS HERE */

	const handleTouchStart = (e) => {
		e.persist();
		setMode(true);
		setMovePoint({
			x: e.changedTouches[0].clientX,
			y: e.changedTouches[0].clientY,
		});
		handleStart();
	};

	const handleTouchEnd = (e) => {
		e.persist();
		// console.log("end event: ", e);
		handleEnd({
			x: basePoint.x + e.changedTouches[0].clientX - movePoint.x,
			y: basePoint.y + e.changedTouches[0].clientY - movePoint.y,
		});
	};

	/* MOUSE HANDLERS HERE */

	const handleMouseDown = (e) => {
		e.persist();
		setMovePoint({
			x: e.clientX,
			y: e.clientY,
		});
		setMode(false);
		handleStart();
	};

	const handleMouseUp = (e) => {
		e.persist();
		handleEnd({
			x: basePoint.x + e.clientX - movePoint.x,
			y: basePoint.y + e.clientY - movePoint.y,
		});
	};

	/* HANDLER FUNCTIONS HERE */

	const handleStart = () => {
		setMoving(true);
	};

	const handleEnd = ({ x, y }) => {
		setMoving(false);
		setSpring(handleSpring(false, x, y));
		setBasePoint({ x, y });
	};

	const stopScroll = useCallback((e) => {
		e.preventDefault();
		e.stopPropagation();
		// ? not working
		// console.log("event scroll stop func: ", e);
	}, []);

	const move = useCallback(
		(e) => {
			let movx = basePoint.x + e.clientX - movePoint.x;
			let movy = basePoint.y + e.clientY - movePoint.y;

			setSpring(handleSpring(true, movx, movy));

			window.onscroll = (e) => stopScroll(e);
		},
		[setSpring, handleSpring, movePoint, basePoint, stopScroll]
	);

	const touchMove = useCallback(
		(e) => {
			let movx = basePoint.x + e.changedTouches[0].clientX - movePoint.x;
			let movy = basePoint.y + e.changedTouches[0].clientY - movePoint.y;

			setSpring(handleSpring(true, movx, movy));
		},
		[setSpring, handleSpring, movePoint, basePoint]
	);

	const handleReset = () => {
		setMoving(false);
		setMovePoint({ x: 0, y: 0 });
		setBasePoint({ x: 0, y: 0 });
		setSpring(handleSpring(false, 0, 0));
	};

	useLayoutEffect(() => {
		let mount = true;

		if (mount && moving) {
			window.addEventListener(
				!mode ? "mousemove" : "touchmove",
				!mode ? move : touchMove
			);
		}

		if (mount && !moving) {
			window.removeEventListener(
				!mode ? "mousemove" : "touchmove",
				!mode ? move : touchMove
			);
		}

		return () => {
			mount = false;
			if (!mount) {
				window.removeEventListener(
					!mode ? "mousemove" : "touchmove",
					!mode ? move : touchMove
				);
			}
		};
	}, [moving, mode, move, touchMove]);

	return (
		<div className={classes.container}>
			<Fab
				classes={{ primary: classes.fab_reset }}
				color="primary"
				aria-label="reset"
				onClick={handleReset}
			>
				<CachedIcon />
			</Fab>
			<animated.div
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}
				style={{
					zIndex,
					boxShadow: shadow.interpolate(
						(s) => `rgba(236, 228, 232, 0.5) 0px 0px ${2 * s}px 0px`
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
			>
				<Circle />
			</animated.div>
		</div>
	);
};

Pull.propTypes = {
	mass: PropTypes.number.isRequired,
	tension: PropTypes.number.isRequired,
	friction: PropTypes.number.isRequired,
	velocity: PropTypes.number.isRequired,
};

export default Pull;
