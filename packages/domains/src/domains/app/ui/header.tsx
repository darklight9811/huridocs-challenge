import { Link } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";

import { buttonVariants } from "@repo/ds/ui/button";

import { env } from "../env";

export function Header() {
	return (
		<nav className="fixed top-0 left-0 w-full p-2 z-10 bg-white/50 backdrop-blur-md">
			<div className="container mx-auto flex justify-between items-center">
				<Link to="/" className="flex gap-2">
					<SearchIcon /> <span className="hidden md:flex">{env.name}</span>
				</Link>

				<div>
					<Link to="/posts" className={buttonVariants()}>
						Posts
					</Link>
				</div>
			</div>
		</nav>
	);
}
