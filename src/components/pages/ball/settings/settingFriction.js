// prop types
import PropTypes from "prop-types";
import CustomSlider from "../../../../widgets/slider/slider";

const SettingFriction = ({ handleChange }) => {
	const handleMarks = () => {
		let marks = [];
		for (let i = 0; i < 6; i++) {
			marks.push({
				value: i * 10,
				label: `${(i * 10).toString()}`,
			});
		}

		// console.log(marks);
		return marks;
	};

	const format = (value) => {
		return `${value}`;
	};

	return (
		<CustomSlider
			changeValue={(value) => handleChange(value)}
			title="Friction"
			marks={handleMarks()}
			format={format}
			step={10}
			defVal={50}
			min={0}
			max={50}
			mode="light"
		/>
	);
};

SettingFriction.propTypes = {
	handleChange: PropTypes.func.isRequired,
};

export default SettingFriction;
