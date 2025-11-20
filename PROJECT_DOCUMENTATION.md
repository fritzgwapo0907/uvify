# UVify - UV Monitoring System
## Complete Project Documentation

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Features](#features)
5. [Installation & Setup](#installation--setup)
6. [Usage Guide](#usage-guide)
7. [Authentication](#authentication)
8. [Components](#components)
9. [Internationalization (i18n)](#internationalization-i18n)
10. [Deployment](#deployment)
11. [Troubleshooting](#troubleshooting)
12. [Team](#team)

---

## Project Overview

**UVify** is a modern UV monitoring system that helps users track and protect themselves from harmful UV radiation. The application provides real-time UV monitoring, safety alerts, historical data tracking, and multi-user support.

### Mission
To empower individuals with real-time UV monitoring and safety insights, making sun protection accessible and effortless for everyone.

### Core Values
- **Innovation**: Cutting-edge technology for UV detection and analysis
- **Health**: Prioritizing user wellness and skin protection
- **Accessibility**: Making UV monitoring available to everyone
- **Reliability**: Dependable, accurate, and consistent service

---

## Technology Stack

### Frontend
- **Framework**: React 18+ with Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM v6
- **State Management**: React Context API
- **Language Support**: Custom i18n implementation (English, Tagalog, Ilocano)
- **Package Manager**: pnpm

### Backend
- **Server**: Render.com (https://uvify-backend.onrender.com)
- **API**: RESTful endpoints for authentication and data

### Build Tools
- **Build**: Vite v5.4.0
- **Vite React Plugin**: v4.3.2
- **Node.js**: v22.21.1+

---

## Project Structure

\`\`\`
uvifymain/
├── src/
│   ├── pages/
│   │   ├── LandingPage.jsx        # Home page with About Us & Login Modal
│   │   ├── Dashboard.jsx          # Main user dashboard
│   │   ├── Settings.jsx           # User settings (theme, language)
│   │   ├── Profile.jsx            # User profile management
│   │   ├── Login.jsx              # Legacy login page (redirects to LandingPage)
│   │   ├── About.jsx              # About page (integrated into LandingPage)
│   │   ├── NotFound.jsx           # 404 page
│   │   └── ...
│   ├── components/
│   │   ├── Sidebar.jsx            # Navigation sidebar
│   │   ├── Header.jsx             # App header
│   │   └── ...
│   ├── contexts/
│   │   ├── LanguageContext.jsx    # Language/i18n context
│   │   ├── ThemeContext.jsx       # Dark mode context
│   │   └── ...
│   ├── i18n/
│   │   └── translations.js        # i18n translations (EN, TL, IL)
│   ├── main.jsx                   # React Router setup
│   ├── App.jsx                    # Main app component
│   └── index.css                  # Global styles
├── public/
│   ├── cath.jpg                   # Team member photos
│   ├── flix.jpg
│   ├── ilad.png
│   ├── lheng.jpg
│   └── ...
├── package.json                   # Dependencies & scripts
├── vite.config.js                 # Vite configuration
├── tsconfig.json                  # TypeScript config
└── vercel.json                    # Vercel deployment config
\`\`\`

---

## Features

### 1. Real-Time UV Monitoring
- Live UV index tracking
- Location-based UV data
- Continuous monitoring capabilities

### 2. Safety Alerts
- Automatic alerts when UV index reaches dangerous levels
- Customizable alert thresholds
- Push notifications support

### 3. Historical Data
- Track UV exposure over time
- View detailed historical records
- Data visualization and charts
- Export capabilities

### 4. Multi-User Support
- Multiple user profiles
- Individual settings and preferences
- Shared device management
- User authentication and authorization

### 5. Dark Mode
- Full dark mode support
- Theme persistence
- Seamless theme switching

### 6. Multi-Language Support
- English
- Tagalog (Filipino)
- Ilocano
- Easy language switching from Settings

---

## Installation & Setup

### Prerequisites
- Node.js v22.21.1 or higher
- pnpm package manager (recommended) or npm

### Step 1: Install Dependencies
\`\`\`bash
pnpm install
# or
npm install
\`\`\`

### Step 2: Environment Variables
Create a `.env.local` file in the root directory (if needed for backend communication):
\`\`\`
VITE_BACKEND_URL=https://uvify-backend.onrender.com
\`\`\`

### Step 3: Run Development Server
\`\`\`bash
pnpm run dev
# or
npm run dev
\`\`\`

The app will be available at `http://localhost:5173`

### Step 4: Build for Production
\`\`\`bash
pnpm run build
# or
npm run build
\`\`\`

---

## Usage Guide

### Landing Page (Home)
- **Entry Point**: First page users see
- **Contains**: About Us information, team details, core values, and impact stats
- **Login**: Click "Login" button in navbar to open modal
- **Responsive**: Fully mobile-friendly design

### Authentication
1. Users click "Login" button on navbar
2. Modal popup appears with email/password fields
3. Enter credentials and click "Login"
4. Optional: Check "Remember me" to save credentials
5. On success, redirected to Dashboard

### Dashboard
- Central hub for UV monitoring
- Real-time UV data display
- Quick access to settings
- User profile management

### Settings Page
- **Theme Toggle**: Switch between Light and Dark modes
- **Language Selector**: Choose between English, Tagalog, and Ilocano
- **Preferences**: Customize alert settings, notification preferences
- **Settings persist** using browser storage

### Profile Page
- View and edit user information
- Manage account details
- Change password
- Account security settings

---

## Authentication

### Login Flow
\`\`\`
User Input → Backend API Call → Token Storage → Dashboard Redirect
\`\`\`

### Backend API Endpoint
**POST** `/auth/login`
\`\`\`json
Request Body:
{
  "email": "user@example.com",
  "password": "password123"
}

Response (Success):
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name"
  }
}

Response (Error):
{
  "success": false,
  "message": "Invalid credentials"
}
\`\`\`

### Cookie Management
- **Remember Me**: Saves email/password in cookies for 30 days
- **Security**: Use HTTPS in production for sensitive data
- **Session**: Auth context maintains user session

---

## Components

### LandingPage.jsx
**Location**: `src/pages/LandingPage.jsx`

**Features**:
- Navigation header with UVify branding
- Hero section with call-to-action
- Features grid (Real-time, Alerts, Data, Multi-user)
- Mission statement section
- Core values cards
- Team member showcase (2x2 grid)
- Impact statistics
- Join CTA section
- Login modal (single entry point)
- Footer with copyright

**States**:
- `showLoginModal`: Controls modal visibility
- `formData`: Email & password input
- `isLoading`: Login button loading state
- `error`: Error message display
- `rememberMe`: Cookie persistence toggle

### Login Modal
**Features**:
- Clean, centered design
- Email & password input fields
- Show/Hide password toggle
- "Remember me" checkbox
- Error message display
- Loading state on submit button
- Smooth animations

---

## Internationalization (i18n)

### Language Context
**File**: `src/contexts/LanguageContext.jsx`

### Supported Languages
1. **English** (en)
2. **Tagalog** (tl)
3. **Ilocano** (il)

### Usage in Components
\`\`\`jsx
import { useLanguage } from '../contexts/LanguageContext'

export default function MyComponent() {
  const { t, language, setLanguage } = useLanguage()
  
  return <h1>{t('common.welcome')}</h1>
}
\`\`\`

### Translation Keys
Common keys used throughout the app:
\`\`\`
common.uvify
login.loginButton
login.email
login.password
login.title
login.subtitle
about.title
about.subtitle
about.ourMission
about.ourTeam
about.joinUs
\`\`\`

### Adding New Translations
1. Open `src/i18n/translations.js`
2. Add key to each language object
3. Use `t('key')` in components

---

## Deployment

### Deploy to Vercel (Recommended)

#### Method 1: GitHub Integration
1. Push code to GitHub repository
2. Connect repo to Vercel (https://vercel.com)
3. Select project settings:
   - **Framework**: Vite
   - **Build Command**: `pnpm run build`
   - **Output Directory**: `dist`
4. Deploy!

#### Method 2: Vercel CLI
\`\`\`bash
pnpm install -g vercel
vercel
\`\`\`

### Deploy to Other Platforms

**Netlify**:
\`\`\`bash
pnpm run build
# Deploy the 'dist' folder
\`\`\`

**AWS S3 + CloudFront**:
\`\`\`bash
pnpm run build
# Upload 'dist' folder to S3
\`\`\`

### Environment Variables
Set in deployment platform:
\`\`\`
VITE_BACKEND_URL=https://uvify-backend.onrender.com
\`\`\`

---

## Troubleshooting

### Build Errors

#### Error: "vite build failed"
**Solution**: 
- Clear node_modules: `rm -rf node_modules`
- Reinstall: `pnpm install`
- Rebuild: `pnpm run build`

#### Error: "http-proxy-3 compatibility"
**Solution**: Already fixed in package.json with Vite v5.4.0

### Runtime Errors

#### "Login button not working"
**Check**:
- Backend URL is correct in code
- Backend service is running
- Check browser console for errors

#### "Translations not loading"
**Check**:
- Language context is wrapped around app
- Translation keys exist in `i18n/translations.js`
- Language is set correctly in localStorage

#### "Dark mode not persisting"
**Check**:
- ThemeContext is properly implemented
- Browser localStorage is enabled
- Clear browser cache and reload

### Development Issues

#### Port 5173 already in use
\`\`\`bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
# or use different port
pnpm run dev -- --port 3000
\`\`\`

#### Hot Module Replacement (HMR) not working
- Ensure Vite dev server is running
- Check browser console for errors
- Hard refresh (Ctrl+Shift+R)

---

## Team

Meet the brilliant minds behind UVify:

| Name | Role | Description |
|------|------|-------------|
| **Fritz Gerald Tacanay** | Lead Developer | Frontend architecture and core features |
| **Rosselah Marie Bodaño** | Designer & Developer | UI/UX design and frontend implementation |
| **Cathrina Lapuz** | Backend Developer | API development and database management |
| **Flix Vixen Barbero** | QA Strategist | Quality assurance and testing |

---

## Additional Resources

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)

---

## License

© 2025 UVify. All rights reserved.

---

## Support

For issues or questions:
1. Check this documentation
2. Review troubleshooting section
3. Contact development team
4. Open an issue on GitHub

**Last Updated**: November 2025
**Version**: 1.0.0
