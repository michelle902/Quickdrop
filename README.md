# QuickDrop Delivery Web App (Frontend Only)

## 🚀 Overview
QuickDrop is a **professional, business-styled delivery web app frontend** designed for small businesses that need a simple way to request delivery services within a province. This project simulates how a delivery platform works — similar to Uber Eats — but focused solely on delivery logistics.

This version is **frontend-only**, meaning it runs completely in the browser without requiring any backend or API keys. It's perfect for demonstrations, portfolios, and UX/UI design showcases.

---

## 🧩 Features
- **Login Page** – Business owners can log in to access their dashboard.
- **Dashboard Page** – Displays navigation options for delivery actions.
- **Request Delivery Form** – Clients can enter pickup and delivery addresses, package details, and simulate delivery costs.
- **Simulated Cost Calculator** – Calculates delivery cost using:
  ```
  Total Cost = Base Fee (R25) + R10 per km
  ```
  The distance is randomly generated between 5–50 km for demo purposes.
- **Responsive Design** – Works on mobile, tablet, and desktop.
- **Modern UI** – Clean layout, blue-and-white theme, rounded buttons, and form validation.

---

## 🗂️ Project Structure
```
quickdrop/
│
├── index.html          # Login page
├── dashboard.html      # Dashboard (menu)
├── request.html        # Delivery request form
│
├── css/
│   └── style.css       # All styling rules
│
└── js/
    └── script.js       # Form logic, cost calculation
```

---

## 💻 How to Run
1. Download or clone this repository.
2. Open the `quickdrop` folder in **VS Code** or your preferred editor.
3. Open `index.html` in your browser to start the app.
4. Log in with any email and password (simulation only).
5. Use the dashboard to access the delivery request form.

---

## 🧠 How It Works
The delivery form simulates distance and calculates total cost automatically:
```js
function calculateDelivery(distanceKm) {
  const baseFee = 25;
  const ratePerKm = 10;
  const total = baseFee + (distanceKm * ratePerKm);
  return total.toFixed(2);
}
```
A random distance between 5–50 km is generated to simulate various delivery scenarios.

---

## 🖌️ Design Choices
- **Colors:** Blue (#0d6efd), White, Gray accents
- **Typography:** Sans-serif (e.g., Inter, Roboto)
- **Buttons:** Rounded edges with hover effects
- **Forms:** Centered cards with shadows for a clean, modern feel

---

## 🌍 Future Enhancements
- Integrate Google Maps Distance Matrix API for real distance calculations
- Add backend (Node.js + Express or Firebase) for user authentication and delivery management
- Include a payment gateway (e.g., PayFast or Stripe)
- Add live driver tracking and delivery status updates
- Create admin and driver dashboards

---

## 📜 License
This project is open for **educational and portfolio purposes**. You are free to modify and adapt it for your own use.

---

## 👩🏽‍💻 Author
**Michell Monareng**  
Frontend Developer | IT Student | Aspiring Software Engineer  
Pretoria, South Africa
