# Meme Strem — Frontend

## Overview

Meme Stream is a next-gen meme-sharing platform that lets users create, share, and engage with memes while tracking their viral performance.

This frontend project implements a rich React-based user interface that covers meme creation, browsing, voting, commenting, user authentication, and personal dashboards.

---

## Tech Stack

* React
* Redux & Redux Toolkit
* TailwindCSS
* Axios
* Firebase (for authentication)
* React Router DOM
* Lucid React (UI components)

---

## Features Implemented

* **Meme Creation Studio**
  Users can create memes with multiple templates (default, gemini, self), add captions, and preview in real-time.

* **Meme Feed**
  Browse memes filtered by:

  * New
  * Top (last 24 hours)
  * Top (this week)
  * Top (all time)

* **User Dashboard**
  View, edit, and manage personal memes with stats.

* **Voting & Commenting**
  Upvote/downvote memes, comment with a 140-character limit.

* **Search & Hashtag Filtering**
  Search memes by hashtags or captions.

* **Authentication**
  Login and Signup powered by Firebase.

---

## Getting Started

### Prerequisites

* Node.js (v14 or above recommended)
* npm or yarn

### Installation

```bash
git clone <your-repo-url>
cd memehub-frontend
npm install
# or
yarn install
```

### Website link

[Meme-Stream](https://memestream.vercel.app/)

---

## Project Structure

```
src/
├── assets/
├── componenets/
│   ├── createMeme/
│   │   ├── Meme_Studio.jsx
│   │   ├── util/
│   │   │   ├── geminiApi.js
│   │   │   ├── RawData.js
│   │   ├── DashboardMemeCard.jsx
│   ├── components/
│   │   ├── LeftSideNav.jsx
│   │   ├── Login.jsx
│   │   ├── MainBody.jsx
│   │   ├── Memecard.jsx
│   │   ├── Navbar.jsx
│   │   ├── PrivateRoutes.jsx
│   │   ├── RightSideNav.jsx
├── firebase/
│   ├── firebase.js
│   ├── firebaseUtils.js
├── Pages/
│   ├── CreateMemePage.jsx
│   ├── DashboardPage.jsx
│   ├── FeedPage.jsx
```

---

## Future Improvements

* Display popular hashtags for easier browsing
* Personalized feed recommendations based on user interaction
* Scheduling meme posts for optimal engagement
* Content moderation dashboard (admin interface)

---

## Known Limitations

* Meme performance analytics visualization is minimal for now
* Some UI components may require responsiveness improvements
* Backend integration needs to support all interaction features fully

---