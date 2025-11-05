import { Button } from "@/components/ui/button";
import { Building2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CompanyNotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
			<div className="text-center max-w-md">
				<div className="inline-block p-6 bg-blue-100 rounded-full mb-6">
					<Building2 className="h-16 w-16 text-blue-600" />
				</div>
				<h1 className="text-4xl font-bold text-gray-900 mb-4">Company Not Found</h1>
				<p className="text-lg text-gray-600 mb-8">
					The real estate company you're looking for doesn't exist or is no longer active.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Link href="/">
						<Button size="lg" className="bg-blue-600 hover:bg-blue-700">
							<ArrowLeft className="h-5 w-5 mr-2" />
							Back to Home
						</Button>
					</Link>
					<Link href="/homes">
						<Button size="lg" variant="outline">
							Browse Properties
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}

