/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import routerService from "../../router_service";
import Header from './header.jsx';
import SidebarContent from './sidebar';

const DefaultLayout = (props) => {
	const [menu, setMenu] = useState(false)
	const toggleMobileMenu = () => {
		setMenu(!menu)
	}
	const { match } = props;
	return (
		<>
			<div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
				<Header onMenuClick={() => toggleMobileMenu()} />
				<div>
					{routerService && routerService.map((route, key) =>
						<Route key={key} path={`${match.url}/${route.path}`} component={route.component} />
					)}
				</div>
				<SidebarContent />

			</div>
		</>
	);

}
export default withRouter(DefaultLayout);