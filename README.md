# **Propello**

## 🔗 Links
Access front-end: https://propello.netlify.app/

## 📜 Description
Service providing small businesses with affordable software development offered by university students looking to gain experience.

## ✨ Features
- Browse, search, and rate service listings
- Create, edit, and delete your own listings
- Send and manage project requests (accept / reject / complete)
- Real-time chat for every collaboration
- Task tracking with deliverable link handoff
- PayPal checkout for completed work
- Ratings & reviews with average scores on listings and profiles
- Toast notifications, 404 page, and responsive landing page

## 💻 Development
Created using **React** (Create React App), **Firebase** (Authentication + Cloud Firestore), **PayPal** (React SDK), and **Bootstrap 4**.
Hosted on **Netlify**.

## 🔨 Tools

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the project root with your Firebase and PayPal credentials:
   ```env
   REACT_APP_FIREBASE_API_KEY=
   REACT_APP_FIREBASE_AUTH_DOMAIN=
   REACT_APP_FIREBASE_PROJECT_ID=
   REACT_APP_FIREBASE_STORAGE_BUCKET=
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
   REACT_APP_FIREBASE_APP_ID=
   REACT_APP_FIREBASE_MEASUREMENT_ID=
   REACT_APP_PAYPAL_CLIENT=
   ```
   (`.env` is gitignored — set the same variables in your Netlify site settings. Only `REACT_APP_PAYPAL_CLIENT` is needed for checkout.)

3. Run locally:
   ```bash
   npm start
   ```

4. Build for production:
   ```bash
   npm run build
   ```
   Output goes to `build/`.

## ☁️ Deploying to Netlify
- Connect the repo to Netlify (build command `npm run build`, publish directory `build`), or drag-and-drop the `build/` folder into the Netlify dashboard.
- `public/_redirects` is included, so client-side routes (e.g. `/profile`, `/tasks`) work on refresh and deep links.
- Set the same environment variables from step 2 in Netlify → Site settings → Environment.

## 🔐 Firestore Security Rules
Security rules live in `firestore.rules`. Deploy them when you change them:
```bash
firebase deploy --only firestore:rules
```
(or paste the contents into Firebase Console → Firestore → Rules)