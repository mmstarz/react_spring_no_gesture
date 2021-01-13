import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// mui
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
// icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	box_header: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		padding: theme.spacing(1, 2),
		margin: theme.spacing(2, 1),
		background: "#03A9F4",
		filter: "drop-shadow(1px 1px 2px black)",
		minWidth: 260,		
		"@media (min-width: 280px)": {
			width: 260
		},
		"@media (min-width: 320px)": {
			width: 300
		},
		"@media (min-width: 360px)": {
			width: 340
		},
		"@media (min-width: 400px)": {
			width: 380
		},
		"@media (min-width: 440px)": {
			width: 420
		},
		"@media (min-width: 480px)": {
			width: 460
		},
		"@media (min-width: 520px)": {
			width: 500
		},
		"@media (min-width: 560px)": {
			width: 540
		},
		"@media (min-width: 600px)": {
			width: 580
		},
		"@media (min-width: 640px)": {
			width: 620
		},
		"@media (min-width: 680px)": {
			width: 660
		},
		"@media (min-width: 720px)": {
			width: 700
		},
	},
	typo_headline: {
		color: "white",
		margin: theme.spacing(2, 0),
	},
}));

const PageHeader = ({ title }) => {
	const classes = useStyles();

	return (
		<Box
			classes={{ root: classes.box_header }}
		>
			<Typography variant="h5" classes={{ h5: classes.typo_headline }}>
				{title}
			</Typography>
			<IconButton
				component={RouterLink}
				to="/"
				aria-label="go home"
				color="secondary"
				disabled={false}
				size="medium"
			>
				<ArrowBackIcon />
			</IconButton>
		</Box>
	);
};

PageHeader.propTypes = {
	title: PropTypes.string.isRequired,	
};

export default PageHeader;
