# Premium Developer Portfolio

A highly interactive, visually stunning, and modern developer portfolio built for **Arghya Bhattacharjee** (MERN Stack Developer, Full Stack Developer, AI & IoT Enthusiast, and Patent Holder).

This project showcases professional experiences, milestones, technical projects, certifications, and allows users to interactively leave reviews.

## 🚀 Key Features

- **Interactive Terminal UI**: A command-line terminal simulation to interact with the portfolio, run custom queries, and trigger direct CV downloads.
- **Dynamic Orbital Loading Animations**: Space-inspired rotating glowing gradient rings that orbit the profile picture card with dynamic loading speeds.
- **Flipping Profile Card**: A 3D hover/click-flipping round profile card displaying the professional profile on the front and a custom avatar on the back.
- **Cosmic Depth Design**: Cosmic grid overlays with radial glows, elegant typography, light/dark theme switching, and smooth custom scrollbars.
- **Smooth Scroll Integration**: Uses Lenis for premium, buttery-smooth kinetic scroll transitions.
- **Interactive Review System**: Connected to a node server with MongoDB backend allowing clients to read, write, and rate services with real-time feedback.
- **Responsive Layout**: Designed responsively for desktops, tablets, and mobile screens.

## 🛠️ Technology Stack

### Frontend
- **Framework**: React (v19)
- **Bundler**: Vite (v8)
- **Styling**: Tailwind CSS (v4) with custom radial gradient glows and custom animation keyframes
- **Animation**: Framer Motion (v12) & GSAP
- **Icons**: React Icons (Fa, etc.)
- **Smooth Scroll**: Lenis

### Backend & Database (Reviews System)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Environment Management**: dotenv
- **Cross-Origin Requests**: cors

---

## 💻 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Arghya876/New-Portfolio.git
   cd New-Portfolio
   ```

2. **Install frontend dependencies**:
   ```bash
   npm install
   ```

3. **Install server dependencies**:
   ```bash
   cd server
   ```
   Create a `.env` file inside the `server/` directory and configure the environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```
   Install packages:
   ```bash
   npm install
   cd ..
   ```

### Running Locally

1. **Start the Frontend Development Server**:
   ```bash
   npm run dev
   ```
   By default, this will run the app at `http://localhost:5173`.

2. **Start the Express Review Server**:
   ```bash
   cd server
   node server.js
   ```
   By default, this will start the backend server at `http://localhost:5000`.

### Building for Production
To bundle the frontend application for production:
```bash
npm run build
```
The output files will be compiled into the `dist/` directory, ready to be served.

---

## 📁 Repository Structure

```text
├── public/                 # Static assets (images, PDFs, SVGs)
│   ├── images/             # Profile pictures, badges, and project screenshots
│   └── resume.pdf          # Professional Resume
├── src/                    # React Source Files
│   ├── components/         # Modular layout sections (Hero, Journey, Skills, Projects, Achievements, Reviews, ContactTerminal, Navbar)
│   ├── App.jsx             # Root layout and scroll initialization
│   ├── main.jsx            # React root mount entrypoint
│   └── index.css           # Global custom scrollbars, animations, and Tailwind imports
├── server/                 # Express backend review system
│   ├── server.js           # Server routes, database models, and initialization logic
│   └── package.json        # Backend dependencies
├── tailwind.config.js      # Tailwind customization configuration
├── vite.config.js          # Vite plugins and configurations
└── package.json            # Frontend script commands and dependencies
```

---

## 📜 License
This project is for display and portfolio purposes. All rights reserved © 2026 Arghya Bhattacharjee.
