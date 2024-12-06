# PricePatrol 

PricePatrol is a web application that tracks product prices on Amazon and notifies users when prices drop. Built with modern web technologies, it offers a seamless experience for users to monitor their favorite products and make informed purchasing decisions.


## Features

Track Amazon product prices
User authentication and profile management
Email notifications for price drops
Responsive design for various devices
Automated price checking using cron jobs

## Tech Stack

Frontend: Next.js, TypeScript, HTML, CSS
Backend: Node.js, Next.js API routes
Database: MongoDB with Mongoose
Authentication: NextAuth.js
Styling: Tailwind CSS
Deployment: Vercel
Web Scraping: Bright Data
Design: Figma
Scheduling: Cron Jobs

## Getting Started

### Clone the repository:
git clone https://github.com/aaditn18/pricepatrol.git
cd pricepatrol

### Install dependencies:
npm install

### Set up environment variables:

Create a .env.local file in the root directory and add the following:

MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
BRIGHT_DATA_USERNAME=your_bright_data_username
BRIGHT_DATA_PASSWORD=your_bright_data_password

### Run the development server:
npm run dev
Open http://localhost:3000 in your browser to see the application.

### Deployment
The project is set up for easy deployment on Vercel. Connect your GitHub repository to Vercel and it will automatically deploy your main branch.
