"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Eye, MessageSquare, TrendingUp, Home } from "lucide-react";

interface CompanyAnalyticsTabProps {
  companyId: string;
  companyName: string;
}

// Mock data for demonstration
const mockMonthlyData = [
  { month: 'Jan', views: 1240, leads: 45, listings: 12 },
  { month: 'Feb', views: 1450, leads: 52, listings: 15 },
  { month: 'Mar', views: 1680, leads: 58, listings: 18 },
  { month: 'Apr', views: 1920, leads: 64, listings: 20 },
  { month: 'May', views: 2150, leads: 71, listings: 22 },
  { month: 'Jun', views: 2380, leads: 78, listings: 25 },
];

const mockCityData = [
  { city: 'Lagos', listings: 8, value: 32 },
  { city: 'Albufeira', listings: 6, value: 24 },
  { city: 'Vilamoura', listings: 5, value: 20 },
  { city: 'Faro', listings: 4, value: 16 },
  { city: 'Other', listings: 2, value: 8 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#6b7280'];

export function CompanyAnalyticsTab({ companyId, companyName }: CompanyAnalyticsTabProps) {
  // In production, fetch real analytics data from API
  const totalViews = mockMonthlyData.reduce((sum, item) => sum + item.views, 0);
  const totalLeads = mockMonthlyData.reduce((sum, item) => sum + item.leads, 0);
  const conversionRate = ((totalLeads / totalViews) * 100).toFixed(1);
  const activeListings = mockMonthlyData[mockMonthlyData.length - 1].listings;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-500 opacity-75" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Leads</p>
                <p className="text-2xl font-bold">{totalLeads}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-green-500 opacity-75" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">{conversionRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500 opacity-75" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Listings</p>
                <p className="text-2xl font-bold">{activeListings}</p>
              </div>
              <Home className="h-8 w-8 text-amber-500 opacity-75" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views and Leads Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Views & Leads Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockMonthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="leads" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Listings Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Listings Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockMonthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="listings" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Properties by City */}
      <Card>
        <CardHeader>
          <CardTitle>Properties by City</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockCityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.city}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockCityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {mockCityData.map((city, index) => (
                <div key={city.city} className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span>{city.city}</span>
                  </div>
                  <span className="font-medium">{city.listings} listings</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

