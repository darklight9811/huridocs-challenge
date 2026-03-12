import { Link } from "@tanstack/react-router";
import { GithubIcon, LinkedinIcon, MailIcon, SearchIcon } from "lucide-react";

import { cn } from "@repo/ds/lib/utils";

import { env } from "../env";

export function Footer(props: { className?: string }) {
	return (
		<footer
			className={cn(
				"w-full flex flex-col flex-wrap gap-4 justify-evenly items-center overflow-hidden relative pt-32",
				props.className,
			)}
		>
			<div className="flex flex-col md:flex-row text-center md:text-left p-4 container mx-auto gap-8">
				<div className="flex flex-col w-full md:w-1/3">
					<Link
						to="/"
						className="flex justify-center md:justify-start text-xl gap-2 font-bold mb-4"
						aria-label="home"
					>
						<SearchIcon /> {env.name}
					</Link>

					<p>A test challenge for the interview process at huridocs</p>
				</div>

				<div className="flex flex-col w-full md:w-1/3">
					<h2 className="font-bold mb-4">Site</h2>

					<ul className="flex flex-col gap-2">
						<li>
							<Link to="/">Landing</Link>
						</li>
						<li>
							<Link to="/posts">Posts</Link>
						</li>
					</ul>
				</div>

				<div className="flex flex-col w-full md:w-1/3 gap-2">
					<h2 className="font-bold mb-2">Contact</h2>

					<Link
						to="https://github.com/darklight9811/"
						target="_blank"
						className="flex gap-2 items-center"
						aria-label="github"
					>
						<GithubIcon size={16} />
						github
					</Link>

					<Link
						to="https://www.linkedin.com/in/rcorrea98/"
						target="_blank"
						className="flex gap-2 items-center"
						aria-label="linkedin"
					>
						<LinkedinIcon size={16} />
						linkedin
					</Link>

					<a href="mailto:rafael.correa@yamiassu.com.br" className="flex gap-2 items-center">
						<MailIcon size={16} /> rafael.correa@yamiassu.com.br
					</a>
				</div>
			</div>

			<Link to="/" className="text-base font-normal w-full text-center my-2">
				© {new Date().getFullYear()} {env.name}. All rights reserved.
			</Link>
		</footer>
	);
}
