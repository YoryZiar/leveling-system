# leveling-system (Shadow Monarch Fitness System)

A web application inspired by the webtoon/anime **"Solo Leveling"**, designed to gamify your daily home workouts. Complete quests, raise your stats, avoid penalties, unlock skills, and compete in the global hunter rankings.

Built with **Nuxt 3**, **Tailwind CSS**, and **Firebase / Firestore**.

## 🌟 Features

### 1. Daily Quests (Dynamic 28 Workout Pool)
* **Randomized Quests**: Every day, the system selects 4 random workouts from a pool of 28 unique home exercises.
* **Rank-based Scaling**: The target reps or duration scale dynamically based on your current Hunter Rank (from E-Rank at 1.0x up to S-Rank at 5.0x).
* **Realistic Rewards**: Rewards (EXP and Gold) are randomized per quest to keep progression engaging and dynamic.
* **Exercise Unit Separation**: The app handles exercises tracked by counts (reps) and time (seconds) with intuitive user guides.

### 2. Penalty Zone (Midnight Execution)
* **Midnight Countdown**: A real-time timer counts down to local midnight (00:00).
* **EXP Deduction**: If you fail to complete all 4 quests before midnight, the system triggers a penalty.
* **Randomized Penalty**: Between **25% and 80%** of your total EXP is lost (you will not level down below your current level, base capped at 0 EXP).
* **Penalty Screen**: A red alert overlay forces you to "Accept Defeat" (*Akui Kekalahan*) to resume your hunter path.

### 3. Dynamic Physical Stats
* **Workout-to-Stat Progression**: Stats (STR, VIT, AGI, PER) grow automatically based on the specific exercises you complete (e.g., Push-ups increase STR, Planks increase VIT).
* **Precision Tracking**: Stats are stored and displayed up to one decimal place for granular progression.
* **Fair Play Mode**: Manual stat point allocations and level-up bonus stat points are removed; you only grow by doing the actual work.

### 4. Shadow Skills Room
* **Unlockable Skills**: Dynamic Active and Passive skills fetched from Firestore.
* **Level Constraints**: Skills below your level requirement are locked, greyed out, and display "PERSYARATAN BELUM TERPENUHI".

### 5. Global Leaderboard (Rankings)
* **Real-time Leaderboard**: A Firestore-based global rank leaderboard displaying hunters sorted by EXP.
* **Shadow Seeding**: Automatic injection of top-tier shadow hunters (like Liu Zhigang, Thomas Andre, etc.) to keep the rankings populated and competitive.
* **Personal Highlight**: Your card is prominently highlighted with a "**YOU**" badge showing your relative standing.

---

## 🛠️ Technology Stack

* **Frontend Framework**: [Nuxt 3](https://nuxt.com/) (Vue 3)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Database & Authentication**: [Firebase & Firestore](https://firebase.google.com/)
* **Charts & Analytics**: [Chart.js](https://www.chartjs.org/)
* **Package Manager**: `pnpm`

---

## 🚀 Getting Started

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+) and [pnpm](https://pnpm.io/) installed.

### 2. Setup environment variables
Create a `.env` file in the root directory and add your Firebase credentials:
```env
NUXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NUXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NUXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Install Dependencies
```bash
pnpm install
```

### 4. Run Development Server
Start the development server on `http://localhost:3000`:
```bash
pnpm dev
```

### 5. Build for Production
Generate the production bundle:
```bash
pnpm build
# or static generate
pnpm generate
```

---

## 📁 Directory Structure

```
leveling-system/
├── assets/             # Global stylesheets and assets
├── components/         # Reusable Vue components (QuestCard, BottomNavBar, TopAppBar)
├── composables/        # Core state manager (useHunterState.js)
├── layouts/            # Page layouts
├── middleware/         # Auth guarding middleware
├── pages/              # Main app pages (Status, Login, Quests, Rank, Skills)
├── plugins/            # Firebase initialization client plugin
├── utils/              # Quest pools and helper utilities
├── .gitignore          # Git exclusion rules
└── .antigravityignore   # Agent search exclusion rules
```

---

## 📝 License
This project is private and for personal workout gamification purposes.
