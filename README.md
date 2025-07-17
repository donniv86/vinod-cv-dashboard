# Dr. Vinod Devaraji - CV Dashboard

A modern, interactive CV dashboard showcasing Dr. Vinod Devaraji's professional profile, research achievements, and technical expertise in Computational Drug Discovery.

![CV Dashboard Preview](./banner.png)

## 🎯 Overview

This is a personalized professional portfolio dashboard built with **Vue.js 3** and **Tailwind CSS**, featuring:

- **Interactive CV/Resume** with modern UI design
- **Research Publications** showcase (31 papers, 1,247+ citations)
- **GitHub Projects** portfolio (10 repositories)
- **Professional Certifications** (21 courses)
- **Technical Skills** visualization
- **Professional Analytics** and metrics

## 🚀 Quick Start Guide

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18.x or later** (recommended: Node.js 20.x+)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)

### Step 1: Check Node.js Version

```bash
node --version
npm --version
```

**Expected output:** Node.js v18+ and npm v8+

### Step 2: Clone/Download the Project

If you haven't already downloaded the project:

```bash
# Option 1: If you have the project files locally
cd /path/to/Vinod_CV_Dashboard

# Option 2: If cloning from repository
git clone <repository-url>
cd Vinod_CV_Dashboard
```

### Step 3: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Vue.js 3
- Tailwind CSS 4
- ApexCharts
- Vue Router
- TypeScript dependencies

### Step 4: Start Development Server

```bash
npm run dev
```

**Expected output:**
```
  VITE v6.0.11  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### Step 5: Access the Dashboard

Open your web browser and navigate to:
```
http://localhost:5173/
```

You should see Dr. Vinod's CV Dashboard with a modern, gradient-based design.

## 📁 Project Structure

```
Vinod_CV_Dashboard/
├── src/
│   ├── components/
│   │   ├── cv/                 # CV-specific components
│   │   ├── layout/             # Layout components
│   │   └── ui/                 # Reusable UI components
│   ├── views/
│   │   ├── CVDashboard.vue     # Main CV dashboard
│   │   ├── Publications.vue    # Publications page
│   │   ├── GitHubProjects.vue  # GitHub projects
│   │   ├── Certifications.vue  # Certifications
│   │   └── About.vue          # About page
│   ├── router/
│   │   └── index.ts           # Vue Router configuration
│   └── main.ts                # App entry point
├── data/
│   ├── publications.bib       # Publications data
│   └── vinod.png             # Profile image
├── public/
│   └── images/               # Static images
└── package.json              # Dependencies and scripts
```

## 🛠 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## 🎨 Features

### 📊 Professional Metrics
- **31 Publications** with 1,247+ citations
- **H-Index of 16**
- **13+ Years** of experience
- **6 CADD Modalities** expertise

### 🔬 Technical Expertise
- **CADD Modalities**: Small Molecule, Peptide, Organometallic, Macrocycle, PROTAC, Antibody Drug Conjugate
- **Computational Techniques**: AI/Deep Learning, Large Language Models, Cheminformatics, Quantum Mechanics
- **Therapeutic Areas**: Oncology, Cardiovascular, Genotoxicity/DNA Therapy, Signal Transduction

### 📱 Dashboard Sections
1. **Research Publications** - Browse 31 peer-reviewed papers
2. **GitHub Projects** - Explore 10 technical repositories
3. **Certifications** - View 21 professional courses
4. **About Me** - Professional background and contact info

## 🎯 Professional Profile

**Dr. Vinod Devaraji**
- **Position**: Senior Scientist at Schrödinger
- **Specialization**: Computational Drug Discovery
- **Expertise**: AI/ML, Molecular Modeling, CADD
- **Experience**: 13+ years in pharmaceutical research

## 🔧 Customization

### Updating Personal Information

1. **Profile Data**: Edit `src/views/CVDashboard.vue` to update:
   - Name and title
   - Professional metrics
   - Skills and expertise
   - Contact information

2. **Publications**: Update `data/publications.bib` with new publications

3. **Profile Image**: Replace `data/vinod.png` with your photo

4. **Brand Logo**: To update the dashboard's branding, replace the logo SVG files located at `public/images/logo/vinod-cv-logo.svg` and `public/images/logo/vinod-cv-logo-dark.svg` with your own logo designs. These files are used throughout the application for light and dark themes, respectively.

### Styling Changes

- **Colors**: Modify gradient values in the Vue components
- **Layout**: Adjust Tailwind CSS classes
- **Components**: Edit individual component files in `src/components/cv/`

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized files.

### Deploy Options

1. **Netlify**: Drag and drop the `dist/` folder
2. **Vercel**: Connect your repository
3. **GitHub Pages**: Use GitHub Actions
4. **Traditional Hosting**: Upload `dist/` contents to your server

## 🐛 Troubleshooting

### Common Issues

**1. Port Already in Use**
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
# Or use a different port
npm run dev -- --port 3000
```

**2. Node Modules Issues**
```bash
# Clear npm cache
npm cache clean --force
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**3. TypeScript Errors**
```bash
# Run type checking
npm run type-check
# Fix linting issues
npm run lint
```

### Performance Optimization

- The dashboard uses **Vite** for fast development
- **Tailwind CSS 4** for optimized styling
- **Vue 3** with Composition API for better performance

## 📞 Support

For technical issues or customization help:
- Check the [Vue.js documentation](https://vuejs.org/)
- Review [Tailwind CSS docs](https://tailwindcss.com/)
- Open an issue in the project repository

## 📄 License

This project is based on TailAdmin Vue template and customized for Dr. Vinod Devaraji's professional portfolio.

---

**Built with ❤️ using Vue.js 3, Tailwind CSS, and modern web technologies**
