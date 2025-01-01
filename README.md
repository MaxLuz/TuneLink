# TuneLink 🎵

TuneLink is a music-sharing platform that connects friends through their listening habits. Users can link their Spotify accounts to their TuneLink profiles to see and share top tracks, favorite artists, and listening trends.

## Features

- User authentication with a secure login system.
- Spotify account integration for personalized music data.
- Dashboard to view top tracks, favorite artists, and listening history.
- Add friends and explore their music tastes.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js
- npm or yarn
- MongoDB

### Installation

Clone the repository:

```bash
git clone https://github.com/your-username/tunelink.git
```

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Navigate to the frontend directory:

```bash
cd frontend
```

Install frontend dependencies:

```bash
npm install
```

Create a .env file in the backend folder with the following variables:

```
PORT=your_port_number
MONGO_URI=your_mongodb_connection_string
SECRET=your_jwt_secret_key
SPOTIFY_REDIRECT_URI=your_spotify_redirect_uri
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
FRONTEND_URL=your_frontend_url
```

### Start the Development Servers

Navigate to the backend directory and start the backend server:

```bash
cd backend
npm run dev
```

Navigate to the frontend directory and start the frontend server:

```bash
cd frontend
npm start
```

## Usage

- Sign up or log in to your account.
- Link your Spotify account to your TuneLink profile.
- Explore your top tracks, favorite artists, and listening history.
- Add friends and see their music tastes.
- Share your music discoveries with your friends.

## Images

TuneLink support desktop and mobile devices:

![TuneLink Dashboard](/frontend/public/readme-images/dashboard.png)
![TuneLink Friends](/frontend/public/readme-images/friends.png)
![TuneLink Inbox](/frontend/public/readme-images/inbox.png)
![TuneLink Mobile Dashboard](/frontend/public/readme-images/mobile-dashboard.png)
![TuneLink Mobile Friends](/frontend/public/readme-images/friends-mobile.png)
![TuneLink Mobile Inbox](/frontend/public/readme-images/inbox-mobile.png)
