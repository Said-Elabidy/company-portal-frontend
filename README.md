# Company Portal Frontend

This is the frontend application for **Company Portal** built with **Angular 18**.

---

## Features

- **Company Registration Form** with inputs for:  
  - Arabic and English company names (required)  
  - Email (required, validated)  
  - Phone number (optional, validated)  
  - Website URL (optional)  
  - Company logo upload with preview  
- **OTP Verification Page** with countdown timer and validation  
- **Create Password Page** with strong password validation rules:  
  - Minimum 6 characters  
  - At least one uppercase letter, special character, and number  
- **Login Page** for user authentication  
- **Company Info Page** displaying company name and logo after login  
- **Navbar with conditional buttons**: shows Login/Register if logged out, Logout button if logged in  

---

## Technologies

- Angular 18 (Standalone Components)  
- Reactive Forms with validation  
- Angular Router for navigation  
- HttpClient for API communication  
- CSS for styling and responsive layout  

---

## Running the App

1. Make sure the backend API is running and accessible.  
2. Run `npm install` to install dependencies.  
3. Run `ng serve` to start the Angular development server.  
4. Access the app at `http://localhost:4200`.  

---

## Video Demo

A video walkthrough of the frontend features, including registration, OTP confirmation, password creation, and login, is available [here](https://drive.google.com/file/d/1jmXfLgYZNAGmie9VgIUvVxQXDySJzKHE/view?usp=sharing).  

---
