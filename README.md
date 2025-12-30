# UNT Dining - Gen Z Nutrition & Meal Planner

> **A high-performance, aesthetically pleasing mobile experience for the modern student.**

![Gen Z Aesthetic](https://via.placeholder.com/800x400?text=Modern+UI+Preview)

## 🚀 Overview

This project is a sophisticated React Native application designed to scrape, aggregate, and analyze dining hall data. It demonstrates a **mobile-first** mindset, blending powerful utility with a **Gen Z-focused design language**—featuring neon accents, glassmorphism, and fluid interactions.

Built with **TypeScript** and **Expo**, this app showcases full-stack capability using **Firebase** as a serverless backend, directly relevant to modern startup stacks.

## 🎯 Relevance to "Gen Z Digital Camera Startup" Role

This project directly demonstrates the skills required for the Full Stack Software Engineer position:

*   **Mobile Excellence**: While the role lists Swift/Kotlin, this project proves deep understanding of **mobile app architecture**, navigation patterns, and the constraints of mobile devices (iOS/Android) using **React Native**.
*   **Modern Frontend Stack**: Built with **TypeScript**, **React**, and modern state management, perfectly aligning with the "TypeScript, React, CSS, Next.js" requirement.
*   **Gen Z Aesthetic**: The UI is crafted to be "impressive" and "premium," using custom design tokens, modern typography, and vibrant palettes—exactly what a "growing Gen Z digital camera startup" needs to capture its audience.
*   **Backend & Data**: Integrated with **Firebase (Firestore)** for real-time data syncing, analogous to **Supabase/AWS** in the job description.
*   **Code Quality**: Strictly typed with TypeScript, ensuring maintainability and scalability.

## 🛠 Tech Stack

*   **Framework**: [React Native](https://reactnative.dev/) (via [Expo SDK 51](https://expo.dev/))
*   **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
*   **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing similar to Next.js)
*   **Backend / Database**: [Firebase Firestore](https://firebase.google.com/) (NoSQL)
*   **State Management**: React Context API + Hooks
*   **Styling**: Custom Design System (Theming engine with Light/Dark mode interaction)

## ✨ Key Features

1.  **Smart Nutrition Calculator**:
    *   Dynamic calculation of macros (Protein, Carbs, Fat) based on real-time selections.
    *   Interactive list with optimized rendering (`FlatList`) for smooth scrolling performance.
    *   Modal-based detailed nutrition facts inspired by nutrition labels but with a modern twist.

2.  **Interactive Meal Planning**:
    *   Personalized filtering (Vegan, Halal, Gluten-Free).
    *   Goal-oriented suggestions (Lose Weight, Build Muscle).
    *   Custom input logic for granular control over macro targets.

3.  **Premium UI/UX**:
    *   **Dark Mode First**: Optimized for OLED screens.
    *   **Custom Theming**: Centralized `theme.ts` managing colors (`#00F5D4`, `#7000FF`), spacing, and typography (Helvetica).
    *   **Haptic Feedback**: (Implemented via touchables) for tactile feel.

## 📸 Screenshots

| Dashboard | Calculator | Meal Plan |
|-----------|------------|-----------|
| Modern Card Layout | List with Macro Tracking | Goal Selection Modal |

## 🔧 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/unt-dining-app.git
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Run the App**:
    ```bash
    npx expo start
    ```
    *   Scan the QR code with your phone (Expo Go) or run on Simulator.

## 📐 Architecture Highlights

*   **Context-Driven Theming**: The app uses a Global Context to inject theme tokens, making it trivial to switch palettes or implement "skins"—a feature highly relevant for a consumer-facing camera app.
*   **Component Composition**: Highly reusable components (`Card`, `ThemedView`) to reduce technical debt.
*   **Separation of Concerns**: Logic is separated from UI using custom hooks and Context providers.

---

**Author**: Datta
**Status**: Active Development
**License**: MIT
