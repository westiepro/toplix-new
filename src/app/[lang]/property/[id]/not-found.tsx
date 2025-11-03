import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function PropertyNotFound() {
	return (
		<main className="min-h-screen bg-gray-50">
			<Navbar />
			<section className="mx-auto max-w-[1440px] p-4">
				<div className="flex flex-col items-center justify-center h-96 space-y-4">
					<h1 className="text-4xl font-bold text-gray-900">Property Not Found</h1>
					<p className="text-xl text-muted-foreground">
						Sorry, we couldn't find the property you're looking for.
					</p>
					<Link href="/en/homes">
						<Button className="mt-4">
							<Home className="mr-2 h-4 w-4" />
							Back to Home
						</Button>
					</Link>
				</div>
			</section>
		</main>
	);
}

