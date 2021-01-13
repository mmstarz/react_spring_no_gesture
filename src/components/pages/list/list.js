import { useSpring, animated } from "react-spring";
// els
import PageHeader from "../../layout/pageHeader";
import DragList from "../../animated/dragList/dragList";
// mui
import Box from "@material-ui/core/Box";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	box_root: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "start",
		minHeight: "100vh",
	},
}));

const items = [
	{ id: 1, title: "first", content: "bla" },
	{ id: 2, title: "second", content: "bla bla" },
	{ id: 3, title: "third", content: "bla bla bla" },
	{ id: 4, title: "fourth", content: "bla bla bla bla" },
];

const List = () => {
	const classes = useStyles();

	const props = useSpring({
		to: [
			{
				opacity: 1,
				transform: "translate3d(0px, 0%, 0px)",
			},
		],
		from: {
			opacity: 0,
			transform: "translate3d(0px, 50%, 0px)",
		},
		delay: 1000,
	});

	return (
		<Box classes={{ root: classes.box_root }}>
			<PageHeader title="Dynamic List" />

			<animated.div style={props}>
				<DragList items={items} />
			</animated.div>
		</Box>
	);
};

export default List;
