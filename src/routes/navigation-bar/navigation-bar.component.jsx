import { Outlet, Link } from "react-router-dom"
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss"

const NavigationBar = () => {
	return (
		<>
			<div className="navigation-bar">
				<Link className="logo-container" to="/">
					<CrownLogo className="logo" />
				</Link>
				<div className="nav-links-container">
					<Link className="nav-link" to="shop">
						Shop
					</Link>
					<Link className="nav-link" to="contact">
						Contact
					</Link>
					<Link className="nav-link" to="sign-in">
						SignIn
					</Link>
				</div>
			</div>
			<Outlet />
		</>
	);
};

export default NavigationBar
