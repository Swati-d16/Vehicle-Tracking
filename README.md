# 🚗 Vehicle Status Tracker

A simple and interactive web application that allows users to track the real-time status and availability of a vehicle on a map. Designed using **React**, **Vite**, and **Tailwind CSS**, the app displays the live location of a vehicle along with essential details like speed, model, and current state (moving/parked).


<img width="1919" height="918" alt="Screenshot 2025-10-30 060647" src="https://github.com/user-attachments/assets/776c0949-82dc-47e5-988a-7451b738409b" />


---

## ✨ Features

- 📍 Live location visualization on map  
<img width="1916" height="906" alt="Screenshot 2025-10-30 060836" src="https://github.com/user-attachments/assets/0e15fe0f-fe2c-4bdf-9aa8-a49f43d5f23e" />

- 🚘 Vehicle details & status indicators
  <img width="1919" height="913" alt="Screenshot 2025-10-30 060854" src="https://github.com/user-attachments/assets/545ab212-3043-4c70-bfe3-dbd76d8064ca" />

- 💺 Seating and capacity info displayed  
- 🛰 Satellite + Map view options (Google Maps / Mapbox compatible)
  <img width="1919" height="918" alt="Screenshot 2025-10-30 060647" src="https://github.com/user-attachments/assets/6e33d93e-2570-42e4-883f-2fefd6004577" />

- 🔄 Auto-update support for real-time movement
  <img width="1919" height="905" alt="Screenshot 2025-10-30 060918" src="https://github.com/user-attachments/assets/89087649-b5ab-487f-8798-e3e166cdeb9c" />

- ⚡ Fast performance with Vite build system  
- 🎨 Responsive UI using Tailwind CSS  

---

## 🛠 Tech Stack

| Category | Technology |
|---------|------------|
| Frontend | React, Vite |
| Styling | Tailwind CSS |
| Mapping | Google Maps JavaScript API *(or Mapbox or Leaflet)* |
| Icons/UI | Custom vector icons |

---


## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start the development server

```bash
npm run dev
```

App will run at **[http://localhost:5173](http://localhost:5173)** (or the port assigned by Vite)

---

## 🔧 Environment Variables

Create a `.env` file in the project root:

```
VITE_MAP_API_KEY=your_api_key_here
```

If using Google Maps, enable:

* Maps JavaScript API
* Geolocation API *(optional)*
* Leaflet

---

## 📦 Build for production

```bash
npm run build
```

---

## 📌 Future Enhancements

* ✅ Multiple vehicle tracking
* ✅ Route history display
* ✅ User authentication
* ✅ Database-connected backend for real data

---



