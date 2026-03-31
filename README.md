# 📄 Page Replacement Algorithm Simulator (React)

## 🧠 Overview

The **Page Replacement Algorithm Simulator** is a web-based application built using **React** that visually demonstrates how memory management works in Operating Systems.

It allows users to simulate:

* FIFO (First-In-First-Out)
* LRU (Least Recently Used)
* Optimal Page Replacement

The application provides **step-by-step execution**, **real-time animations**, and **performance comparison**.

---

## 🎯 Objectives

* Visualize page replacement algorithms
* Improve understanding of OS memory management
* Provide interactive learning with animations
* Compare algorithm efficiency

---

## ⚙️ Core Features

### 🔹 Interactive Simulation

* Input page reference string
* Select number of frames
* Choose algorithm
* View step-by-step execution

---

### 🔹 Real-Time Visualization

* Dynamic memory frame updates
* Highlights:

  * ✅ Page Hit
  * ❌ Page Fault

---

### 🔹 Animation System

* **anime.js** → Frame update animations
* **Framer Motion** → Smooth UI transitions

---

### 🔹 Playback Controls

* ▶ Play / ⏸ Pause
* ⏭ Next / ⏮ Previous
* 🔄 Reset
* ⚡ Speed control

---

### 🔹 Statistics Panel

* Total Hits
* Total Faults
* Hit Ratio
* Fault Ratio

---

### 🔹 Comparison Mode

* Runs all algorithms together
* Displays side-by-side results
* Identifies best-performing algorithm

---

## 🔄 Working of the Application

### Step 1: User Input

User provides:

* Page reference string (comma-separated)
* Number of frames
* Algorithm selection

---

### Step 2: Input Processing

* Input string is converted into an array
* Input validation is performed

---

### Step 3: Algorithm Execution

Selected algorithm runs:

* FIFO → replaces oldest page
* LRU → replaces least recently used page
* Optimal → replaces page not needed in future

Each algorithm generates:

* Step-by-step execution data
* Performance statistics

---

### Step 4: State Management

Handled using custom React hooks:

* `useSimulation` → manages steps and current state
* `useAutoPlay` → handles playback functionality

---

### Step 5: UI Rendering

Components update dynamically:

* FrameDisplay → memory frames
* StatsPanel → statistics
* StepTimeline → navigation

---

### Step 6: Animation Execution

* Frame updates animated using anime.js
* Step transitions animated using Framer Motion

---

## 📁 Project Structure

```id="x9h1lq"
src/
│
├── components/        # UI components
├── algorithms/        # Algorithm logic
├── hooks/             # Custom React hooks
├── charts/            # Graph components
├── utils/             # Helper functions
├── pages/             # Screens
│
├── App.js             # Root component
├── index.js           # Entry point
```

---

## 🚀 Getting Started

### 📌 Prerequisites

* Node.js
* npm

---

### 📥 Installation

```bash id="3f3k7z"
npm install
npm start
```

---

### 🌐 Run Application

```id="n2u4rf"
http://localhost:3000
```

---

## 🧪 Example Input

```id="z7k8lp"
Pages: 7,0,1,2,0,3,0,4
Frames: 3
```

---

## 📈 Output

* Step-by-step visualization
* Frame updates
* Hit/Fault indication
* Final statistics

---

## 🔮 Future Enhancements

* Add more algorithms (LFU, Clock)
* AI-based explanation
* Export results (CSV/PNG)
* Quiz mode

---

## 📄 License

This project is for educational purposes.

---

🎓 *Built to simplify Operating System concepts through visualization*
