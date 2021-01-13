// els
import PageHeader from "../../layout/pageHeader";
import Boom from "../../animated/boom/boom";
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

const Explosion = () => {
	const classes = useStyles();

	return (
		<Box classes={{ root: classes.box_root }}>
			<PageHeader title="Explosion" />
			<Boom />
		</Box>
	);
};

export default Explosion;
