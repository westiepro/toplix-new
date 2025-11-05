"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User, Phone, Mail, Plus, CheckCircle, X } from "lucide-react";

export function AppointmentsTab() {
	const [view, setView] = useState<"upcoming" | "all">("upcoming");

	// Mock appointments - will be replaced with real data
	const mockAppointments = [
		{
			id: "1",
			propertyTitle: "Luxury Villa in Algarve",
			propertyAddress: "Vilamoura, Quarteira",
			customerName: "Alice Johnson",
			customerEmail: "alice@example.com",
			customerPhone: "+351 912 345 678",
			date: "2023-11-08",
			time: "14:00",
			status: "confirmed",
			notes: "Customer interested in the garden and pool area",
		},
		{
			id: "2",
			propertyTitle: "Modern Apartment in Lisbon",
			propertyAddress: "Parque das Nações, Lisboa",
			customerName: "Bob Smith",
			customerEmail: "bob@example.com",
			customerPhone: "+351 913 456 789",
			date: "2023-11-10",
			time: "10:30",
			status: "pending",
			notes: "",
		},
		{
			id: "3",
			propertyTitle: "Beachfront Penthouse",
			propertyAddress: "Cascais, Lisboa",
			customerName: "Carol Williams",
			customerEmail: "carol@example.com",
			customerPhone: "+351 914 567 890",
			date: "2023-11-12",
			time: "16:00",
			status: "confirmed",
			notes: "Prefers afternoon viewings",
		},
	];

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "confirmed":
				return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Confirmed</Badge>;
			case "pending":
				return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
			case "completed":
				return <Badge variant="outline">Completed</Badge>;
			case "cancelled":
				return <Badge variant="destructive">Cancelled</Badge>;
			default:
				return null;
		}
	};

	const formatDate = (dateStr: string) => {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-3xl font-bold text-blue-600 mb-1">Appointments & Viewings</h2>
					<p className="text-gray-600">Schedule and manage property viewings</p>
				</div>
				<Button className="bg-blue-600 hover:bg-blue-700 gap-2">
					<Plus className="h-5 w-5" />
					Schedule Viewing
				</Button>
			</div>

			{/* Quick Stats */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Card>
					<CardContent className="pt-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 mb-1">This Week</p>
								<p className="text-3xl font-bold text-blue-600">5</p>
							</div>
							<Calendar className="h-10 w-10 text-blue-200" />
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 mb-1">Confirmed</p>
								<p className="text-3xl font-bold text-green-600">3</p>
							</div>
							<CheckCircle className="h-10 w-10 text-green-200" />
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="pt-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600 mb-1">Pending</p>
								<p className="text-3xl font-bold text-yellow-600">2</p>
							</div>
							<Clock className="h-10 w-10 text-yellow-200" />
						</div>
					</CardContent>
				</Card>
			</div>

			{/* View Toggle */}
			<div className="flex gap-2">
				<Button
					variant={view === "upcoming" ? "default" : "outline"}
					onClick={() => setView("upcoming")}
				>
					Upcoming
				</Button>
				<Button
					variant={view === "all" ? "default" : "outline"}
					onClick={() => setView("all")}
				>
					All Appointments
				</Button>
			</div>

			{/* Appointments List */}
			<div className="space-y-4">
				{mockAppointments.map((appointment) => (
					<Card key={appointment.id} className="hover:shadow-md transition-shadow">
						<CardContent className="p-6">
							<div className="flex items-start justify-between mb-4">
								<div className="flex-1">
									<div className="flex items-center gap-3 mb-2">
										<h3 className="text-xl font-semibold">{appointment.propertyTitle}</h3>
										{getStatusBadge(appointment.status)}
									</div>
									<div className="flex items-center gap-2 text-gray-600">
										<MapPin className="h-4 w-4" />
										<span>{appointment.propertyAddress}</span>
									</div>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
								<div className="space-y-3">
									<div className="flex items-center gap-3">
										<div className="p-2 bg-blue-100 rounded-lg">
											<Calendar className="h-5 w-5 text-blue-600" />
										</div>
										<div>
											<p className="text-sm text-gray-600">Date</p>
											<p className="font-medium">{formatDate(appointment.date)}</p>
										</div>
									</div>
									<div className="flex items-center gap-3">
										<div className="p-2 bg-purple-100 rounded-lg">
											<Clock className="h-5 w-5 text-purple-600" />
										</div>
										<div>
											<p className="text-sm text-gray-600">Time</p>
											<p className="font-medium">{appointment.time}</p>
										</div>
									</div>
								</div>

								<div className="space-y-3">
									<div className="flex items-center gap-3">
										<div className="p-2 bg-green-100 rounded-lg">
											<User className="h-5 w-5 text-green-600" />
										</div>
										<div>
											<p className="text-sm text-gray-600">Customer</p>
											<p className="font-medium">{appointment.customerName}</p>
										</div>
									</div>
									<div className="flex items-center gap-3">
										<div className="p-2 bg-orange-100 rounded-lg">
											<Phone className="h-5 w-5 text-orange-600" />
										</div>
										<div>
											<p className="text-sm text-gray-600">Phone</p>
											<p className="font-medium">{appointment.customerPhone}</p>
										</div>
									</div>
								</div>
							</div>

							{appointment.notes && (
								<div className="bg-gray-50 p-3 rounded-lg mb-4">
									<p className="text-sm font-medium text-gray-700 mb-1">Notes:</p>
									<p className="text-sm text-gray-600">{appointment.notes}</p>
								</div>
							)}

							<div className="flex gap-2">
								{appointment.status === "pending" && (
									<Button size="sm" className="bg-green-600 hover:bg-green-700">
										<CheckCircle className="h-4 w-4 mr-2" />
										Confirm
									</Button>
								)}
								<Button variant="outline" size="sm">
									<Mail className="h-4 w-4 mr-2" />
									Send Reminder
								</Button>
								<Button variant="outline" size="sm">
									Reschedule
								</Button>
								<Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
									<X className="h-4 w-4 mr-2" />
									Cancel
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Calendar View Placeholder */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Calendar className="h-5 w-5 text-blue-600" />
						Calendar View
					</CardTitle>
					<CardDescription>Full calendar integration coming soon</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="bg-gray-50 rounded-lg p-12 text-center">
						<Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
						<p className="text-gray-600 mb-4">Calendar view will display all appointments in a monthly/weekly format</p>
						<Button variant="outline">Enable Calendar Integration</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

