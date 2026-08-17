# ✈️ TravelGo

**TravelGo** is a full-stack travel agency web application built with **Angular 21**, **ASP.NET Core Web API (.NET 8)**, **Entity Framework Core 8**, and **Microsoft SQL Server**.

The platform provides a customer-facing travel website for exploring destinations, packages and hotels, along with booking, payment flow, booking details and invoice functionality. It also includes an administration panel for managing the travel agency platform.

## 🚀 Tech Stack

### Frontend
- Angular 21
- TypeScript
- HTML5
- CSS3
- Angular Router
- Angular Reactive Forms
- RxJS
- HTTP Interceptors
- Route Guards

### Backend
- ASP.NET Core Web API (.NET 8)
- C#
- Entity Framework Core 8
- RESTful APIs
- JWT Authentication
- BCrypt password hashing
- AutoMapper
- Swagger / OpenAPI

### Database
- Microsoft SQL Server
- Entity Framework Core Migrations

---

## ✨ Features

### 👤 Customer Features
- User registration and login
- JWT-based authentication
- Protected routes
- Browse destinations
- Browse destination packages
- Package details
- Destination-wise hotels
- Hotel details
- Travel booking
- Payment flow
- Booking details
- Invoice download
- My Bookings
- Logout

### 🛠️ Admin Features
- Admin authentication
- Admin dashboard
- Destination management
  - Add destination
  - Edit destination
  - View destination details
- Package management
  - Add package
  - Edit package
  - View package details
- Hotel management
  - Add hotel
  - Edit hotel
  - View hotel details
- Booking management
- Booking status management
- User management
- Inquiry management
- Image management

### 🖼️ Image Management
- Destination images
- Package images
- Hotel images
- Image upload APIs
- Thumbnail support
- Static file serving through `wwwroot/uploads`

---

## 🔐 Authentication & Authorization

TravelGo uses JWT-based authentication and role-based authorization.

The application includes:

- User registration and login APIs
- JWT token generation
- BCrypt password hashing
- Angular authentication service
- HTTP authentication interceptor
- Route guards
- Role-based admin functionality
- Protected customer and admin pages

---

## 🧭 Application Flow

```text
Home
  ↓
Destinations
  ↓
Packages
  ↓
Package Details
  ↓
Hotels
  ↓
Hotel Details
  ↓
Booking
  ↓
Payment
  ↓
Booking Details
  ↓
Invoice
  ↓
My Bookings
```

### Admin Flow

```text
Admin Login
    ↓
Admin Dashboard
    ↓
Manage Destinations
    ↓
Manage Packages
    ↓
Manage Hotels
    ↓
Manage Bookings
    ↓
Manage Users
    ↓
Manage Inquiries
```

---

## 🏗️ Clean Architecture

The backend has been reorganized into a Clean Architecture-style solution with separate responsibilities for API, Application, Domain and Infrastructure.

```text
TravelGo/
│
├── TravelAgency.API/
│   ├── Controllers/
│   ├── Properties/
│   ├── wwwroot/
│   │   └── uploads/
│   ├── Program.cs
│   ├── TravelAgency.API.csproj
│   └── appsettings.json
│
├── TravelGo.Application/
│   ├── DTOs/
│   ├── Helpers/
│   ├── Interfaces/
│   ├── Mappings/
│   ├── Services/
│   └── TravelGo.Application.csproj
│
├── TravelGo.Domain/
│   ├── Entities/
│   ├── Interfaces/
│   └── TravelGo.Domain.csproj
│
├── TravelGo.Infrastructure/
│   ├── Authentication/
│   ├── Data/
│   ├── Migrations/
│   ├── Repositories/
│   ├── Seed/
│   ├── Services/
│   └── TravelGo.Infrastructure.csproj
│
├── travel-agency [Frontend]/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── admin/
│   │   │   ├── components/
│   │   │   ├── core/
│   │   │   └── pages/
│   │   └── environments/
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
├── TravelGo.sln
└── README.md
```

### Architecture Responsibilities

| Layer | Responsibility |
|---|---|
| `TravelGo.Domain` | Core entities and repository contracts |
| `TravelGo.Application` | DTOs, interfaces, mappings and application services |
| `TravelGo.Infrastructure` | Database access, repositories, authentication, migrations and infrastructure services |
| `TravelAgency.API` | HTTP API, controllers, configuration and application entry point |
| `travel-agency [Frontend]` | Angular customer and admin interfaces |

---

## 🔗 Main API Modules

The backend contains API functionality for:

- Authentication
- Destinations
- Packages
- Package Images
- Hotels
- Hotel Images
- Bookings
- My Bookings
- Users
- Inquiries
- Dashboard
- Image Uploads

---

## 🗄️ Main Database Entities

The application contains entities including:

- User
- Role
- Destination
- Package
- Hotel
- Booking
- PackageImage
- HotelImage
- Inquiry

Entity relationships and database migrations are handled through Entity Framework Core.

---

## ⚙️ Prerequisites

Install the following before running the project:

- Node.js
- npm
- Angular CLI
- .NET 8 SDK
- Microsoft SQL Server or SQL Server LocalDB
- Visual Studio / Visual Studio Code
- Git

---

## 🔧 Backend Setup

### 1. Clone the repository

```bash
git clone https://github.com/sujald3505/TravelGo.git
cd TravelGo
```

### 2. Restore .NET dependencies

```bash
dotnet restore
```

### 3. Configure the database

Update the connection string in:

```text
TravelAgency.API/appsettings.json
```

Example:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=TravelAgencyDB;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

> Do not commit production database credentials, JWT secrets or other private configuration to GitHub.

### 4. Apply Entity Framework migrations

From the solution root:

```bash
dotnet ef database update --project TravelGo.Infrastructure --startup-project TravelAgency.API
```

### 5. Run the backend

```bash
dotnet run --project TravelAgency.API
```

Swagger / OpenAPI will be available at the development URL shown by ASP.NET Core.

---

## 💻 Frontend Setup

Open a new terminal from the solution root.

### 1. Navigate to the frontend

```bash
cd "travel-agency [Frontend]"
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start Angular

```bash
ng serve
```

Open:

```text
http://localhost:4200
```

---

## 🔄 Running Both Applications

Run the backend and frontend in separate terminals.

### Terminal 1 — Backend

```bash
dotnet run --project TravelAgency.API
```

### Terminal 2 — Frontend

```bash
cd "travel-agency [Frontend]"
ng serve
```

Make sure the Angular environment configuration points to the correct backend API URL.

---

## 📁 Frontend Structure

The Angular application is organized into:

```text
travel-agency [Frontend]/
└── src/
    └── app/
        ├── admin/
        │   ├── admin-layout/
        │   ├── admin-login/
        │   └── pages/
        │
        ├── components/
        │   ├── navbar/
        │   └── footer/
        │
        ├── core/
        │   ├── guards/
        │   ├── interceptors/
        │   ├── models/
        │   ├── resolvers/
        │   └── services/
        │
        └── pages/
            ├── about/
            ├── booking/
            ├── booking-details/
            ├── contact/
            ├── destination-details/
            ├── destinations/
            ├── home/
            ├── hotel/
            ├── hotel-details/
            ├── login/
            ├── my-bookings/
            ├── package-details/
            ├── packages/
            ├── payment/
            └── register/
```

---

## 🛡️ Security

The project includes:

- JWT authentication
- BCrypt password hashing
- Protected Angular routes
- Authorization headers through HTTP interceptor
- Role-based admin access
- Environment-based API configuration
- `.gitignore` for excluding development-specific files

---

## 📌 Project Status

TravelGo is a full-stack travel agency project developed with a customer-facing Angular application and an administrative management panel. The backend is structured using separate Domain, Application, Infrastructure and API projects.

---

## 👨‍💻 Author

**Sujal Dudhatra**

GitHub:  
https://github.com/sujald3505

---

## 🔗 Repository

https://github.com/sujald3505/TravelGo

---

## 📄 License

This project is developed for **learning, portfolio and educational purposes**.
