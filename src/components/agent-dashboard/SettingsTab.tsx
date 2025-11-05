"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Building2, Mail, Phone, Globe, MapPin, Bell, CreditCard, Users, Save } from "lucide-react";

export function SettingsTab() {
	return (
		<div className="space-y-6">
			{/* Header */}
			<div>
				<h2 className="text-3xl font-bold text-blue-600 mb-1">Settings & Account</h2>
				<p className="text-gray-600">Manage your company profile and preferences</p>
			</div>

			{/* Company Profile */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Building2 className="h-5 w-5 text-blue-600" />
						Company Profile
					</CardTitle>
					<CardDescription>Update your company information</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="company-name">Company Name</Label>
							<Input id="company-name" defaultValue="Premier Real Estate" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="company-email">Email Address</Label>
							<Input id="company-email" type="email" defaultValue="contact@premierrealestate.com" />
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="phone">Phone Number</Label>
							<Input id="phone" defaultValue="+351 210 123 456" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="website">Website</Label>
							<Input id="website" defaultValue="https://premierrealestate.com" />
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="address">Office Address</Label>
						<Input id="address" defaultValue="Avenida da Liberdade, 123, 1250-142 Lisboa" />
					</div>

					<div className="space-y-2">
						<Label htmlFor="description">Company Description</Label>
						<Textarea
							id="description"
							rows={4}
							defaultValue="Premier Real Estate is a leading property company in Portugal, specializing in luxury homes and investment properties."
						/>
					</div>

					<div className="space-y-2">
						<Label>Company Logo</Label>
						<div className="flex items-center gap-4">
							<div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
								<Building2 className="h-12 w-12 text-gray-400" />
							</div>
							<div>
								<Button variant="outline">Upload Logo</Button>
								<p className="text-sm text-gray-500 mt-2">Recommended: 500x500px, PNG or JPG</p>
							</div>
						</div>
					</div>

					<Button className="bg-blue-600 hover:bg-blue-700">
						<Save className="h-4 w-4 mr-2" />
						Save Changes
					</Button>
				</CardContent>
			</Card>

			{/* Team Management */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Users className="h-5 w-5 text-purple-600" />
						Team Management
					</CardTitle>
					<CardDescription>Manage your team members and permissions</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
								JD
							</div>
							<div>
								<p className="font-medium">John Doe</p>
								<p className="text-sm text-gray-600">john@premierrealestate.com</p>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<span className="text-sm text-gray-600">Admin</span>
							<Button variant="outline" size="sm">Edit</Button>
						</div>
					</div>

					<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
								JS
							</div>
							<div>
								<p className="font-medium">Jane Smith</p>
								<p className="text-sm text-gray-600">jane@premierrealestate.com</p>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<span className="text-sm text-gray-600">Agent</span>
							<Button variant="outline" size="sm">Edit</Button>
						</div>
					</div>

					<Button variant="outline" className="w-full">
						<Users className="h-4 w-4 mr-2" />
						Add Team Member
					</Button>
				</CardContent>
			</Card>

			{/* Notification Preferences */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Bell className="h-5 w-5 text-orange-600" />
						Notification Preferences
					</CardTitle>
					<CardDescription>Choose how you want to receive notifications</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="flex items-center justify-between">
						<div className="space-y-1">
							<p className="font-medium">Email Notifications</p>
							<p className="text-sm text-gray-600">Receive email updates for important events</p>
						</div>
						<Switch defaultChecked />
					</div>

					<div className="border-t my-4" />

					<div className="flex items-center justify-between">
						<div className="space-y-1">
							<p className="font-medium">New Inquiry Alerts</p>
							<p className="text-sm text-gray-600">Get notified when you receive a new inquiry</p>
						</div>
						<Switch defaultChecked />
					</div>

					<div className="border-t my-4" />

					<div className="flex items-center justify-between">
						<div className="space-y-1">
							<p className="font-medium">Appointment Reminders</p>
							<p className="text-sm text-gray-600">Reminders 24 hours before scheduled viewings</p>
						</div>
						<Switch defaultChecked />
					</div>

					<div className="border-t my-4" />

					<div className="flex items-center justify-between">
						<div className="space-y-1">
							<p className="font-medium">Weekly Reports</p>
							<p className="text-sm text-gray-600">Receive weekly performance summaries</p>
						</div>
						<Switch />
					</div>

					<div className="border-t my-4" />

					<div className="flex items-center justify-between">
						<div className="space-y-1">
							<p className="font-medium">Marketing Updates</p>
							<p className="text-sm text-gray-600">Product updates and tips</p>
						</div>
						<Switch />
					</div>
				</CardContent>
			</Card>

			{/* Subscription & Billing */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<CreditCard className="h-5 w-5 text-green-600" />
						Subscription & Billing
					</CardTitle>
					<CardDescription>Manage your subscription plan</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
						<div className="flex items-center justify-between mb-4">
							<div>
								<h3 className="text-2xl font-bold">Professional Plan</h3>
								<p className="text-gray-600">Up to 50 listings</p>
							</div>
							<div className="text-right">
								<p className="text-3xl font-bold text-blue-600">€99</p>
								<p className="text-sm text-gray-600">per month</p>
							</div>
						</div>
						<div className="space-y-2 mb-4">
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 rounded-full bg-blue-600"></div>
								<span className="text-sm">Unlimited property views</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 rounded-full bg-blue-600"></div>
								<span className="text-sm">Advanced analytics</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 rounded-full bg-blue-600"></div>
								<span className="text-sm">Priority support</span>
							</div>
						</div>
						<div className="flex gap-2">
							<Button variant="outline">Change Plan</Button>
							<Button variant="outline">View Invoices</Button>
						</div>
					</div>

					<div className="space-y-2">
						<Label>Current Usage</Label>
						<div className="space-y-2">
							<div className="flex items-center justify-between text-sm">
								<span>Active Listings</span>
								<span className="font-medium">18 / 50</span>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-2">
								<div className="bg-blue-600 h-2 rounded-full" style={{ width: "36%" }}></div>
							</div>
						</div>
					</div>

					<div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
						<p className="text-sm text-yellow-800">
							<strong>Next billing date:</strong> December 5, 2023
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

