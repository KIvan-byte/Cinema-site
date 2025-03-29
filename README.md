# Cinema Ticket Sales System

A full-stack web application for online cinema ticket sales with comprehensive user and administration functionality.

## 🎬 Overview

This platform allows customers to browse available movies, select showtimes, reserve seats, and complete ticket purchases online. Admins can manage movie listings, configure theater halls, and view detailed sales analytics.

## ✨ Features

### Customer Features
- Browse current and upcoming movie listings
- View movie details, showtimes, and theater information
- Select up to 5 seats per booking
- Secure checkout process
- Download PDF tickets after purchase
- View booking history and ticket status

### Admin Features
- Comprehensive dashboard with sales analytics
- Movie management (add, edit, delete)
- Showtime scheduling system
- Theater hall configuration
- Ticket sales reporting

## 🛠️ Technology Stack

### Backend
- **Python 3.10+** with **FastAPI** framework
- **SQLite** database for data storage
- **JWT** authentication for secure access
- **ReportLab** and **QRCode** for PDF ticket generation

### Frontend
- **React 18** with hooks and functional components
- **React Router 6** for navigation
- **Tailwind CSS** for responsive styling
- **Axios** for API integration

## 🚀 Getting Started

### Prerequisites
- Python 3.10 or higher
- Node.js 14 or higher
- npm/yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv cinema
   ```

3. Activate the virtual environment:
   - Windows: `cinema\Scripts\activate`
   - macOS/Linux: `source cinema/bin/activate`

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit the .env file with your settings
   ```

6. Run the development server:
   ```bash
   uvicorn main:app --reload
   ```

7. The API will be available at `http://localhost:8000`
   - Interactive API documentation: `http://localhost:8000/docs`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. The application will be available at `http://localhost:3000`

### Database Seeding

For testing purposes, you can populate the database with sample data:

```bash
cd backend
python seed.py
```

This creates:
- Admin user: username `admin`, password `admin123`
- Regular user: username `user`, password `user123`
- Sample movies, halls, and showtimes

## 📁 Project Structure
