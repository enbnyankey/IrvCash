# 💰 Petty Cash API Documentation

A RESTful API for managing petty cash operations, including user authentication, email notifications, expenses, and request approvals.

---

## 🔗 Base URL

```
http://localhost:5000
```

---

## 📌 Table of Contents

* [Authentication](#authentication)
* [Email Notifications](#email-notifications)
* [User Management](#user-management)
* [Expenses](#expenses)
* [Cash Requests](#cash-requests)

---

## 🔐 Authentication

### ✅ Signup

**POST** `/api/v1/signup`

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "department": "Finance",
  "position": "Manager",
  "password": "SecurePassword123"
}
```

### ✅ Login

**POST** `/api/v1/login`

```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123"
}
```

### 🔁 Forgot Password

**POST** `/api/v1/forgotPassword`

```json
{
  "email": "nadineyankey@gmail.com"
}
```

### 🔄 Reset Password

**POST** `/userAuth/resetPassword`

```json
{
  "token": "<JWT_TOKEN>",
  "newPassword": "NADDIne12304"
}
```

---

## ✉️ Email Notifications

### 📤 Send Single Email Notification

**POST** `/api/v1/sendSingleEmailNotification`

```json
{
  "subject": "Test Subject",
  "message": "Test message",
  "html": "<b>Test HTML</b>",
  "receiverEmail": "nadineyankey@gmail.com"
}
```

---

## 👤 User Management

### ✏️ Update User

**POST** `/userAuth/updateUserProfile`

```json
{
  "employee_code": "EMP006",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "department": "procurement",
  "position": "In-Charge"
}
```

### ❌ Delete User

**GET** `/userAuth/deleteUser`

> No request body required.

---

## 🧾 Expenses

### 📥 Add Expense

**POST** `/api/v1/addExpense`

```json
{
  "category_id": "17",
  "category_name": "stipend",
  "category_description": "Fuel, Tyres"
}
```

### ✏️ Update Expense

**PUT** `/categoryExpense/updateExpense`

```json
{
  "category_id": "9",
  "category_name": "Refreshments",
  "category_description": "softdrinks, Pastries, and disposables"
}
```

### ❌ Delete Expense

**POST** `/api/v1/deleteExpense`

```json
{
  "category_id": "10"
}
```

### 📋 Get All Expenses

**GET** `/api/v1/getAllExpenses`

> No request body required.

---

## 📝 Cash Requests

### ➕ Add Request

**POST** `/api/v1/addRequest`

```json
{
  "requested_amount": "5000",
  "requested_by": 2
}
```

### 📋 All Requests

**GET** `/api/v1/getAllRequest`

> No request body required.

### ✏️ Update Request

**POST** `/CashRequest/updateRequest`

```json
{
  "requested_amount": 527,
  "requested_by": 2,
  "request_id": 6
}
```

### ❌ Delete Request

**DELETE** `/CashRequest/deleteRequest`

```json
{
  "request_id": 7
}
```

### ✅ Approve Request

**POST** `/api/v1/approvedRequest`

```json
{
  "request_id": "8",
  "reason": "HELLO"
}
```

---

## ⚠️ Error Handling

Errors are returned in the following format:

```json
{
  "error": "Detailed error message here"
}
```

Common HTTP status codes:

* 200 OK
* 201 Created
* 400 Bad Request
* 401 Unauthorized
* 404 Not Found
* 500 Internal Server Error

---

## 🧑‍💻 Author

**Nadine Yankey**
[GitHub](https://github.com/enbnyankey) | [LinkedIn](https://www.linkedin.com/in/nadineyankey)

---

## 📜 License

MIT License
