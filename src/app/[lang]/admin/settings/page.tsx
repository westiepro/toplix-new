"use client";

import { Breadcrumbs } from "@/components/admin/Breadcrumbs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
	return (
		<div className="space-y-6">
			<Breadcrumbs items={[{ label: "Settings" }]} />

			<div>
				<h1 className="text-3xl font-bold">Settings</h1>
				<p className="text-muted-foreground">Manage your admin settings</p>
			</div>

			<div className="grid gap-6">
				<Card>
					<CardHeader>
						<CardTitle>General Settings</CardTitle>
						<CardDescription>Update your general preferences</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<label className="text-sm font-medium">Site Name</label>
							<Input defaultValue="Real Estate Portal" />
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium">Admin Email</label>
							<Input type="email" defaultValue="admin@example.com" />
						</div>
						<Button>Save Changes</Button>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>API Integration</CardTitle>
						<CardDescription>Connect external services</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<label className="text-sm font-medium">Google Analytics API Key</label>
							<Input type="password" placeholder="Enter API key" />
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium">Mapbox Token</label>
							<Input type="password" placeholder="Enter token" />
						</div>
						<Button>Save API Keys</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}



