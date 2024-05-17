import cl from './Layout.module.css'
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { MainNavigation } from "../MainNavigation/MainNavigation";

export const Layout: FC = () => {
  return (
		<main className={cl.layout}>
			<MainNavigation />
			<section>
				<Outlet />
			</section>
		</main>
	);
}