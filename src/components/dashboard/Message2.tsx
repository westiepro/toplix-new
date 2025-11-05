// Message2: Sub-tabs Layout
// Three sub-tabs using Shadcn Tabs component

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Mail, 
  MessageSquare, 
  MessageCircle, 
  Send, 
  Clock, 
  Search,
  Filter,
  User
} from "lucide-react";
import Image from "next/image";
import { 
  mockEnquiries, 
  mockPropertyMessages, 
  mockChatMessages, 
  getRelativeTime,
  getUnreadCount
} from "./message-types";

export function Message2() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const enquiriesUnread = getUnreadCount(mockEnquiries);
  const messagesUnread = getUnreadCount(mockPropertyMessages);
  const chatUnread = getUnreadCount(mockChatMessages);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'replied':
        return <Badge className="bg-green-500 text-white text-xs">Replied</Badge>;
      case 'read':
        return <Badge className="bg-blue-500 text-white text-xs">Read</Badge>;
      case 'sent':
        return <Badge variant="secondary" className="text-xs">Sent</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-xs">Pending</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-blue-600 mb-1">Messages</h2>
        <p className="text-gray-600">View and manage all your communications</p>
      </div>

      <Tabs defaultValue="enquiries" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 h-auto p-1">
          <TabsTrigger value="enquiries" className="h-14 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                {enquiriesUnread > 0 && (
                  <Badge className="bg-red-500 text-white h-5 min-w-5 text-xs">{enquiriesUnread}</Badge>
                )}
              </div>
              <span className="text-sm font-medium">Enquiries</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="messages" className="h-14 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                {messagesUnread > 0 && (
                  <Badge className="bg-red-500 text-white h-5 min-w-5 text-xs">{messagesUnread}</Badge>
                )}
              </div>
              <span className="text-sm font-medium">Messages</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="chat" className="h-14 data-[state=active]:bg-green-600 data-[state=active]:text-white">
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                {chatUnread > 0 && (
                  <Badge className="bg-red-500 text-white h-5 min-w-5 text-xs">{chatUnread}</Badge>
                )}
              </div>
              <span className="text-sm font-medium">Live Chat</span>
            </div>
          </TabsTrigger>
        </TabsList>

        {/* Enquiries Tab */}
        <TabsContent value="enquiries" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search enquiries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockEnquiries.map((enquiry) => (
                <div key={enquiry.id} className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={enquiry.property_image}
                      alt={enquiry.property_address}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold">{enquiry.property_address}</p>
                        <p className="text-sm text-blue-600 font-bold">€{enquiry.property_price.toLocaleString()}</p>
                      </div>
                      {getStatusBadge(enquiry.status)}
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg mb-2">
                      <p className="text-sm text-gray-700">{enquiry.message}</p>
                    </div>
                    {enquiry.agent_reply && (
                      <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-green-600 text-white text-xs">
                              {enquiry.agent_name?.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-semibold text-green-700">{enquiry.agent_name}</span>
                          <span className="text-xs text-gray-500">{getRelativeTime(enquiry.agent_reply_at!)}</span>
                        </div>
                        <p className="text-sm text-gray-700">{enquiry.agent_reply}</p>
                      </div>
                    )}
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      Sent {getRelativeTime(enquiry.sent_at)}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-700">Conversation Threads</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockPropertyMessages.map((msg) => (
                <div key={msg.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex gap-4 p-4 bg-gray-50">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={msg.property_image}
                        alt={msg.property_address}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-sm">{msg.property_address}</p>
                          <p className="text-xs text-purple-600 font-semibold">{msg.subject}</p>
                        </div>
                        <Badge className="bg-purple-100 text-purple-700 text-xs">
                          {msg.conversation.length} messages
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    {msg.conversation.map((conv, idx) => (
                      <div
                        key={idx}
                        className={`flex gap-3 ${conv.from === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className={conv.from === 'user' ? 'bg-blue-600 text-white' : 'bg-purple-600 text-white'}>
                            {conv.from === 'user' ? 'YOU' : conv.agent_name?.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`flex-1 ${conv.from === 'user' ? 'text-right' : ''}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold">
                              {conv.from === 'user' ? 'You' : conv.agent_name}
                            </span>
                            <span className="text-xs text-gray-500">{getRelativeTime(conv.timestamp)}</span>
                          </div>
                          <div className={`inline-block p-3 rounded-lg ${
                            conv.from === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-900'
                          }`}>
                            <p className="text-sm">{conv.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {msg.status !== 'replied' && msg.conversation.length > 0 && (
                      <div className="pt-3 border-t">
                        <div className="flex gap-2">
                          <Input placeholder="Type your reply..." className="flex-1" />
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Live Chat Tab */}
        <TabsContent value="chat" className="space-y-4">
          <Card>
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-green-700">Support Chat</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600">Support Online</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {mockChatMessages.map((chat) => (
                  <div
                    key={chat.id}
                    className={`flex gap-3 ${chat.from === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {chat.from === 'support' && (
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-500 text-white text-sm">
                          ST
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`max-w-[75%] ${chat.from === 'user' ? 'order-first' : ''}`}>
                      <div
                        className={`p-4 rounded-2xl shadow-sm ${
                          chat.from === 'user'
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-white text-gray-900 rounded-bl-none border'
                        }`}
                      >
                        {chat.from === 'support' && (
                          <p className="text-xs font-semibold text-green-600 mb-1">{chat.support_agent}</p>
                        )}
                        <p className="text-sm leading-relaxed">{chat.message}</p>
                        <p className={`text-xs mt-2 ${chat.from === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                          {getRelativeTime(chat.timestamp)}
                        </p>
                      </div>
                    </div>
                    {chat.from === 'user' && (
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-blue-600 text-white text-sm">YOU</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Chat Input Area */}
              <div className="p-4 bg-white border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message here..."
                    className="flex-1"
                    disabled
                  />
                  <Button disabled className="bg-green-600 hover:bg-green-700 px-6">
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
                <p className="text-xs text-center text-gray-500 mt-3">
                  Live chat functionality coming soon
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

