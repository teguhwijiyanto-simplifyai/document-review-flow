
# Legal Contract Reviewer

A fully responsive, mobile-first Legal Contract Reviewer web application with AI-powered document analysis and amendment suggestions.

## Features

### Authentication & User Management
- Email-based login with Supabase authentication
- User role management (Admin, Editor, Viewer)
- Theme toggle (light/dark mode)
- Secure logout functionality

### Contract Analysis
- Document upload via drag-and-drop interface
- Support for multiple file formats (PDF, DOC, DOCX, TXT)
- Multi-language support (English, Indonesian)
- AI-powered contract review with streaming responses
- Compliance assessment with detailed justifications

### Review Dashboard
- Visual compliance overview with percentage breakdowns
- Expandable/collapsible assessment cards
- Advanced filtering by compliance status
- Interactive amendment recommendations

### Document Editing
- Side-by-side document editing interface
- Real-time synchronization between original and amended text
- Rich text editor with formatting options
- Bilingual document support
- Export to Word functionality

### Responsive Design
- Mobile-first approach
- Fully responsive across all screen sizes
- Optimized touch interactions
- Accessible design patterns

## Technology Stack

- **Frontend**: React.js with TypeScript
- **Styling**: TailwindCSS
- **UI Components**: ShadCN UI
- **Rich Text Editor**: Custom implementation with formatting tools
- **File Upload**: React Dropzone
- **Authentication**: Supabase Auth
- **State Management**: React Context API
- **Build Tool**: Vite
- **Routing**: React Router DOM

## Local Installation

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** - [Download here](https://git-scm.com/)

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd legal-contract-reviewer
```

### Step 2: Install Dependencies

Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

### Step 3: Environment Setup

Create a `.env` file in the root directory and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_SERVICE_KEY=your_supabase_service_key
```

**Note**: Replace the placeholder values with your actual Supabase project credentials.

### Step 4: Start the Development Server

Using npm:
```bash
npm run dev
```

Or using yarn:
```bash
yarn dev
```

The application will be available at `http://localhost:8080`

### Step 5: Build for Production

To create a production build:

Using npm:
```bash
npm run build
```

Or using yarn:
```bash
yarn build
```

### Step 6: Preview Production Build

To preview the production build locally:

Using npm:
```bash
npm run preview
```

Or using yarn:
```bash
yarn preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # ShadCN UI components
│   ├── LoginForm.tsx   # Authentication form
│   ├── Sidebar.tsx     # Navigation sidebar
│   ├── ContractUpload.tsx
│   ├── StreamingResponse.tsx
│   ├── ContractReviewDashboard.tsx
│   ├── ComplianceCard.tsx
│   ├── EditDocumentModal.tsx
│   ├── PreviewDocumentModal.tsx
│   ├── RichTextEditor.tsx
│   └── MainLayout.tsx
├── contexts/           # React context providers
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── types/             # TypeScript type definitions
├── pages/             # Page components
├── hooks/             # Custom React hooks
└── lib/               # Utility functions
```

## Key Features Implementation

### Authentication Flow
1. Users login with email/password
2. Supabase authentication validates credentials
3. User metadata determines role (Admin/Editor/Viewer)
4. Protected routes ensure authorized access

### Contract Review Process
1. **Upload**: Users upload contracts with language/positioning settings
2. **Analysis**: AI processes document with streaming feedback
3. **Dashboard**: Visual compliance overview with detailed breakdowns
4. **Editing**: Side-by-side interface for amendments
5. **Preview**: Rich text editor with export capabilities

### Responsive Design
- Mobile-first CSS with Tailwind
- Flexible grid layouts
- Touch-optimized interactions
- Adaptive sidebar navigation

## API Integrations

### Planned Integrations
- **Supabase**: Authentication and data storage
- **Flowise**: AI document analysis
- **Pinecone**: Regulations vector database
- **Translation API**: Multi-language support

### Current Implementation
The current version includes mock implementations for all API calls, providing a fully functional UI that can be easily connected to real services.

## Development Guidelines

### Code Style
- TypeScript for type safety
- Functional components with hooks
- Consistent naming conventions
- Comprehensive error handling

### Component Structure
- Reusable, composable components
- Clear prop interfaces
- Proper state management
- Accessibility considerations

### Testing
```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

## Deployment

The application can be deployed to any static hosting service:

### Vercel
```bash
npm run build
# Deploy dist folder to Vercel
```

### Netlify
```bash
npm run build
# Deploy dist folder to Netlify
```

### Custom Server
```bash
npm run build
# Serve dist folder with any web server
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Contact the development team

---

**Note**: This application requires Supabase integration for full functionality. Make sure to set up your Supabase project and configure the environment variables before deployment.
