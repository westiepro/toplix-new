# 🏢 Agent Dashboard Documentation

## Overview

The Agent Dashboard is a comprehensive management platform for real estate companies to administer their listings, inquiries, appointments, and business analytics.

---

## 🚀 Access

**URL:** `http://localhost:3001/[lang]/agent-dashboard`

**Examples:**
- English: `http://localhost:3001/en/agent-dashboard`
- Portuguese: `http://localhost:3001/pt/agent-dashboard`

---

## 📋 Features

### 1. 📊 **Overview Tab**
The main dashboard showing:
- **Key Metrics Cards:**
  - Total Listings (with active count)
  - Total Views (monthly)
  - Inquiries (with pending count)
  - Sales This Month
  
- **Quick Actions:**
  - Add New Listing
  - View Pending Inquiries
  - Schedule Appointment
  
- **Recent Activity Feed:**
  - Latest inquiries, views, and appointments
  
- **Performance Summary:**
  - Average Days on Market
  - Inquiry → Sale Conversion Rate
  - Most Viewed Property Type

### 2. 🏠 **My Listings Tab**
Comprehensive property management:

**Features:**
- Grid and List view modes
- Advanced filters (status, type, price, location)
- Search by title/address/ID
- Per-listing metrics (views, inquiries, days on market)

**Actions:**
- Add New Listing
- Edit existing listings
- Activate/Deactivate listings
- View analytics
- Delete listings

**Property Status:**
- Active
- Inactive
- Sold
- Rented
- Pending

### 3. 📧 **Inquiries Tab**
Customer communication management:

**Organization:**
- All Inquiries
- Pending (requires response)
- Responded
- Archived

**Features:**
- Quick reply system with dialog
- Email integration
- Property context with thumbnails
- Customer contact information
- Timestamp tracking
- Status management

**Actions:**
- Reply to inquiry
- Mark as responded
- Archive
- View full conversation

### 4. 📅 **Appointments Tab**
Viewing schedule management:

**Features:**
- Upcoming and all appointments view
- Calendar integration (planned)
- Quick stats (this week, confirmed, pending)

**Appointment Details:**
- Property information
- Customer contact (name, email, phone)
- Date and time
- Status (Confirmed, Pending, Completed, Cancelled)
- Notes

**Actions:**
- Schedule new viewing
- Confirm appointment
- Send reminder
- Reschedule
- Cancel

### 5. 📈 **Analytics Tab**
Performance tracking and insights:

**Metrics:**
- Total Views (with trend)
- Total Inquiries (with trend)
- Active Listings count
- Conversion Rate

**Reports:**
- Views Over Time (chart placeholder)
- Inquiries by Property Type (chart placeholder)
- Top Performing Properties
- Performance Summary

**Insights:**
- Average Days on Market
- Most Popular Location
- Peak Viewing Time

**Actions:**
- Export reports (PDF/Excel)
- Filter by time period (7/30/90 days, year)

### 6. ⚙️ **Settings Tab**
Company profile and preferences:

**Company Profile:**
- Company name, email, phone, website
- Office address
- Company description
- Logo upload

**Team Management:**
- View team members
- Manage roles (Admin, Agent)
- Add/Edit team members

**Notification Preferences:**
- Email notifications toggle
- New inquiry alerts
- Appointment reminders
- Weekly reports
- Marketing updates

**Subscription & Billing:**
- Current plan details
- Usage statistics
- Change plan
- View invoices
- Next billing date

---

## 🎨 **Design Features**

### Color Coding:
- **Overview:** Blue theme
- **My Listings:** Green accents
- **Inquiries:** Purple accents
- **Appointments:** Orange accents
- **Analytics:** Teal/Purple mix
- **Settings:** Multi-color sections

### Icons:
- All icons from `lucide-react`
- Consistent sizing (h-5 w-5 for tabs)
- Color-coded per section

### Layout:
- Same gradient header as User Dashboard
- Tab navigation with active states
- Responsive grid layouts
- Card-based components
- Hover effects and transitions

---

## 📁 **File Structure**

```
src/
├── app/
│   └── [lang]/
│       └── agent-dashboard/
│           └── page.tsx                 # Main dashboard page
│
└── components/
    └── agent-dashboard/
        ├── OverviewTab.tsx              # Dashboard overview
        ├── ListingsTab.tsx              # Property management
        ├── InquiriesTab.tsx             # Customer inquiries
        ├── AppointmentsTab.tsx          # Viewing schedule
        ├── AnalyticsTab.tsx             # Performance analytics
        └── SettingsTab.tsx              # Company settings
```

---

## 🔄 **Current Implementation**

### ✅ Implemented:
- Full UI for all 6 tabs
- Mock data for demonstration
- Responsive layouts
- Tab navigation with URL parameters
- Component structure
- Color-coded sections

### 🚧 To Be Implemented:
1. **Database Integration:**
   - Connect to Supabase tables
   - Real-time data fetching
   - CRUD operations

2. **API Routes:**
   - `/api/agent/listings` - Manage properties
   - `/api/agent/inquiries` - Handle messages
   - `/api/agent/appointments` - Schedule viewings
   - `/api/agent/analytics` - Fetch metrics

3. **Authentication:**
   - Role-based access (Company/Agent roles)
   - Permission system
   - Multi-agent support

4. **Charts Integration:**
   - Add Recharts library
   - Implement views over time chart
   - Add inquiry distribution pie chart

5. **Real Functionality:**
   - Add/Edit/Delete listings
   - Reply to inquiries (email integration)
   - Schedule appointments (calendar API)
   - Export reports (PDF generation)

---

## 🗄️ **Suggested Database Schema**

### Tables Needed:

**1. agent_companies**
```sql
- id (uuid)
- name (text)
- email (text)
- phone (text)
- website (text)
- address (text)
- description (text)
- logo_url (text)
- created_at (timestamp)
```

**2. agent_team_members**
```sql
- id (uuid)
- company_id (uuid → agent_companies)
- user_id (uuid → auth.users)
- role (text: 'admin', 'agent')
- created_at (timestamp)
```

**3. property_inquiries**
```sql
- id (uuid)
- property_id (uuid → properties)
- customer_name (text)
- customer_email (text)
- message (text)
- status (text: 'pending', 'responded', 'archived')
- responded_at (timestamp)
- created_at (timestamp)
```

**4. property_appointments**
```sql
- id (uuid)
- property_id (uuid → properties)
- customer_name (text)
- customer_email (text)
- customer_phone (text)
- appointment_date (date)
- appointment_time (time)
- status (text: 'pending', 'confirmed', 'completed', 'cancelled')
- notes (text)
- created_at (timestamp)
```

**5. property_analytics**
```sql
- id (uuid)
- property_id (uuid → properties)
- views (integer)
- inquiries (integer)
- date (date)
```

---

## 🔐 **Access Control**

### Roles:

**Company Admin:**
- Full access to all tabs
- Manage team members
- View all properties
- Access billing

**Agent:**
- View assigned properties only
- Manage own inquiries
- Schedule appointments
- Limited analytics

---

## 🚀 **Next Steps**

1. **Phase 1 - Database Setup:**
   - Create Supabase tables
   - Add RLS policies
   - Set up indexes

2. **Phase 2 - API Integration:**
   - Create API routes
   - Connect to Supabase
   - Implement CRUD operations

3. **Phase 3 - Real Features:**
   - Property CRUD
   - Inquiry responses
   - Appointment scheduling
   - Analytics calculation

4. **Phase 4 - Enhancements:**
   - Charts with Recharts
   - Email notifications (Resend)
   - File uploads (Cloudinary)
   - PDF exports

5. **Phase 5 - Advanced:**
   - Multi-agent support
   - Role-based permissions
   - Real-time updates
   - Mobile responsiveness

---

## 📞 **Support**

For questions or feature requests, contact the development team.

---

**Status:** ✅ UI Complete - Ready for Backend Integration

**Last Updated:** November 5, 2023

