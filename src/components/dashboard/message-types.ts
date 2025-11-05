// Message Types & Mock Data for User Dashboard
// Structured for future Supabase integration

export interface MessageEnquiry {
  id: string;
  type: 'enquiry';
  property_id: string;
  property_address: string;
  property_image: string;
  property_price: number;
  message: string;
  sent_at: string;
  status: 'sent' | 'read' | 'replied' | 'pending';
  agent_name?: string;
  agent_reply?: string;
  agent_reply_at?: string;
}

export interface PropertyMessage {
  id: string;
  type: 'property_message';
  property_id: string;
  property_address: string;
  property_image: string;
  property_price: number;
  subject: string;
  message: string;
  sent_at: string;
  status: 'sent' | 'read' | 'replied';
  conversation: Array<{
    from: 'user' | 'agent';
    message: string;
    timestamp: string;
    agent_name?: string;
  }>;
}

export interface ChatMessage {
  id: string;
  type: 'chat';
  from: 'user' | 'support';
  message: string;
  timestamp: string;
  support_agent?: string;
  read: boolean;
}

export type Message = MessageEnquiry | PropertyMessage | ChatMessage;

// Mock Enquiries Data
export const mockEnquiries: MessageEnquiry[] = [
  {
    id: 'enq-1',
    type: 'enquiry',
    property_id: 'prop-1',
    property_address: 'Villa in Albufeira, Algarve',
    property_image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400',
    property_price: 890000,
    message: "I'm interested in viewing this property. Are there any available time slots this weekend?",
    sent_at: '2025-11-04T10:30:00Z',
    status: 'replied',
    agent_name: 'Maria Silva',
    agent_reply: 'Thank you for your interest! I have availability on Saturday at 2 PM or Sunday at 11 AM. Which works better for you?',
    agent_reply_at: '2025-11-04T14:20:00Z',
  },
  {
    id: 'enq-2',
    type: 'enquiry',
    property_id: 'prop-2',
    property_address: 'Apartment in Lagos',
    property_image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400',
    property_price: 350000,
    message: 'Is this property still available? I would like more information about the monthly costs.',
    sent_at: '2025-11-03T15:45:00Z',
    status: 'read',
    agent_name: 'Pedro Santos',
  },
  {
    id: 'enq-3',
    type: 'enquiry',
    property_id: 'prop-3',
    property_address: 'Townhouse in Vilamoura',
    property_image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
    property_price: 620000,
    message: 'Can you provide more details about the renovation work done? When was it last updated?',
    sent_at: '2025-11-02T09:15:00Z',
    status: 'replied',
    agent_name: 'Ana Costa',
    agent_reply: 'The property was fully renovated in 2023. New kitchen, bathrooms, and all electrical systems were updated.',
    agent_reply_at: '2025-11-02T16:30:00Z',
  },
  {
    id: 'enq-4',
    type: 'enquiry',
    property_id: 'prop-4',
    property_address: 'Land Plot in Tavira',
    property_image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400',
    property_price: 180000,
    message: 'What are the building permissions for this land? Can I build a 3-bedroom villa?',
    sent_at: '2025-11-01T11:20:00Z',
    status: 'pending',
  },
];

// Mock Property Messages Data
export const mockPropertyMessages: PropertyMessage[] = [
  {
    id: 'msg-1',
    type: 'property_message',
    property_id: 'prop-5',
    property_address: 'Modern Apartment in Porto',
    property_image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400',
    property_price: 450000,
    subject: 'Question about parking',
    message: 'Does this apartment include parking spaces?',
    sent_at: '2025-11-04T08:00:00Z',
    status: 'replied',
    conversation: [
      {
        from: 'user',
        message: 'Does this apartment include parking spaces?',
        timestamp: '2025-11-04T08:00:00Z',
      },
      {
        from: 'agent',
        message: 'Yes, this apartment includes 2 parking spaces in the underground garage.',
        timestamp: '2025-11-04T10:15:00Z',
        agent_name: 'Carlos Mendes',
      },
      {
        from: 'user',
        message: 'Great! Is there also a storage unit included?',
        timestamp: '2025-11-04T12:30:00Z',
      },
      {
        from: 'agent',
        message: 'Yes, there is a 5m² storage unit on the -1 floor.',
        timestamp: '2025-11-04T13:45:00Z',
        agent_name: 'Carlos Mendes',
      },
    ],
  },
  {
    id: 'msg-2',
    type: 'property_message',
    property_id: 'prop-6',
    property_address: 'Luxury Villa in Quinta do Lago',
    property_image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
    property_price: 2500000,
    subject: 'Negotiation inquiry',
    message: 'Is the seller open to negotiations on the price?',
    sent_at: '2025-11-03T16:20:00Z',
    status: 'replied',
    conversation: [
      {
        from: 'user',
        message: 'Is the seller open to negotiations on the price?',
        timestamp: '2025-11-03T16:20:00Z',
      },
      {
        from: 'agent',
        message: 'The seller is motivated and willing to consider serious offers. What price range were you thinking?',
        timestamp: '2025-11-03T18:45:00Z',
        agent_name: 'Sofia Rodrigues',
      },
    ],
  },
  {
    id: 'msg-3',
    type: 'property_message',
    property_id: 'prop-7',
    property_address: 'Beachfront Apartment in Faro',
    property_image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
    property_price: 520000,
    subject: 'Documentation request',
    message: 'Could you send me the energy certificate and floor plans?',
    sent_at: '2025-10-30T14:00:00Z',
    status: 'read',
    conversation: [
      {
        from: 'user',
        message: 'Could you send me the energy certificate and floor plans?',
        timestamp: '2025-10-30T14:00:00Z',
      },
    ],
  },
];

// Mock Chat Messages Data
export const mockChatMessages: ChatMessage[] = [
  {
    id: 'chat-1',
    type: 'chat',
    from: 'support',
    message: 'Hello! Welcome to NextEstate. How can I help you today?',
    timestamp: '2025-11-05T09:00:00Z',
    support_agent: 'Support Team',
    read: true,
  },
  {
    id: 'chat-2',
    type: 'chat',
    from: 'user',
    message: "Hi! I'm looking for properties in the Algarve region. Can you help?",
    timestamp: '2025-11-05T09:02:00Z',
    read: true,
  },
  {
    id: 'chat-3',
    type: 'chat',
    from: 'support',
    message: 'Absolutely! We have over 50 properties in the Algarve. What type of property are you interested in?',
    timestamp: '2025-11-05T09:03:00Z',
    support_agent: 'Support Team',
    read: true,
  },
  {
    id: 'chat-4',
    type: 'chat',
    from: 'user',
    message: 'Looking for a 2-3 bedroom villa with a pool, budget around €500-700k',
    timestamp: '2025-11-05T09:05:00Z',
    read: true,
  },
  {
    id: 'chat-5',
    type: 'chat',
    from: 'support',
    message: "Perfect! I'll send you some matching properties. Check your email in a few minutes.",
    timestamp: '2025-11-05T09:06:00Z',
    support_agent: 'Support Team',
    read: false,
  },
];

// Helper function to get relative time
export function getRelativeTime(timestamp: string): string {
  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  
  return past.toLocaleDateString();
}

// Helper to get all messages combined
export function getAllMessages(): Message[] {
  return [...mockEnquiries, ...mockPropertyMessages, ...mockChatMessages]
    .sort((a, b) => {
      const timeA = a.type === 'chat' ? a.timestamp : a.sent_at;
      const timeB = b.type === 'chat' ? b.timestamp : b.sent_at;
      return new Date(timeB).getTime() - new Date(timeA).getTime();
    });
}

// Helper to count unread messages
export function getUnreadCount(messages: Message[]): number {
  return messages.filter(msg => {
    if (msg.type === 'chat') return !msg.read;
    if (msg.type === 'enquiry') return msg.status === 'pending' || msg.status === 'sent';
    if (msg.type === 'property_message') return msg.status === 'sent';
    return false;
  }).length;
}

