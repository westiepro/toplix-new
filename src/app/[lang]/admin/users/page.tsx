"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/admin/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
	Users, 
	TrendingUp, 
	Clock, 
	MapPin,
	Activity,
	Shield,
	MessageSquare,
	Star,
	Eye,
	Mail,
	Phone,
	Calendar,
	CheckCircle,
	XCircle,
	AlertCircle,
	Lock,
	Unlock,
	Home,
	Heart,
	Search,
	Tag,
	Globe,
	Smartphone,
	Monitor,
	Wifi,
	WifiOff,
	Edit,
	Trash2,
	Send,
	Plus
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { cn } from "@/lib/utils";

// Mock data for analytics
const userGrowthData = [
	{ month: 'Jan', users: 120 },
	{ month: 'Feb', users: 180 },
	{ month: 'Mar', users: 250 },
	{ month: 'Apr', users: 320 },
	{ month: 'May', users: 380 },
	{ month: 'Jun', users: 450 },
];

const engagementData = [
	{ day: 'Mon', sessions: 45, avgTime: 12 },
	{ day: 'Tue', sessions: 52, avgTime: 15 },
	{ day: 'Wed', sessions: 48, avgTime: 18 },
	{ day: 'Thu', sessions: 61, avgTime: 14 },
	{ day: 'Fri', sessions: 55, avgTime: 16 },
	{ day: 'Sat', sessions: 38, avgTime: 22 },
	{ day: 'Sun', sessions: 32, avgTime: 25 },
];

const deviceData = [
	{ name: 'Desktop', value: 45, color: '#10b981' },
	{ name: 'Mobile', value: 35, color: '#3b82f6' },
	{ name: 'Tablet', value: 20, color: '#f59e0b' },
];

const locationData = [
	{ country: '🇵🇹 Portugal', users: 234, percentage: 52 },
	{ country: '🇪🇸 Spain', users: 89, percentage: 20 },
	{ country: '🇬🇧 UK', users: 67, percentage: 15 },
	{ country: '🇫🇷 France', users: 45, percentage: 10 },
	{ country: '🌍 Others', users: 15, percentage: 3 },
];

const peakHoursData = [
	{ hour: '00:00', activity: 12 },
	{ hour: '04:00', activity: 5 },
	{ hour: '08:00', activity: 45 },
	{ hour: '12:00', activity: 78 },
	{ hour: '16:00', activity: 92 },
	{ hour: '20:00', activity: 65 },
];

// Mock active sessions
const activeSessions = [
	{
		id: '1',
		user: 'John Doe',
		email: 'john@example.com',
		device: 'Chrome on Windows',
		location: 'Lisbon, Portugal',
		ip: '192.168.1.100',
		duration: '2h 34m',
		lastActivity: '2 mins ago',
		status: 'online'
	},
	{
		id: '2',
		user: 'Maria Silva',
		email: 'maria@example.com',
		device: 'Safari on iPhone',
		location: 'Porto, Portugal',
		ip: '192.168.1.101',
		duration: '45m',
		lastActivity: 'Just now',
		status: 'online'
	},
	{
		id: '3',
		user: 'Pedro Santos',
		email: 'pedro@example.com',
		device: 'Firefox on Mac',
		location: 'Faro, Portugal',
		ip: '192.168.1.102',
		duration: '1h 12m',
		lastActivity: '5 mins ago',
		status: 'idle'
	},
];

// Mock user profiles for detailed view
const userProfiles = [
	{
		id: '1',
		name: 'John Doe',
		email: 'john@example.com',
		phone: '+351 912 345 678',
		avatar: 'JD',
		status: 'active',
		emailVerified: true,
		phoneVerified: true,
		twoFactorEnabled: true,
		signupDate: '2024-01-15',
		lastLogin: '2 mins ago',
		loginCount: 234,
		totalTime: '45h 23m',
		country: '🇵🇹 Portugal',
		tags: ['VIP', 'Investor'],
		score: 95,
		notes: 'Highly engaged user, looking for investment properties.',
		properties: {
			viewed: 156,
			favorited: 23,
			contacted: 12
		},
		recentActivity: [
			{ action: 'Viewed Property', details: 'Villa in Albufeira', time: '5 mins ago' },
			{ action: 'Added to Favorites', details: 'Apartment in Lagos', time: '1 hour ago' },
			{ action: 'Contacted Agent', details: 'Inquiry about T3 in Vilamoura', time: '3 hours ago' },
		]
	},
	{
		id: '2',
		name: 'Maria Silva',
		email: 'maria@example.com',
		phone: '+351 923 456 789',
		avatar: 'MS',
		status: 'active',
		emailVerified: true,
		phoneVerified: false,
		twoFactorEnabled: false,
		signupDate: '2024-03-22',
		lastLogin: 'Just now',
		loginCount: 87,
		totalTime: '12h 45m',
		country: '🇵🇹 Portugal',
		tags: ['First-time Buyer'],
		score: 78,
		notes: 'Looking for first home in Porto area.',
		properties: {
			viewed: 45,
			favorited: 8,
			contacted: 3
		},
		recentActivity: [
			{ action: 'Searched', details: 'Apartments in Porto', time: '2 mins ago' },
			{ action: 'Viewed Property', details: 'T2 in Matosinhos', time: '10 mins ago' },
		]
	},
	{
		id: '3',
		name: 'Pedro Santos',
		email: 'pedro@example.com',
		phone: '+351 934 567 890',
		avatar: 'PS',
		status: 'suspended',
		emailVerified: true,
		phoneVerified: true,
		twoFactorEnabled: false,
		signupDate: '2024-02-10',
		lastLogin: '5 mins ago',
		loginCount: 156,
		totalTime: '28h 15m',
		country: '🇵🇹 Portugal',
		tags: ['Problem User'],
		score: 45,
		notes: 'Suspended due to spam activity. Under review.',
		properties: {
			viewed: 234,
			favorited: 56,
			contacted: 89
		},
		recentActivity: [
			{ action: 'Account Suspended', details: 'Spam activity detected', time: '2 days ago' },
		]
	},
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function SiteUsersPage() {
	const [selectedUser, setSelectedUser] = useState<typeof userProfiles[0] | null>(null);
	const [newNote, setNewNote] = useState('');
	const [newTag, setNewTag] = useState('');

	return (
		<div className="space-y-6">
			<Breadcrumbs items={[{ label: "Site Users" }]} />

			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div>
					<h1 className="text-3xl font-bold">Site Users Analytics</h1>
					<p className="text-muted-foreground">Comprehensive user management and analytics dashboard</p>
				</div>
			</div>

			<Tabs defaultValue="analytics" className="space-y-6">
				<TabsList className="grid w-full grid-cols-5 lg:w-auto">
					<TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
					<TabsTrigger value="sessions">🔐 Sessions</TabsTrigger>
					<TabsTrigger value="profiles">👥 Profiles</TabsTrigger>
					<TabsTrigger value="verification">✓ Verification</TabsTrigger>
					<TabsTrigger value="communication">💬 Messages</TabsTrigger>
				</TabsList>

				{/* TIER 3 FEATURE #11: User Analytics Dashboard */}
				<TabsContent value="analytics" className="space-y-6">
					{/* Quick Stats */}
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
						<Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 border-emerald-200 dark:border-emerald-800">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">Total Users</CardTitle>
								<Users className="h-4 w-4 text-emerald-600" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">450</div>
								<p className="text-xs text-emerald-600 dark:text-emerald-500">
									<TrendingUp className="inline h-3 w-3" /> +18% from last month
								</p>
							</CardContent>
						</Card>

						<Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">Active Today</CardTitle>
								<Activity className="h-4 w-4 text-blue-600" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold text-blue-700 dark:text-blue-400">127</div>
								<p className="text-xs text-blue-600 dark:text-blue-500">
									<TrendingUp className="inline h-3 w-3" /> +12% from yesterday
								</p>
							</CardContent>
						</Card>

						<Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-amber-200 dark:border-amber-800">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">Avg Session</CardTitle>
								<Clock className="h-4 w-4 text-amber-600" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold text-amber-700 dark:text-amber-400">18m 34s</div>
								<p className="text-xs text-amber-600 dark:text-amber-500">
									<TrendingUp className="inline h-3 w-3" /> +2m from last week
								</p>
							</CardContent>
						</Card>

						<Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">New This Week</CardTitle>
								<Users className="h-4 w-4 text-purple-600" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold text-purple-700 dark:text-purple-400">23</div>
								<p className="text-xs text-purple-600 dark:text-purple-500">
									<TrendingUp className="inline h-3 w-3" /> +5 from last week
								</p>
							</CardContent>
						</Card>
					</div>

					{/* Charts Row 1 */}
					<div className="grid gap-4 md:grid-cols-2">
						<Card>
							<CardHeader>
								<CardTitle>User Growth Trend</CardTitle>
								<CardDescription>Monthly new user registrations</CardDescription>
							</CardHeader>
							<CardContent>
								<ResponsiveContainer width="100%" height={300}>
									<AreaChart data={userGrowthData}>
										<defs>
											<linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
												<stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
												<stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
											</linearGradient>
										</defs>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="month" />
										<YAxis />
										<Tooltip />
										<Area type="monotone" dataKey="users" stroke="#10b981" fillOpacity={1} fill="url(#colorUsers)" />
									</AreaChart>
								</ResponsiveContainer>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Weekly Engagement</CardTitle>
								<CardDescription>Daily sessions and average time spent</CardDescription>
							</CardHeader>
							<CardContent>
								<ResponsiveContainer width="100%" height={300}>
									<BarChart data={engagementData}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="day" />
										<YAxis yAxisId="left" />
										<YAxis yAxisId="right" orientation="right" />
										<Tooltip />
										<Legend />
										<Bar yAxisId="left" dataKey="sessions" fill="#3b82f6" name="Sessions" />
										<Bar yAxisId="right" dataKey="avgTime" fill="#10b981" name="Avg Time (min)" />
									</BarChart>
								</ResponsiveContainer>
							</CardContent>
						</Card>
					</div>

					{/* Charts Row 2 */}
					<div className="grid gap-4 md:grid-cols-2">
						<Card>
							<CardHeader>
								<CardTitle>Device Distribution</CardTitle>
								<CardDescription>User devices breakdown</CardDescription>
							</CardHeader>
							<CardContent className="flex justify-center">
								<ResponsiveContainer width="100%" height={300}>
									<PieChart>
										<Pie
											data={deviceData}
											cx="50%"
											cy="50%"
											labelLine={false}
											label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
											outerRadius={100}
											fill="#8884d8"
											dataKey="value"
										>
											{deviceData.map((entry, index) => (
												<Cell key={`cell-${index}`} fill={entry.color} />
											))}
										</Pie>
										<Tooltip />
									</PieChart>
								</ResponsiveContainer>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Peak Usage Hours</CardTitle>
								<CardDescription>Activity by time of day</CardDescription>
							</CardHeader>
							<CardContent>
								<ResponsiveContainer width="100%" height={300}>
									<LineChart data={peakHoursData}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="hour" />
										<YAxis />
										<Tooltip />
										<Line type="monotone" dataKey="activity" stroke="#8b5cf6" strokeWidth={2} />
									</LineChart>
								</ResponsiveContainer>
							</CardContent>
						</Card>
					</div>

					{/* Geographic Distribution */}
					<Card>
						<CardHeader>
							<CardTitle>Geographic Distribution</CardTitle>
							<CardDescription>Users by country</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{locationData.map((location, index) => (
									<div key={index} className="flex items-center justify-between">
										<div className="flex items-center gap-3 flex-1">
											<span className="text-2xl">{location.country.split(' ')[0]}</span>
											<div className="flex-1">
												<div className="flex justify-between mb-1">
													<span className="text-sm font-medium">{location.country.split(' ').slice(1).join(' ')}</span>
													<span className="text-sm text-muted-foreground">{location.users} users</span>
												</div>
												<div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
													<div
														className="bg-emerald-500 h-2 rounded-full transition-all"
														style={{ width: `${location.percentage}%` }}
													/>
												</div>
											</div>
										</div>
										<span className="text-sm font-semibold text-emerald-600 ml-4">{location.percentage}%</span>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				{/* TIER 3 FEATURE #12: Session Management */}
				<TabsContent value="sessions" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Active Sessions</CardTitle>
							<CardDescription>Real-time user sessions and device information</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{activeSessions.map((session) => (
									<div key={session.id} className="flex items-start justify-between p-4 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
										<div className="flex items-start gap-4 flex-1">
											<Avatar className="h-10 w-10">
												<AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold">
													{session.user.split(' ').map(n => n[0]).join('')}
												</AvatarFallback>
											</Avatar>
											<div className="flex-1 space-y-2">
												<div className="flex items-center gap-2">
													<span className="font-semibold">{session.user}</span>
													{session.status === 'online' ? (
														<Badge className="bg-green-500 text-white">
															<Wifi className="h-3 w-3 mr-1" />
															Online
														</Badge>
													) : (
														<Badge variant="secondary">
															<WifiOff className="h-3 w-3 mr-1" />
															Idle
														</Badge>
													)}
												</div>
												<div className="text-sm text-muted-foreground">{session.email}</div>
												<div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
													<span className="flex items-center gap-1">
														<Monitor className="h-3 w-3" />
														{session.device}
													</span>
													<span className="flex items-center gap-1">
														<MapPin className="h-3 w-3" />
														{session.location}
													</span>
													<span className="flex items-center gap-1">
														<Globe className="h-3 w-3" />
														{session.ip}
													</span>
													<span className="flex items-center gap-1">
														<Clock className="h-3 w-3" />
														{session.duration}
													</span>
												</div>
												<div className="text-xs text-emerald-600">Last activity: {session.lastActivity}</div>
											</div>
										</div>
										<Button variant="destructive" size="sm">
											<Lock className="h-4 w-4 mr-1" />
											Force Logout
										</Button>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				{/* TIER 3 FEATURES #13, #14, #15, #18: User Profiles */}
				<TabsContent value="profiles" className="space-y-6">
					<div className="grid gap-6 md:grid-cols-3">
						{/* User List */}
						<Card className="md:col-span-1">
							<CardHeader>
								<CardTitle>User Profiles</CardTitle>
								<CardDescription>Select a user to view details</CardDescription>
							</CardHeader>
							<CardContent className="p-0">
								<div className="space-y-2 p-4">
									{userProfiles.map((user) => (
										<div
											key={user.id}
											onClick={() => setSelectedUser(user)}
											className={cn(
												"p-3 rounded-lg cursor-pointer transition-all hover:bg-slate-100 dark:hover:bg-slate-800",
												selectedUser?.id === user.id && "bg-emerald-50 dark:bg-emerald-950 border-2 border-emerald-500"
											)}
										>
											<div className="flex items-center gap-3">
												<Avatar className="h-10 w-10">
													<AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold">
														{user.avatar}
													</AvatarFallback>
												</Avatar>
												<div className="flex-1 min-w-0">
													<div className="font-semibold truncate">{user.name}</div>
													<div className="text-xs text-muted-foreground truncate">{user.email}</div>
													<div className="flex items-center gap-1 mt-1">
														{user.status === 'active' ? (
															<Badge className="bg-green-500 text-white text-[10px]">Active</Badge>
														) : (
															<Badge variant="destructive" className="text-[10px]">Suspended</Badge>
														)}
														<div className="flex items-center gap-1">
															{user.tags.map((tag, i) => (
																<Badge key={i} variant="outline" className="text-[10px]">{tag}</Badge>
															))}
														</div>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						{/* User Detail */}
						{selectedUser && (
							<Card className="md:col-span-2">
								<CardHeader>
									<div className="flex items-start justify-between">
										<div className="flex items-center gap-4">
											<Avatar className="h-16 w-16">
												<AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold text-2xl">
													{selectedUser.avatar}
												</AvatarFallback>
											</Avatar>
											<div>
												<CardTitle className="text-2xl">{selectedUser.name}</CardTitle>
												<CardDescription>{selectedUser.email}</CardDescription>
												<div className="flex items-center gap-2 mt-2">
													<Badge className={selectedUser.status === 'active' ? 'bg-green-500' : 'bg-red-500'}>
														{selectedUser.status === 'active' ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
														{selectedUser.status}
													</Badge>
													<div className="flex items-center gap-1 text-yellow-500">
														{[...Array(5)].map((_, i) => (
															<Star key={i} className={cn("h-4 w-4", i < Math.floor(selectedUser.score / 20) ? "fill-yellow-500" : "")} />
														))}
														<span className="text-sm ml-1">{selectedUser.score}/100</span>
													</div>
												</div>
											</div>
										</div>
										<div className="flex gap-2">
											<Button variant="outline" size="sm">
												<Edit className="h-4 w-4" />
											</Button>
											<Button variant={selectedUser.status === 'active' ? 'destructive' : 'default'} size="sm">
												{selectedUser.status === 'active' ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
											</Button>
										</div>
									</div>
								</CardHeader>
								<CardContent className="space-y-6">
									{/* Contact Info */}
									<div>
										<h3 className="font-semibold mb-3 flex items-center gap-2">
											<Phone className="h-4 w-4" />
											Contact Information
										</h3>
										<div className="grid gap-3 md:grid-cols-2">
											<div className="flex items-center gap-2">
												<Mail className="h-4 w-4 text-muted-foreground" />
												<span className="text-sm">{selectedUser.email}</span>
												{selectedUser.emailVerified && <CheckCircle className="h-4 w-4 text-green-500" />}
											</div>
											<div className="flex items-center gap-2">
												<Phone className="h-4 w-4 text-muted-foreground" />
												<span className="text-sm">{selectedUser.phone}</span>
												{selectedUser.phoneVerified ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
											</div>
											<div className="flex items-center gap-2">
												<MapPin className="h-4 w-4 text-muted-foreground" />
												<span className="text-sm">{selectedUser.country}</span>
											</div>
											<div className="flex items-center gap-2">
												<Shield className="h-4 w-4 text-muted-foreground" />
												<span className="text-sm">2FA: {selectedUser.twoFactorEnabled ? 'Enabled' : 'Disabled'}</span>
												{selectedUser.twoFactorEnabled ? <CheckCircle className="h-4 w-4 text-green-500" /> : <AlertCircle className="h-4 w-4 text-amber-500" />}
											</div>
										</div>
									</div>

									{/* Activity Stats */}
									<div>
										<h3 className="font-semibold mb-3 flex items-center gap-2">
											<Activity className="h-4 w-4" />
											Activity Statistics
										</h3>
										<div className="grid gap-4 md:grid-cols-4">
											<div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
												<div className="text-xs text-muted-foreground">Logins</div>
												<div className="text-2xl font-bold text-blue-600">{selectedUser.loginCount}</div>
											</div>
											<div className="p-3 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
												<div className="text-xs text-muted-foreground">Total Time</div>
												<div className="text-2xl font-bold text-emerald-600">{selectedUser.totalTime}</div>
											</div>
											<div className="p-3 bg-amber-50 dark:bg-amber-950 rounded-lg">
												<div className="text-xs text-muted-foreground">Last Login</div>
												<div className="text-sm font-bold text-amber-600">{selectedUser.lastLogin}</div>
											</div>
											<div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
												<div className="text-xs text-muted-foreground">Member Since</div>
												<div className="text-sm font-bold text-purple-600">{selectedUser.signupDate}</div>
											</div>
										</div>
									</div>

									{/* Property Interactions */}
									<div>
										<h3 className="font-semibold mb-3 flex items-center gap-2">
											<Home className="h-4 w-4" />
											Property Interactions
										</h3>
										<div className="grid gap-4 md:grid-cols-3">
											<div className="flex items-center gap-3 p-3 border rounded-lg">
												<Eye className="h-8 w-8 text-blue-500" />
												<div>
													<div className="text-2xl font-bold">{selectedUser.properties.viewed}</div>
													<div className="text-xs text-muted-foreground">Properties Viewed</div>
												</div>
											</div>
											<div className="flex items-center gap-3 p-3 border rounded-lg">
												<Heart className="h-8 w-8 text-red-500" />
												<div>
													<div className="text-2xl font-bold">{selectedUser.properties.favorited}</div>
													<div className="text-xs text-muted-foreground">Favorited</div>
												</div>
											</div>
											<div className="flex items-center gap-3 p-3 border rounded-lg">
												<MessageSquare className="h-8 w-8 text-green-500" />
												<div>
													<div className="text-2xl font-bold">{selectedUser.properties.contacted}</div>
													<div className="text-xs text-muted-foreground">Contacted</div>
												</div>
											</div>
										</div>
									</div>

									{/* Tags Management */}
									<div>
										<h3 className="font-semibold mb-3 flex items-center gap-2">
											<Tag className="h-4 w-4" />
											User Tags
										</h3>
										<div className="flex flex-wrap gap-2 mb-3">
											{selectedUser.tags.map((tag, index) => (
												<Badge key={index} className="bg-purple-500 text-white">
													{tag}
													<button className="ml-2 hover:text-red-200">×</button>
												</Badge>
											))}
										</div>
										<div className="flex gap-2">
											<Input
												placeholder="Add new tag..."
												value={newTag}
												onChange={(e) => setNewTag(e.target.value)}
												className="flex-1"
											/>
											<Button size="sm">
												<Plus className="h-4 w-4" />
											</Button>
										</div>
									</div>

									{/* Admin Notes */}
									<div>
										<h3 className="font-semibold mb-3 flex items-center gap-2">
											<Edit className="h-4 w-4" />
											Admin Notes
										</h3>
										<div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg mb-3">
											<p className="text-sm">{selectedUser.notes}</p>
										</div>
										<Textarea
											placeholder="Add a new note..."
											value={newNote}
											onChange={(e) => setNewNote(e.target.value)}
											className="mb-2"
										/>
										<Button size="sm">
											<Plus className="h-4 w-4 mr-1" />
											Add Note
										</Button>
									</div>

									{/* Recent Activity */}
									<div>
										<h3 className="font-semibold mb-3 flex items-center gap-2">
											<Clock className="h-4 w-4" />
											Recent Activity
										</h3>
										<div className="space-y-3">
											{selectedUser.recentActivity.map((activity, index) => (
												<div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
													<Activity className="h-5 w-5 text-emerald-500 mt-0.5" />
													<div className="flex-1">
														<div className="font-medium text-sm">{activity.action}</div>
														<div className="text-xs text-muted-foreground">{activity.details}</div>
														<div className="text-xs text-muted-foreground mt-1">{activity.time}</div>
													</div>
												</div>
											))}
										</div>
									</div>
								</CardContent>
							</Card>
						)}

						{!selectedUser && (
							<Card className="md:col-span-2 flex items-center justify-center min-h-[400px]">
								<div className="text-center text-muted-foreground">
									<Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
									<p>Select a user to view details</p>
								</div>
							</Card>
						)}
					</div>
				</TabsContent>

				{/* TIER 3 FEATURE #14: User Verification System */}
				<TabsContent value="verification" className="space-y-6">
					<div className="grid gap-6 md:grid-cols-2">
						<Card>
							<CardHeader>
								<CardTitle>Email Verification Status</CardTitle>
								<CardDescription>Users pending email verification</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{userProfiles.filter(u => !u.emailVerified).length === 0 ? (
										<div className="text-center py-8 text-muted-foreground">
											<CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-500" />
											<p>All users have verified emails</p>
										</div>
									) : (
										userProfiles.filter(u => !u.emailVerified).map((user) => (
											<div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
												<div className="flex items-center gap-3">
													<Avatar>
														<AvatarFallback>{user.avatar}</AvatarFallback>
													</Avatar>
													<div>
														<div className="font-semibold">{user.name}</div>
														<div className="text-sm text-muted-foreground">{user.email}</div>
													</div>
												</div>
												<Button size="sm" variant="outline">
													<Send className="h-4 w-4 mr-1" />
													Resend
												</Button>
											</div>
										))
									)}
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Phone Verification Status</CardTitle>
								<CardDescription>Users pending phone verification</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{userProfiles.filter(u => !u.phoneVerified).map((user) => (
										<div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
											<div className="flex items-center gap-3">
												<Avatar>
													<AvatarFallback>{user.avatar}</AvatarFallback>
												</Avatar>
												<div>
													<div className="font-semibold">{user.name}</div>
													<div className="text-sm text-muted-foreground">{user.phone}</div>
												</div>
											</div>
											<Button size="sm" variant="outline">
												<Send className="h-4 w-4 mr-1" />
												Send SMS
											</Button>
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Two-Factor Authentication</CardTitle>
								<CardDescription>Users with 2FA enabled/disabled</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950 rounded-lg">
										<div className="flex items-center gap-2">
											<CheckCircle className="h-5 w-5 text-green-600" />
											<span className="font-semibold">2FA Enabled</span>
										</div>
										<span className="text-2xl font-bold text-green-600">
											{userProfiles.filter(u => u.twoFactorEnabled).length}
										</span>
									</div>
									<div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
										<div className="flex items-center gap-2">
											<AlertCircle className="h-5 w-5 text-amber-600" />
											<span className="font-semibold">2FA Disabled</span>
										</div>
										<span className="text-2xl font-bold text-amber-600">
											{userProfiles.filter(u => !u.twoFactorEnabled).length}
										</span>
									</div>
									<Button className="w-full" variant="outline">
										<Send className="h-4 w-4 mr-2" />
										Send 2FA Reminder to All
									</Button>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Account Status Overview</CardTitle>
								<CardDescription>Quick verification statistics</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="flex justify-between items-center">
										<span className="text-sm">Email Verified</span>
										<Badge className="bg-green-500">{userProfiles.filter(u => u.emailVerified).length}/{userProfiles.length}</Badge>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-sm">Phone Verified</span>
										<Badge className="bg-blue-500">{userProfiles.filter(u => u.phoneVerified).length}/{userProfiles.length}</Badge>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-sm">2FA Enabled</span>
										<Badge className="bg-purple-500">{userProfiles.filter(u => u.twoFactorEnabled).length}/{userProfiles.length}</Badge>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-sm">Fully Verified</span>
										<Badge className="bg-emerald-500">
											{userProfiles.filter(u => u.emailVerified && u.phoneVerified && u.twoFactorEnabled).length}/{userProfiles.length}
										</Badge>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				{/* TIER 3 FEATURE #16: Communication Hub */}
				<TabsContent value="communication" className="space-y-6">
					<div className="grid gap-6 md:grid-cols-2">
						<Card>
							<CardHeader>
								<CardTitle>Send Bulk Message</CardTitle>
								<CardDescription>Send email to multiple users</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<label className="text-sm font-medium mb-2 block">Recipients</label>
									<Input placeholder="Select users or enter emails..." />
								</div>
								<div>
									<label className="text-sm font-medium mb-2 block">Subject</label>
									<Input placeholder="Email subject..." />
								</div>
								<div>
									<label className="text-sm font-medium mb-2 block">Message</label>
									<Textarea placeholder="Write your message..." rows={6} />
								</div>
								<Button className="w-full">
									<Send className="h-4 w-4 mr-2" />
									Send Message
								</Button>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Message Templates</CardTitle>
								<CardDescription>Quick message templates</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									<Button variant="outline" className="w-full justify-start">
										<Mail className="h-4 w-4 mr-2" />
										Welcome Email
									</Button>
									<Button variant="outline" className="w-full justify-start">
										<Mail className="h-4 w-4 mr-2" />
										Re-engagement Campaign
									</Button>
									<Button variant="outline" className="w-full justify-start">
										<Mail className="h-4 w-4 mr-2" />
										Property Alert
									</Button>
									<Button variant="outline" className="w-full justify-start">
										<Mail className="h-4 w-4 mr-2" />
										Newsletter
									</Button>
									<Button variant="outline" className="w-full justify-start">
										<Mail className="h-4 w-4 mr-2" />
										Account Update
									</Button>
								</div>
							</CardContent>
						</Card>

						<Card className="md:col-span-2">
							<CardHeader>
								<CardTitle>Recent Communications</CardTitle>
								<CardDescription>Last sent messages and campaigns</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									<div className="flex items-center justify-between p-3 border rounded-lg">
										<div className="flex items-center gap-3">
											<Mail className="h-5 w-5 text-blue-500" />
											<div>
												<div className="font-semibold">Welcome Email Campaign</div>
												<div className="text-sm text-muted-foreground">Sent to 23 new users • 2 hours ago</div>
											</div>
										</div>
										<Badge className="bg-green-500">18 Opened</Badge>
									</div>
									<div className="flex items-center justify-between p-3 border rounded-lg">
										<div className="flex items-center gap-3">
											<Mail className="h-5 w-5 text-purple-500" />
											<div>
												<div className="font-semibold">Property Alerts Newsletter</div>
												<div className="text-sm text-muted-foreground">Sent to 156 users • 1 day ago</div>
											</div>
										</div>
										<Badge className="bg-green-500">89 Opened</Badge>
									</div>
									<div className="flex items-center justify-between p-3 border rounded-lg">
										<div className="flex items-center gap-3">
											<Mail className="h-5 w-5 text-amber-500" />
											<div>
												<div className="font-semibold">Re-engagement Campaign</div>
												<div className="text-sm text-muted-foreground">Sent to 45 inactive users • 3 days ago</div>
											</div>
										</div>
										<Badge className="bg-green-500">12 Opened</Badge>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
