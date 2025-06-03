# 🛠️ CRM Backend System

This is the backend of a **Customer Relationship Management (CRM)** system that enables customer onboarding, order tracking, campaign management, and integration with Google OAuth and Gemini AI. Built with **Node.js**, **Express**, and **MongoDB**, this RESTful API is structured using the MVC pattern and is ready for scalable production use.

---

## 📁 Project Structure

```
.
├── controllers       # Handle business logic
│   ├── campaign.controller.js
│   ├── customer.controller.js
│   └── order.controller.js
├── models            # Mongoose schemas
│   ├── CommunicationLog.js
│   ├── Customer.js
│   ├── Order.js
│   └── User.js
├── routes            # API endpoints
│   ├── auth.routes.js
│   ├── campaign.routes.js
│   ├── customer.routes.js
│   ├── gemini.routes.js
│   └── order.routes.js
├── services          # External integrations (e.g., Gemini API, Google Auth)
├── app.js            # Entry point (assumed)
└── package.json
```

---

## 🚀 Features

### ✅ Customer Management
- Create new customers with validation.
- Store name, email, totalSpend, numVisits, and lastVisitDate.

### 🛒 Order Management
- Create orders for existing customers.
- Validate amount and customerId before saving.

### 📢 Campaign System
- Dynamically filter target audience using flexible rules (`AND`/`OR` logic).
- Create, simulate, and log campaign messages.
- Check audience size before sending.
- Store communication logs with message and status.

### 🔐 Authentication
- Google OAuth 2.0 login.
- Session-based auth using Passport.js.
- Logout and status endpoints included.

### 🤖 Gemini AI Integration
- Chat API with Gemini via `/gemini/ask` route.

---

## 🧪 API Endpoints

### Auth (`/auth`)
- `GET /google` – Initiates Google login.
- `GET /google/callback` – Handles Google OAuth callback.
- `GET /status` – Returns login status.
- `POST /logout` – Logs out the user and destroys session.

### Customer (`/customers`)
- `POST /` – Create a new customer  
  **Body:** `{ "name": "John Doe", "email": "john@example.com" }`

### Orders (`/orders`)
- `POST /` – Create a new order  
  **Body:** `{ "customerId": "<valid MongoID>", "amount": 120.5 }`

### Campaign (`/campaigns`)
- `POST /create-audience` – Create and send a campaign  
- `POST /check-audience-size` – Return audience size  
  **Body:**  
  ```json
  {
    "rules": [
      { "field": "totalSpend", "operator": ">", "value": 100 },
      { "field": "numVisits", "operator": ">=", "value": 3 }
    ],
    "logicalOperator": "AND",
    "message": "Exclusive offer for our loyal customers!"
  }
  ```
- `GET /` – Get list of campaigns

### Gemini (`/gemini`)
- `POST /ask` – Ask a question via Gemini  
  **Body:** `{ "prompt": "Suggest a campaign idea for tech buyers." }`

---

## 🧰 Technologies Used

- **Node.js + Express** – Backend framework
- **MongoDB + Mongoose** – NoSQL database & ODM
- **Passport.js** – Authentication (Google OAuth)
- **express-validator** – Request validation
- **Render / Localhost** – Deployment-ready
- **Gemini API (Google)** – AI assistant integration

---

## 📦 Installation

1. **Clone repo**
   ```bash
   git clone https://github.com/yourusername/crm-backend.git
   cd crm-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   Create a `.env` file:
   ```env
   MONGO_URI=your_mongo_connection
   SESSION_SECRET=your_session_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_secret
   ```

4. **Start server**
   ```bash
   npm start
   ```

---

## 📂 Database Schemas (MongoDB)

### Customer
```js
{
  name: String,
  email: String,
  totalSpend: Number,
  numVisits: Number,
  lastVisitDate: Date
}
```

### Order
```js
{
  customerId: String,
  amount: Number,
  date: Date
}
```

### CommunicationLog
```js
{
  audience: Array,
  message: String,
  sentAt: Date,
  status: "SENT" | "FAILED"
}
```

### User
```js
{
  googleId: String,
  displayName: String,
  firstName: String,
  lastName: String,
  image: String,
  email: String
}
```

---

## ✅ Future Enhancements

- Add queue system (e.g., RabbitMQ or Kafka) to publish customer & campaign events.
- Add role-based authorization.
- Include pagination and filtering for large datasets.
- Schedule campaign sends.
- Email integration via third-party vendors.

---

## 🧑‍💻 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-xyz`)
3. Make your changes
4. Commit and push (`git commit -m "Add xyz"` → `git push`)
5. Create a pull request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 📬 Contact

Made with ❤️ by [Mandeep Sharma]  
📧 mandeepvashist921@gmai.com 
