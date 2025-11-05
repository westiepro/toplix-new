// Message1: Combined View Layout
// All three message types in single view with sections

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Mail, 
  MessageSquare, 
  MessageCircle, 
  Send, 
  Clock, 
  CheckCheck,
  ArrowRight,
  Home,
  User
} from "lucide-react";
import Image from "next/image";
import { 
  mockEnquiries, 
  mockPropertyMessages, 
  mockChatMessages, 
  getRelativeTime 
} from "./message-types";

export function Message1() {
  const totalMessages = mockEnquiries.length + mockPropertyMessages.length + mockChatMessages.length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'replied':
        return <Badge className="bg-green-500 text-white">Replied</Badge>;
      case 'read':
        return <Badge className="bg-blue-500 text-white">Read</Badge>;
      case 'sent':
        return <Badge variant="secondary">Sent</Badge>;
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-blue-600 mb-1">Messages</h2>
          <p className="text-gray-600">All your conversations in one place</p>
        </div>
        <Badge className="bg-blue-600 text-white text-lg px-4 py-2">
          {totalMessages} Total
        </Badge>
      </div>

      {/* Property Enquiries Section */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Mail className="h-5 w-5" />
              Property Enquiries ({mockEnquiries.length})
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-blue-600">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockEnquiries.slice(0, 3).map((enquiry) => (
            <div key={enquiry.id} className="flex gap-4 p-4 border rounded-lg hover:bg-blue-50 transition-colors">
              <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={enquiry.property_image}
                  alt={enquiry.property_address}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{enquiry.property_address}</p>
                    <p className="text-sm text-blue-600 font-bold">€{enquiry.property_price.toLocaleString()}</p>
                  </div>
                  {getStatusBadge(enquiry.status)}
                </div>
                <p className="text-sm text-gray-600 mb-2">{enquiry.message}</p>
                {enquiry.agent_reply && (
                  <div className="bg-green-50 border-l-2 border-green-500 pl-3 py-2 mt-2">
                    <p className="text-xs font-semibold text-green-700 mb-1">
                      Reply from {enquiry.agent_name}:
                    </p>
                    <p className="text-sm text-gray-700">{enquiry.agent_reply}</p>
                  </div>
                )}
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  {getRelativeTime(enquiry.sent_at)}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Property Messages Section */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <MessageSquare className="h-5 w-5" />
              Property Messages ({mockPropertyMessages.length})
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-purple-600">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockPropertyMessages.slice(0, 3).map((msg) => (
            <div key={msg.id} className="flex gap-4 p-4 border rounded-lg hover:bg-purple-50 transition-colors">
              <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={msg.property_image}
                  alt={msg.property_address}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{msg.property_address}</p>
                    <p className="text-xs text-purple-600 font-semibold">{msg.subject}</p>
                  </div>
                  {getStatusBadge(msg.status)}
                </div>
                <div className="space-y-2">
                  {msg.conversation.slice(-2).map((conv, idx) => (
                    <div key={idx} className={conv.from === 'user' ? 'bg-gray-50 p-2 rounded' : 'bg-purple-50 p-2 rounded'}>
                      <div className="flex items-center gap-2 mb-1">
                        {conv.from === 'agent' ? (
                          <User className="h-3 w-3 text-purple-600" />
                        ) : (
                          <User className="h-3 w-3 text-gray-600" />
                        )}
                        <span className="text-xs font-semibold">
                          {conv.from === 'agent' ? conv.agent_name : 'You'}
                        </span>
                        <span className="text-xs text-gray-500">{getRelativeTime(conv.timestamp)}</span>
                      </div>
                      <p className="text-sm text-gray-700">{conv.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Live Chat Section */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-green-700">
              <MessageCircle className="h-5 w-5" />
              Live Chat Support
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600">Online</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mb-4 max-h-80 overflow-y-auto">
            {mockChatMessages.map((chat) => (
              <div
                key={chat.id}
                className={`flex gap-3 ${chat.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {chat.from === 'support' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-green-500 text-white text-xs">ST</AvatarFallback>
                  </Avatar>
                )}
                <div className={`max-w-[70%] ${chat.from === 'user' ? 'order-first' : ''}`}>
                  <div
                    className={`p-3 rounded-lg ${
                      chat.from === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {chat.from === 'support' && (
                      <p className="text-xs font-semibold mb-1">{chat.support_agent}</p>
                    )}
                    <p className="text-sm">{chat.message}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 px-1">
                    {getRelativeTime(chat.timestamp)}
                  </p>
                </div>
                {chat.from === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-600 text-white text-xs">YOU</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
          
          {/* Chat Input - Placeholder */}
          <div className="flex gap-2 pt-4 border-t">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled
            />
            <Button disabled className="bg-green-600 hover:bg-green-700">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-center text-gray-500 mt-2">
            Live chat is currently view-only (placeholder)
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

