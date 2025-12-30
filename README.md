# UNT Dining - Nutrition & Meal Planner

> **A high-performance, aesthetically pleasing mobile experience for the modern student.**


## 🚀 Overview

This project is a sophisticated React Native application designed to scrape, aggregate, and analyze dining hall data. It demonstrates a **mobile-first** mindset, blending powerful utility with a **Gen Z-focused design language**—featuring neon accents, glassmorphism, and fluid interactions.

Built with **TypeScript** and **Expo**, this app showcases full-stack capability using **Firebase** as a serverless backend, directly relevant to modern startup stacks.


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
