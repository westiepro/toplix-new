// Message3: Unified Feed Layout
// Single scrollable feed with all message types chronologically

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Mail, 
  MessageSquare, 
  MessageCircle, 
  Search, 
  Clock,
  User,
  Filter
} from "lucide-react";
import Image from "next/image";
import { 
  getAllMessages,
  getRelativeTime,
  type Message
} from "./message-types";

export function Message3() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  
  const allMessages = getAllMessages();
  
  const filteredMessages = allMessages.filter(msg => {
    const matchesFilter = filterType === 'all' || msg.type === filterType || 
      (filterType === 'enquiry' && msg.type === 'enquiry') ||
      (filterType === 'property_message' && msg.type === 'property_message') ||
      (filterType === 'chat' && msg.type === 'chat');
    
    if (!searchQuery) return matchesFilter;
    
    const searchLower = searchQuery.toLowerCase();
    if (msg.type === 'enquiry' || msg.type === 'property_message') {
      return matchesFilter && (
        msg.property_address.toLowerCase().includes(searchLower) ||
        msg.message.toLowerCase().includes(searchLower)
      );
    }
    if (msg.type === 'chat') {
      return matchesFilter && msg.message.toLowerCase().includes(searchLower);
    }
    return matchesFilter;
  });

  const getTypeInfo = (type: string) => {
    switch (type) {
      case 'enquiry':
        return { 
          icon: <Mail className="h-4 w-4" />, 
          label: 'Enquiry', 
          color: 'bg-blue-500',
          bgColor: 'bg-blue-50',
          borderColor: 'border-l-blue-500'
        };
      case 'property_message':
        return { 
          icon: <MessageSquare className="h-4 w-4" />, 
          label: 'Message', 
          color: 'bg-purple-500',
          bgColor: 'bg-purple-50',
          borderColor: 'border-l-purple-500'
        };
      case 'chat':
        return { 
          icon: <MessageCircle className="h-4 w-4" />, 
          label: 'Chat', 
          color: 'bg-green-500',
          bgColor: 'bg-green-50',
          borderColor: 'border-l-green-500'
        };
      default:
        return { 
          icon: <Mail className="h-4 w-4" />, 
          label: 'Message', 
          color: 'bg-gray-500',
          bgColor: 'bg-gray-50',
          borderColor: 'border-l-gray-500'
        };
    }
  };

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
        <h2 className="text-3xl font-bold text-blue-600 mb-1">Message Feed</h2>
        <p className="text-gray-600">All your communications in chronological order</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search all messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="enquiry">Enquiries Only</SelectItem>
                <SelectItem value="property_message">Messages Only</SelectItem>
                <SelectItem value="chat">Chat Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Unified Message Feed */}
      <div className="space-y-3">
        {filteredMessages.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">No messages found</p>
            </CardContent>
          </Card>
        ) : (
          filteredMessages.map((msg) => {
            const typeInfo = getTypeInfo(msg.type);
            
            return (
              <Card key={msg.id} className={`border-l-4 ${typeInfo.borderColor} hover:shadow-lg transition-shadow`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Type Badge & Time */}
                    <div className="flex flex-col items-center gap-2 min-w-20">
                      <Badge className={`${typeInfo.color} text-white text-xs flex items-center gap-1`}>
                        {typeInfo.icon}
                        {typeInfo.label}
                      </Badge>
                      <div className="text-center">
                        <Clock className="h-3 w-3 text-gray-400 mx-auto mb-1" />
                        <p className="text-xs text-gray-500">
                          {getRelativeTime(msg.type === 'chat' ? msg.timestamp : msg.sent_at)}
                        </p>
                      </div>
                    </div>

                    {/* Message Content */}
                    <div className="flex-1">
                      {(msg.type === 'enquiry' || msg.type === 'property_message') && (
                        <div className="flex gap-3 mb-3">
                          <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                            <Image
                              src={msg.property_image}
                              alt={msg.property_address}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{msg.property_address}</p>
                            <p className="text-sm text-blue-600 font-bold">€{msg.property_price.toLocaleString()}</p>
                            {msg.type === 'property_message' && (
                              <p className="text-xs text-gray-600">{msg.subject}</p>
                            )}
                          </div>
                        </div>
                      )}

                      <div className={`p-3 rounded-lg ${typeInfo.bgColor} mb-2`}>
                        <p className="text-sm text-gray-700">{msg.message}</p>
                      </div>

                      {msg.type === 'enquiry' && msg.agent_reply && (
                        <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-lg mt-2">
                          <div className="flex items-center gap-2 mb-1">
                            <User className="h-3 w-3 text-green-600" />
                            <span className="text-xs font-semibold text-green-700">{msg.agent_name}</span>
                          </div>
                          <p className="text-sm text-gray-700">{msg.agent_reply}</p>
                        </div>
                      )}

                      {msg.type === 'property_message' && msg.conversation.length > 1 && (
                        <div className="mt-2 text-xs text-purple-600 flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{msg.conversation.length} messages in thread</span>
                        </div>
                      )}

                      {/* Status for enquiries and messages */}
                      {(msg.type === 'enquiry' || msg.type === 'property_message') && (
                        <div className="mt-3">
                          {getStatusBadge(msg.status)}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}

        {filteredMessages.length >= 10 && (
          <div className="text-center py-4">
            <Button variant="outline">
              Load More Messages
            </Button>
          </div>
        )}
      </div>

      <div className="text-sm text-center text-gray-500">
        Showing {filteredMessages.length} of {allMessages.length} messages
      </div>
    </div>
  );
}

