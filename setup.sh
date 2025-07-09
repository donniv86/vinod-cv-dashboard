#!/bin/bash

# Dr. Vinod's CV Dashboard - Setup Script
# This script automates the setup process for the CV Dashboard

echo "🚀 Setting up Dr. Vinod's CV Dashboard..."
echo "=========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18.x or later."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version is too old. Please upgrade to Node.js 18.x or later."
    echo "   Current version: $(node --version)"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ npm version: $(npm --version)"

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please run this script from the project root directory."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies. Please check your internet connection and try again."
    exit 1
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "To start the dashboard, run:"
echo "   npm run dev"
echo ""
echo "Then open your browser to: http://localhost:5173/"
echo ""
echo "📚 For more information, check:"
echo "   - README.md (detailed documentation)"
echo "   - QUICK_START.md (quick reference)"
echo ""
echo "Happy coding! 🚀"