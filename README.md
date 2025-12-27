🏡 Airbnb Clone – Full Stack Web Application

A full-stack Airbnb Clone built using React, Vite, Firebase, and Tailwind CSS, featuring real-time bookings, experiences, services, mock payments, authentication, and an AI-powered chatbot.

This project focuses on real-world product flows, responsive UI, and scalable architecture.

🚀 Live Features
🏠 Listings & Bookings

Browse home listings

Select check-in / check-out dates

Guest selection

Real-time booking stored in Firebase

Booking history & cancellation

🎟️ Experiences

Browse experiences

Date & time slot selection

Capacity-based booking

Slot availability updates in Firestore

Experience booking history

🛎️ Services

Browse services

Service details page

Service booking & history

💳 Payment Flow (Mock)

Payment modal (Card / UPI / Net Banking)

Simulated “Proceed to Pay” flow

Booking confirmation after payment

Mobile & desktop payment UI

🤖 AI Chatbot (Gemini)

Floating chatbot

Support / booking / services queries

Gemini AI integration with fallback handling

Auto-reset on close

🔐 Authentication

Firebase Authentication

Login / Logout

Protected routes (Trips, Bookings, History)

📱 Responsive Design

Mobile-first UI

Sticky booking bars

Mobile modals

Hamburger menu navigation

🛠️ Tech Stack
Category	Technology
Frontend	React + Vite
Styling	Tailwind CSS
Backend	Firebase (Auth + Firestore)
Animations	Framer Motion
AI	Google Gemini API
Routing	React Router
State	React Hooks + Context API
📁 Project Structure
src/
│── app/
│   └── App.jsx
│
│── components/
│   ├── layout/        (Navbar, Footer)
│   ├── chatbot/
│   ├── payment/
│   ├── common/
│
│── pages/
│   ├── Home.jsx
│   ├── Listings
│   ├── Experiences
│   ├── Services
│   ├── Bookings
│   ├── support/
│   ├── hosting/
│   ├── company/
│   ├── policies/
│
│── context/
│── data/
│── firebase/
│── utils/

🔥 Firebase Setup
Firestore Collections Used

users/{uid}/bookings

users/{uid}/experienceBookings

experiences/{id}/availability/{date}/slots/{time}

services

Firestore Rules (Recommended)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /users/{userId}/{doc=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    match /experiences/{doc=**} {
      allow read: if true;
    }

    match /services/{doc=**} {
      allow read: if true;
    }
  }
}

🔑 Environment Variables

Create a .env file in root:

VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_GEMINI_API_KEY=your_gemini_key

▶️ Run Locally
npm install
npm run dev


Open:
👉 http://localhost:5173

⚠️ Notes

Payment is mock / simulated

Gemini API has free tier limits

Chatbot includes fallback handling for quota errors

SPA routing requires proper hosting (Vercel / Netlify)

📌 Future Enhancements

Real payment gateway (Razorpay / Stripe)

Admin dashboard

Host onboarding flow

Ratings & reviews

Notifications

Analytics
📸 Screenshots
🏠 Home & Listings




🎟️ Experiences






🛎️ Services




💳 Payment Flow (Mock)




🧳 Trips & Bookings




🤖 AI Chatbot




📱 Mobile View

👨‍💻 Author

Aatif F
B.Tech – Information Technology
Aspiring Full-Stack Developer

⭐ If you like this project

Give it a ⭐ on GitHub — it helps a lot!
