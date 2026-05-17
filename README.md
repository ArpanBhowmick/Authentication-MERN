# MERN JWT Authentication System

A scalable JWT Authentication system built using:

* React
* Express
* Node.js
* MongoDB
* JWT (Access + Refresh Tokens)
* Context API
* Axios Interceptors
* Role-Based Authorization

This project implements a modern authentication architecture similar to what many real-world applications use.

---

# Features

## Authentication Features

* User Registration
* User Login
* Password Hashing using bcrypt
* JWT Access Token Authentication
* Refresh Token Authentication
* HTTP-only Refresh Token Cookies
* Automatic Login Persistence
* Automatic Access Token Refresh
* Automatic Logout on Token Expiry
* Logout Functionality

---

## Authorization Features

* Protected Frontend Routes
* Protected Backend Routes
* Role-Based Authorization
* Unauthorized Page Handling
* Middleware-Based JWT Verification

---

## Frontend Features

* Context API Authentication State
* Axios Private Instance
* Request Interceptors
* Response Interceptors
* Session Persistence After Reload
* Automatic Session Expiration Handling

---

# Tech Stack

## Frontend

* React
* React Router DOM
* Axios
* Context API
* jwt-decode
* Tailwind CSS
* shadcn/ui

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* cookie-parser

---

# Authentication Flow

## 1. User Login

When user logs in:

1. Backend verifies email and password
2. Password is checked using bcrypt.compare()
3. Backend generates:

   * Access Token
   * Refresh Token
4. Refresh Token is stored inside HTTP-only cookie
5. Access Token is sent to frontend
6. Frontend stores Access Token inside Context API

---

# Access Token

Purpose:

* Used to access protected backend APIs
* Sent inside Authorization header

Example:

```http
Authorization: Bearer your_access_token
```

Recommended Expiry:

```txt
15 minutes
```

---

# Refresh Token

Purpose:

* Generates new access token when old access token expires
* Maintains login persistence

Storage:

```txt
HTTP-only Cookie
```

Recommended Expiry:

```txt
7 days
```

---

# Why Access Token + Refresh Token?

Using only one long-lived token is insecure.

Modern apps use:

* Short-lived Access Token
* Long-lived Refresh Token

Benefits:

* Better security
* Better user experience
* Automatic session restoration

---

# Login Persistence Flow

When app reloads:

1. Context API resets
2. AuthProvider runs
3. Frontend calls:

```js
POST /refreshToken
```

4. Browser automatically sends refresh token cookie
5. Backend verifies refresh token
6. Backend generates new access token
7. Frontend restores authentication state

Result:

```txt
User stays logged in after refresh.
```

---

# Axios Interceptor Flow

## Request Interceptor

Automatically attaches access token to protected requests.

Example:

```js
Authorization: Bearer accessToken
```

This removes the need to manually attach tokens everywhere.

---

## Response Interceptor

When access token expires:

1. Backend returns:

```txt
401 Unauthorized
```

2. Interceptor automatically calls:

```js
POST /refreshToken
```

3. Backend sends new access token
4. Original request retries automatically

User does not notice anything.

---

# Automatic Logout Flow

Frontend decodes JWT expiry using:

```js
jwtDecode()
```

A timer is created using:

```js
setTimeout()
```

When token expires:

```js
setAuth({})
navigate("/login")
```

Result:

* User automatically logged out
* Protected routes removed instantly
* Stale frontend session removed

---

# Backend Middleware

Protected routes use JWT middleware.

Example:

```js
router.get("/users", verifyJWT, getAllUsers)
```

Middleware responsibilities:

* Extract token from Authorization header
* Verify JWT signature
* Check token expiration
* Reject invalid tokens
* Allow valid requests using next()

---

# Role-Based Authorization

Users contain roles.

Example:

```js
roles: [2001]
```

Frontend checks roles before rendering protected routes.

Example:

```js
<RequireAuth allowedRoles={[5150]} />
```

Unauthorized users are redirected to:

```txt
/unauthorized
```

---

# Folder Structure

```txt
src/
│
├── api/
│   └── axios.js
│
├── components/
│   ├── Layout.jsx
│   ├── Linkpage.jsx
│   └── RequireAuth.jsx
│
├── context/
│   └── AuthProvider.jsx
│
├── hooks/
│   ├── useAuth.js
│   └── useAxiosPrivate.js
│
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Admin.jsx
│   ├── Editor.jsx
│   ├── Lounge.jsx
│   ├── Unauthorized.jsx
│   ├── UsersList.jsx
│   └── Missing.jsx
│
└── App.jsx
```

---

# Environment Variables

## Backend `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
```

---

# Cookie Configuration

## Development

```js
httpOnly: true,
secure: false,
sameSite: "lax"
```

---

## Production

```js
httpOnly: true,
secure: true,
sameSite: "none"
```

---

# Production Recommendations

## Recommended Token Expiry

### Access Token

```txt
15 minutes
```

### Refresh Token

```txt
7 days
```

### Cookie maxAge

```txt
7 days
```

---

# Recommended Security Improvements

## 1. Refresh Token Rotation

Generate a new refresh token whenever refresh endpoint is called.

---

## 2. Store Refresh Tokens in Database

Benefits:

* Logout from all devices
* Revoke sessions
* Detect token theft

---

## 3. CSRF Protection

Recommended when using cookies.

---

## 4. Rate Limiting

Protect login routes from brute-force attacks.

---

## 5. Email Verification

Recommended for production applications.

---

## 6. Password Reset Flow

Add forgot-password functionality.

---

# Testing Checklist

## Registration

* Valid registration works
* Duplicate email blocked
* Password stored hashed

---

## Login

* Correct credentials work
* Wrong password rejected
* Wrong email rejected

---

## Persistence

* User stays logged in after refresh

---

## Protected APIs

* Requests without token rejected
* Invalid tokens rejected
* Expired tokens rejected

---

## Interceptor Testing

Set access token expiry to:

```txt
10 seconds
```

Expected:

* Automatic refresh
* Request retry
* No logout

---

## Full Session Expiration

Set refresh token expiry to:

```txt
20 seconds
```

Expected:

* Refresh fails
* Auth clears
* User redirected to login

---

# Important Concepts Learned

## Frontend Authentication State

Frontend Context API only stores temporary auth state.

---

## Backend Token Validation

Backend middleware is the real security layer.

---

## Session Persistence

Refresh token restores authentication after reload.

---

## Session Expiration

Frontend timer removes stale auth state instantly.

---

## Axios Interceptors

Centralized token management system.

---

# Future Improvements

* Multi-device session management
* OAuth Authentication
* Google Login
* Email Verification
* Redis Session Storage
* Advanced RBAC (Role-Based Access Control)
* Admin Dashboard Permissions

---

# Conclusion

This project implements a scalable modern JWT Authentication architecture using:

* Access Tokens
* Refresh Tokens
* HTTP-only Cookies
* Axios Interceptors
* Backend Middleware
* Context API
* Automatic Session Management

The architecture follows many patterns used in real-world MERN applications and provides a strong foundation for building secure full-stack applications.
