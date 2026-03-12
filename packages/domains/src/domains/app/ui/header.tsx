import { Link } from "@tanstack/react-router";

import { buttonVariants } from "@repo/ds/ui/button";

import { env } from "../env";

export function Header() {
	return (
		<nav className="fixed top-0 left-0 w-full p-2">
			<div className="container mx-auto flex justify-between items-center">
				<Link to="/">{env.name}</Link>

				<div>
					<Link to="/posts" className={buttonVariants()}>
						Posts
					</Link>
				</div>
			</div>
		</nav>
	);
}
