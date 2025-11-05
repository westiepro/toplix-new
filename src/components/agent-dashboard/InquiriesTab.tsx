"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MessageSquare, Mail, Clock, CheckCircle, Archive, Send } from "lucide-react";
import Image from "next/image";

export function InquiriesTab() {
	const [replyingTo, setReplyingTo] = useState<string | null>(null);

	// Mock inquiries - will be replaced with real data
	const mockInquiries = [
		{
			id: "1",
			customerName: "Alice Johnson",
			customerEmail: "alice@example.com",
			propertyTitle: "Luxury Villa in Algarve",
			propertyImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400",
			message: "I'm very interested in this property. Is it still available for viewing? I'd like to schedule a visit next week if possible.",
			timestamp: "2023-11-05T10:30:00Z",
			status: "pending",
		},
		{
			id: "2",
			customerName: "Bob Smith",
			customerEmail: "bob@example.com",
			propertyTitle: "Modern Apartment in Lisbon",
			propertyImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
			message: "What are the monthly fees for this apartment? Does it include parking?",
			timestamp: "2023-11-04T14:20:00Z",
			status: "responded",
		},
		{
			id: "3",
			customerName: "Carol Williams",
			customerEmail: "carol@example.com",
			propertyTitle: "Beachfront Penthouse",
			propertyImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400",
			message: "Is there any room for negotiation on the price? I'm a serious buyer.",
			timestamp: "2023-11-03T09:15:00Z",
			status: "pending",
		},
	];

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "pending":
				return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
			case "responded":
				return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Responded</Badge>;
			case "archived":
				return <Badge variant="outline">Archived</Badge>;
			default:
				return null;
		}
	};

	const formatDate = (isoDate: string) => {
		const date = new Date(isoDate);
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
		const diffDays = Math.floor(diffHours / 24);

		if (diffHours < 24) {
			return `${diffHours} hours ago`;
		}
		return `${diffDays} days ago`;
	};

	const pendingInquiries = mockInquiries.filter(i => i.status === "pending");
	const respondedInquiries = mockInquiries.filter(i => i.status === "responded");

	return (
		<div className="space-y-6">
			{/* Header */}
			<div>
				<h2 className="text-3xl font-bold text-blue-600 mb-1">Inquiries & Messages</h2>
				<p className="text-gray-600">Manage customer inquiries and communications</p>
			</div>

			{/* Tabs */}
			<Tabs defaultValue="all" className="space-y-4">
				<TabsList className="grid w-full grid-cols-4">
					<TabsTrigger value="all">All ({mockInquiries.length})</TabsTrigger>
					<TabsTrigger value="pending">Pending ({pendingInquiries.length})</TabsTrigger>
					<TabsTrigger value="responded">Responded ({respondedInquiries.length})</TabsTrigger>
					<TabsTrigger value="archived">Archived (0)</TabsTrigger>
				</TabsList>

				<TabsContent value="all" className="space-y-4">
					{mockInquiries.map((inquiry) => (
						<Card key={inquiry.id} className="hover:shadow-md transition-shadow">
							<CardContent className="p-6">
								<div className="flex gap-4">
									<div className="relative h-24 w-32 flex-shrink-0 rounded-lg overflow-hidden">
										<Image
											src={inquiry.propertyImage}
											alt={inquiry.propertyTitle}
											fill
											className="object-cover"
										/>
									</div>
									<div className="flex-1 min-w-0">
										<div className="flex items-start justify-between mb-2">
											<div className="flex-1">
												<h3 className="font-semibold text-lg mb-1">{inquiry.propertyTitle}</h3>
												<div className="flex items-center gap-2 text-sm text-gray-600">
													<Mail className="h-4 w-4" />
													<span className="font-medium">{inquiry.customerName}</span>
													<span className="text-gray-400">•</span>
													<span>{inquiry.customerEmail}</span>
												</div>
											</div>
											<div className="flex items-center gap-2">
												{getStatusBadge(inquiry.status)}
												<span className="text-sm text-gray-500 whitespace-nowrap">{formatDate(inquiry.timestamp)}</span>
											</div>
										</div>
										<p className="text-gray-700 mb-4 line-clamp-2">{inquiry.message}</p>
										<div className="flex gap-2">
											<Dialog>
												<DialogTrigger asChild>
													<Button size="sm" className="bg-blue-600 hover:bg-blue-700">
														<MessageSquare className="h-4 w-4 mr-2" />
														Reply
													</Button>
												</DialogTrigger>
												<DialogContent className="max-w-2xl">
													<DialogHeader>
														<DialogTitle>Reply to {inquiry.customerName}</DialogTitle>
														<DialogDescription>
															Regarding: {inquiry.propertyTitle}
														</DialogDescription>
													</DialogHeader>
													<div className="space-y-4 py-4">
														<div className="bg-gray-50 p-4 rounded-lg">
															<p className="text-sm font-medium mb-1">Original Message:</p>
															<p className="text-sm text-gray-700">{inquiry.message}</p>
														</div>
														<div className="space-y-2">
															<label className="text-sm font-medium">Your Reply</label>
															<Textarea
																placeholder="Type your response here..."
																rows={6}
															/>
														</div>
														<div className="flex gap-2 justify-end">
															<Button variant="outline">Save Draft</Button>
															<Button className="bg-blue-600 hover:bg-blue-700">
																<Send className="h-4 w-4 mr-2" />
																Send Reply
															</Button>
														</div>
													</div>
												</DialogContent>
											</Dialog>
											<Button variant="outline" size="sm">
												<CheckCircle className="h-4 w-4 mr-2" />
												Mark Responded
											</Button>
											<Button variant="outline" size="sm">
												<Archive className="h-4 w-4 mr-2" />
												Archive
											</Button>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</TabsContent>

				<TabsContent value="pending" className="space-y-4">
					{pendingInquiries.length > 0 ? (
						pendingInquiries.map((inquiry) => (
							<Card key={inquiry.id} className="border-l-4 border-l-yellow-500">
								<CardContent className="p-6">
									<div className="flex gap-4">
										<div className="relative h-24 w-32 flex-shrink-0 rounded-lg overflow-hidden">
											<Image
												src={inquiry.propertyImage}
												alt={inquiry.propertyTitle}
												fill
												className="object-cover"
											/>
										</div>
										<div className="flex-1">
											<h3 className="font-semibold text-lg mb-1">{inquiry.propertyTitle}</h3>
											<p className="text-sm text-gray-600 mb-2">{inquiry.customerName} • {inquiry.customerEmail}</p>
											<p className="text-gray-700 mb-4">{inquiry.message}</p>
											<Button size="sm" className="bg-blue-600 hover:bg-blue-700">
												<MessageSquare className="h-4 w-4 mr-2" />
												Reply Now
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						))
					) : (
						<Card>
							<CardContent className="py-16 text-center">
								<CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
								<h3 className="text-xl font-semibold mb-2">All caught up!</h3>
								<p className="text-gray-600">No pending inquiries at the moment.</p>
							</CardContent>
						</Card>
					)}
				</TabsContent>

				<TabsContent value="responded" className="space-y-4">
					{respondedInquiries.map((inquiry) => (
						<Card key={inquiry.id} className="border-l-4 border-l-green-500">
							<CardContent className="p-6">
								<div className="flex items-start justify-between">
									<div>
										<h3 className="font-semibold text-lg mb-1">{inquiry.propertyTitle}</h3>
										<p className="text-sm text-gray-600 mb-2">{inquiry.customerName}</p>
										<p className="text-gray-700">{inquiry.message}</p>
									</div>
									<Badge className="bg-green-100 text-green-800">Responded</Badge>
								</div>
							</CardContent>
						</Card>
					))}
				</TabsContent>

				<TabsContent value="archived">
					<Card>
						<CardContent className="py-16 text-center">
							<Archive className="h-16 w-16 text-gray-400 mx-auto mb-4" />
							<h3 className="text-xl font-semibold mb-2">No archived inquiries</h3>
							<p className="text-gray-600">Archived inquiries will appear here.</p>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}

