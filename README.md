# Project Management System Mockup

A comprehensive React + Bootstrap mockup for a project management system with role-based authentication, project management, task tracking, invoice management, and Tally ERP integration.

## Features

### 🔐 Authentication & Dashboard
- **Login Page**: Username/password fields with role-based redirection (Project Manager / User)
- **Dashboard**: Quick stats showing Total Projects, Ongoing Tasks, Completed Tasks, Pending Invoices
- **Navigation**: Sidebar menu with all major sections

### 📋 Project Management
- **Project List**: Table view with project details, status, and actions
- **Create/Edit Projects**: Modal forms with team member assignment
- **Project Details**: Name, description, dates, status, and team members

### 🧩 Module & Sub-Module Management
- **Hierarchical View**: Accordion-style module list with sub-modules
- **Module Management**: Add, edit, delete modules with team assignment
- **Sub-module Support**: Nested structure for detailed project breakdown

### ✅ Task Management
- **Kanban Board**: Visual task board with columns (In Progress, Testing, Done, Deployment)
- **Task Cards**: Detailed task information with assignees and hours
- **Task Operations**: Add, edit, delete tasks with priority levels

### 💰 Invoice Management
- **Invoice List**: Complete invoice tracking with status and amounts
- **Invoice Creation**: Form-based invoice creation with client and project selection
- **Invoice Preview**: Professional invoice preview with download options (PDF/Excel)

### 🔄 Tally ERP Integration
- **Integration Settings**: Server configuration and authentication setup
- **Sync Status**: Real-time sync progress with detailed history
- **Error Logging**: Comprehensive error tracking and reporting

### 📊 Reports & Analytics
- **Multiple Report Types**: Project, Task, Revenue, and Team Performance reports
- **Interactive Charts**: Visual data representation with progress bars
- **Filtering Options**: Date range and project-based filtering
- **Export Functionality**: Report export capabilities

## Technology Stack

- **Frontend**: React 18.2.0
- **UI Framework**: Bootstrap 5.2.3 + React Bootstrap 2.7.2
- **Routing**: React Router DOM 6.8.0
- **Icons**: React Icons 4.8.0
- **Charts**: Chart.js 4.2.1 + React Chart.js 2 5.2.0

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project files**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

### Demo Credentials
- **Username**: Any username will work
- **Password**: Any password will work
- **Role**: Choose between "User" or "Project Manager"

## Project Structure

```
src/
├── components/
│   ├── Login.js              # Authentication page
│   ├── Layout.js             # Main layout with sidebar
│   ├── Dashboard.js          # Dashboard with stats
│   ├── ProjectList.js        # Project management
│   ├── ModuleList.js         # Module management
│   ├── TaskBoard.js          # Kanban task board
│   ├── InvoiceList.js        # Invoice management
│   ├── TallySync.js          # Tally ERP integration
│   └── Reports.js            # Analytics and reports
├── App.js                    # Main app component with routing
├── index.js                  # React entry point
└── index.css                 # Global styles
```

## Key Features Explained

### Role-Based Access
- **User Role**: Basic access to view projects and tasks
- **Project Manager Role**: Full access to create, edit, and manage all aspects

### Responsive Design
- Mobile-friendly interface
- Bootstrap grid system for responsive layouts
- Touch-friendly interactions

### Interactive Elements
- **Modals**: For forms and detailed views
- **Dropdowns**: For actions and navigation
- **Progress Bars**: Visual progress indicators
- **Badges**: Status indicators with color coding

### Data Management
- **Local State**: All data is managed in React state (for demo purposes)
- **Form Validation**: Client-side validation for all forms
- **Real-time Updates**: Immediate UI updates on data changes

## Customization

### Styling
- Modify `src/index.css` for global styles
- Bootstrap classes for component styling
- Custom CSS classes for specific components

### Data
- Update mock data in component state
- Add new fields to forms and tables
- Modify validation rules

### Features
- Add new pages by creating components and updating routing
- Extend existing functionality with additional features
- Integrate with real backend APIs

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your GitHub repository
- **AWS S3**: Upload the `build` folder
- **Traditional Hosting**: Upload files to your web server

## Future Enhancements

- **Backend Integration**: Connect to real APIs
- **Database**: Implement persistent data storage
- **Real-time Updates**: WebSocket integration
- **Advanced Charts**: More sophisticated data visualization
- **Mobile App**: React Native version
- **Multi-language**: Internationalization support
- **Advanced Permissions**: Granular role-based access control

## Support

This is a mockup/demo application. For production use, you would need to:
1. Implement proper backend APIs
2. Add real authentication and authorization
3. Set up a database
4. Add proper error handling
5. Implement security measures
6. Add comprehensive testing

## License

This project is created for demonstration purposes. Feel free to use and modify as needed for your projects. 