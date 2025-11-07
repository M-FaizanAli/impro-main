# Impro UK Marine Service - TypeScript & Tailwind CSS

A modern frontend project for Impro UK Marine Service built with TypeScript, Tailwind CSS, and Vite.

## 🚀 Deployment on Vercel

This project is optimized for **Vercel deployment**.

### Deploy to Vercel (Recommended)

1. **Quick Deploy**:
   - Push your code to GitHub
   - Visit [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Vercel auto-detects Vite - click "Deploy"!

2. **Deploy via CLI**:
   ```bash
   npm install -g vercel
   vercel
   ```

### Vercel Configuration

The project includes `vercel.json` with:
- ✅ SPA routing fallback
- ✅ Asset caching (1 year for images/CSS/JS)
- ✅ Build command: `npm run build`
- ✅ Output directory: `dist`

## 🛠️ Local Development

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

**Quick Install:**
```bash
npm install
npm run dev
```

**Alternative:** If issues persist, install dependencies one at a time:
```bash
npm install vite --save-dev
npm install typescript --save-dev
npm install tailwindcss postcss autoprefixer --save-dev
npm install @types/node --save-dev
```

### Build Commands

Development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

Type checking:
```bash
npm run type-check
```

## 📁 Project Structure

```
impro-main/
├── src/
│   ├── components/          # TypeScript components
│   │   ├── Header.ts
│   │   ├── FAQAccordion.ts
│   │   └── OffersSlider.ts
│   ├── types/              # TypeScript type definitions
│   │   └── header.ts
│   ├── utils/              # Utility functions
│   │   └── helpers.ts
│   ├── main.ts             # Main entry point
│   └── styles.css          # Tailwind CSS entry
├── assets/                 # Static assets (legacy CSS/JS)
│   ├── css/
│   └── js/
├── includes/               # PHP includes (legacy)
│   ├── header.php
│   └── footer.php
├── index.php               # Main HTML file
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── package.json
```

## 🛠️ Technologies

- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **PostCSS** - CSS transformation
- **Font Awesome** - Icon library
- **Google Fonts (Poppins)** - Typography

## 🎨 Design System

The project uses a custom color palette defined in `tailwind.config.js`:

- **Primary Orange**: `#ff7b00`
- **Dark Blue**: `#00334d`
- **Medium Blue**: `#005f73`
- **Light Blue**: `#0ea5e9`

## 📦 Components

### Header
Mobile-responsive navigation with hamburger menu, social links, and dropdown support.

### FAQ Accordion
Expandable FAQ section with smooth animations.

### Offers Slider
Touch-enabled carousel for service offerings.

### Utilities
- **ScrollSpy**: Active navigation highlighting
- **SmoothScroll**: Smooth anchor link scrolling
- **CookieConsent**: GDPR-compliant cookie management

## 🔧 Development

### Type Checking
```bash
npm run type-check
```

### Build
```bash
npm run build
```

The build output will be in the `dist/` folder.

## 📝 Notes

- The project currently maintains both legacy CSS (`assets/css/styles.css`) and Tailwind CSS for gradual migration
- PHP includes are kept for backwards compatibility but can be converted to static HTML
- All TypeScript components follow strict type checking

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

© 2025 Impro Solutions UK Ltd. All rights reserved.

## 🤝 Contact

For inquiries about marine services, shipyard partnerships, or technical support, visit our website or contact us through the channels listed in the Contact section.
