import { Fragment } from "react";
// els
import Times from "./parts/times";
import Spaces from "./parts/spaces";
import Hole from './hole';

const BhWrapper = () => {
	return (
		<Fragment>			
			<Spaces />
			<Times />
			<Hole />		
		</Fragment>
	);
};

export default BhWrapper;
