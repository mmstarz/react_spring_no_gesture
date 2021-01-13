// els
import PageHeader from "../../layout/pageHeader";
import BhWrapper from "../../animated/bh/bhWrapper";
// mui
import Box from "@material-ui/core/Box";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	box_root: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		minHeight: "100vh",
	},
}));

const BlackHole = () => {
	const classes = useStyles();

	return (
		<Box classes={{ root: classes.box_root }}>
			<PageHeader title="Black Hole" />
			<BhWrapper />
		</Box>
	);
};

export default BlackHole;
