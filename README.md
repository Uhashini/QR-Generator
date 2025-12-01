# QR Generator

A full-stack QR code generator where users can enter any URL, preview the generated QR code, and download it as a PNG image.  
**Live demo:** https://qr-generator-seven-beta.vercel.app/

---

## Tech Stack

- **Frontend:** React (Create React App), CSS (responsive, mobile-first UI)
- **Backend:** Node.js, Express
- **QR Generation:** `qr-image`
- **Deployment:** Vercel (frontend), Render (backend)

---

## Features

- URL input form with validation and clear error handling
- Instant QR code generation via REST API
- Download QR code as a PNG file from the browser
- Responsive, card-based layout suitable for desktop and mobile

---

## Architecture

- **`/backend`**
  - Express server exposing `POST /generate-qr`
  - Generates QR PNG from the provided URL and streams it in the response
  - Also persists the last URL and QR image on the server filesystem

- **`/frontend`**
  - React SPA that sends the URL to the backend and renders the returned QR image blob
  - “Download PNG” button triggers a client-side download of the generated QR

---

## Running Locally

1. Clone
```
git clone https://github.com/Uhashini/QR-Generator.git
cd QR-Generator
```

2. Backend
```
cd backend
npm install
npm start # server on http://localhost:5000
```

3. Frontend (in a new terminal)
```
cd ../frontend
npm install
npm start # app on http://localhost:3000
```

---

## API Endpoint

- `POST /generate-qr`
  - **Body:**  
    ```
    { "url": "https://example.com" }
    ```
  - **Response:** PNG binary stream for the generated QR code

---

