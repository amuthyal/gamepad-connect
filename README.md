# 🕹 Gamepad Connect

An interactive web-based game controller interface that supports real-time button mapping, WebSocket communication, and control customization.

## 🌐 Live Demo

- **Frontend (Vercel/Netlify)**: [https://your-frontend-url.com](https://your-frontend-url.com)
- **Mock Backend (Render/Replit)**: [https://your-json-server-url.com](https://your-json-server-url.com)

---

## 📁 Project Structure

```
gamepad-connect/
├── public/
│   └── db.json                # Mock JSON data (used locally or deployed)
├── src/
│   ├── components/            # React components
│   ├── hooks/                 # Zustand or custom hooks
│   ├── App.tsx                # Main app entry
│   └── index.tsx              # React DOM renderer
├── package.json
├── jest.setup.ts             # Global test config
└── README.md
```

---

## 🚀 Deployment

### ✳️ Frontend (Vercel or Netlify)

1. **Push your frontend code to GitHub**
2. **Vercel** (Recommended for Vite/React):
   - Go to [https://vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click **"Add New Project"**, select your repo
   - Use defaults (Vite/React are auto-detected)
   - Click **Deploy**

3. **Netlify**:
   - Go to [https://netlify.com](https://netlify.com)
   - Sign in with GitHub
   - Select repo → Set:
     - **Build Command**: `npm run build`
     - **Publish Directory**: `dist` (for Vite) or `build` (for CRA)
   - Click **Deploy Site**

---

### 🔧 Backend / API Options

#### Option A: Local Static Mock
- Place `db.json` in `public/`
- Fetch via:  
  ```ts
  fetch('/db.json')
  ```

#### Option B: JSON Server via Render

1. Create `db.json` and `package.json`:

```json
{
  "name": "json-server-api",
  "scripts": {
    "start": "json-server --watch db.json --port 8080"
  },
  "dependencies": {
    "json-server": "^0.17.0"
  }
}
```

2. Push to GitHub → Visit [https://render.com](https://render.com)
3. Create New Web Service → Connect GitHub
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Deploy → Access API via `https://your-api.onrender.com/your-endpoints`

#### Option C: JSON Server via Replit

1. Create new Repl → Use Node.js template
2. Install:
   ```bash
   npm install json-server
   ```
3. Add this to `index.js`:
   ```js
   const jsonServer = require('json-server');
   const server = jsonServer.create();
   const router = jsonServer.router('db.json');
   const middlewares = jsonServer.defaults();

   server.use(middlewares);
   server.use(router);
   server.listen(3000, () => {
     console.log('JSON Server running');
   });
   ```
4. Run → Get live link from Replit

---

## ✅ Testing

```bash
npm install
npm run test
```

- Includes unit and integration tests using **Jest + React Testing Library**
- Mocked Zustand store, WebSocket, and file upload logic

---

## ✨ Features

- 🧩 Customizable button labels
- 🔄 WebSocket event logging
- 🗃 Import/Export mappings (JSON)
- 🧪 Fully tested React components
- ☁️ Easily deployable frontend/backend setup

---

## 🛠 Tech Stack

- **Frontend**: React, TypeScript, Zustand
- **Testing**: Jest, React Testing Library
- **Mock Backend**: JSON Server
- **Deployment**: Vercel, Netlify, Render, Replit

---

## 📄 License

MIT
