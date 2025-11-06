# React Frontend - RishtaConnect

Modern matrimonial platform frontend built with React.

## 🚀 Features
- Responsive Design
- WhatsApp-style Messaging
- Package-based User Access
- Success Stories Section
- Animated Achievement Counters
- Profile Management
- Advanced Search & Filters

## 🛠️ Tech Stack
- React 18.3.1
- React Router DOM 6.x
- Axios
- CSS3
- Google reCAPTCHA

## 📦 Installation

```bash
npm install
```

## 🎯 Development

```bash
npm start
```
Runs on: http://localhost:3000

## 🏗️ Build for Production

```bash
npm run build
```

## 🌐 Environment Variables

Create `.env` file:

```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.js
│   ├── Footer.js
│   ├── LoginPage.js
│   ├── RegistrationForm.js
│   └── data/           # Static data
├── screens/            # Page components
│   ├── Home.js
│   ├── Login.js
│   ├── Register.js
│   └── user/
├── services/           # API services
│   ├── ApiService.js
│   └── MyApiService.js
└── styles/            # CSS files
```

## 🚀 Deployment on Render

See `DEPLOYMENT_GUIDE.md` in root directory.

**Quick Deploy:**
```bash
Build Command: npm install && npm run build
Start Command: npm install -g serve && serve -s build -l $PORT
Publish Directory: build
```

## 📄 Available Scripts

- `npm start` - Development server
- `npm run build` - Production build
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 🔗 API Integration

Backend URL configure in `.env`:
```
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

## 💡 Package Plans
- Free: 10 contacts
- Bronze: 25 contacts  
- Silver: 50 contacts
- Gold: 100 contacts

## 📝 License
MIT