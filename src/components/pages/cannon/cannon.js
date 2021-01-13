import { useState, useCallback } from "react";
// els
import PageHeader from "../../layout/pageHeader";
import StarsCannon from "../../animated/starsCannon/starsCannon";
// mui
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
// icons
import CachedIcon from "@material-ui/icons/Cached";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	box_root: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		minHeight: "100vh",
	},
	fab_reset: {
		backgroundColor: "#2196F3",
		"& svg": {
			width: "3rem",
			height: "3rem",
		},
	},
}));

const Cannon = () => {
	const classes = useStyles();

	const [launch, setLaunch] = useState(true);

	const stopLaunch = useCallback(() => setLaunch(false), []);
	const startLaunch = useCallback(() => setLaunch(true), []);

	return (
		<Box classes={{ root: classes.box_root }}>
			<PageHeader title="StarsCannon" />
			<Fab
				aria-label="launch-start"
				classes={{ primary: classes.fab_reset }}
				color="primary"
				onClick={startLaunch}
			>
				<CachedIcon />
			</Fab>
			<StarsCannon launch={launch} stopLaunch={stopLaunch} />
		</Box>
	);
};

export default Cannon;
