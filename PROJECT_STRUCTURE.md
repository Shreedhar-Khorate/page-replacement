# 📁 Project Structure & Implementation (React)

## 🧠 Overview

This project follows a **modular React architecture** with clear separation of:

* Algorithm logic
* State management
* UI components

---

## 📂 Directory Structure

```id="u8x3rs"
src/
│
├── algorithms/        # FIFO, LRU, Optimal implementations
├── components/        # UI components
├── hooks/             # Custom React hooks
├── charts/            # Graph components
├── utils/             # Helper functions
├── pages/             # Application screens
│
├── App.js             # Root component
├── index.js           # Entry point
```

---

## 🧩 Implementation Details

### 1️⃣ Algorithms Layer (`algorithms/`)

* Contains pure JavaScript logic
* No UI or React dependencies

Each algorithm:

```js id="xg5m2a"
function runAlgorithm(pages, frames) {
  return {
    steps: [],
    stats: {}
  };
}
```

---

### 2️⃣ State Management (`hooks/`)

#### 🔹 useSimulation

Handles:

* Current step
* Simulation result
* Navigation (next, previous, reset)

---

#### 🔹 useAutoPlay

Handles:

* Play / Pause
* Speed control
* Automatic step progression

---

### 3️⃣ UI Components (`components/`)

#### 🔹 InputPanel

* Takes user input
* Validates input
* Starts simulation

---

#### 🔹 FrameDisplay

* Displays frames
* Highlights page hits and faults
* Uses animation libraries

---

#### 🔹 PlaybackControls

* Controls simulation flow
* Provides navigation buttons

---

#### 🔹 StatsPanel

* Displays statistics
* Updates in real-time

---

#### 🔹 StepTimeline

* Shows all steps
* Allows navigation to any step

---

#### 🔹 ComparisonMode

* Runs all algorithms
* Displays comparative results

---

### 4️⃣ Pages Layer (`pages/`)

* Combines all components into a single interface
* Main page renders the simulator UI

---

### 5️⃣ Utility Layer (`utils/`)

* Input parsing
* Statistics calculation
* Constants

---

## 🔄 Data Flow

```id="j3x9pt"
User Input
   ↓
InputPanel
   ↓
useSimulation.run()
   ↓
Algorithm Execution
   ↓
Simulation Result
   ↓
UI Update
```

---

## 🎞️ Animation Flow

```id="s6l2yt"
Step Change
   ↓
Framer Motion
   ↓
Frame Update
   ↓
anime.js
```

---

## 📦 Dependencies

* React
* anime.js
* framer-motion
* chart.js

---

## ⚙️ Execution Flow

1. User inputs data
2. Algorithm executes
3. Steps generated
4. State updated
5. UI re-renders
6. Animations triggered

---

## 🚀 Summary

* Clean separation of logic and UI
* Scalable architecture
* Interactive visualization
* Smooth animations
