# ✈️ TravelGo

**TravelGo** is a full-stack Travel Agency web application built with
**Angular 21** and **ASP.NET Core Web API (.NET 8)**.

The application allows users to explore destinations, packages and
hotels, make bookings, manage their bookings and use a secure
authentication system. It also includes an admin panel for managing the
travel agency data.

------------------------------------------------------------------------

## 🚀 Tech Stack

### Frontend

-   Angular 21
-   TypeScript
-   HTML5
-   CSS3
-   Angular Reactive Forms
-   Angular Router
-   RxJS
-   JWT Authentication
-   HTTP Interceptors
-   Route Guards

### Backend

-   ASP.NET Core Web API (.NET 8)
-   C#
-   Entity Framework Core 8
-   RESTful APIs
-   JWT Authentication
-   BCrypt Password Hashing
-   AutoMapper
-   Swagger / OpenAPI

### Database

-   Microsoft SQL Server
-   Entity Framework Core Migrations

------------------------------------------------------------------------

## ✨ Features

### 👤 User Features

-   User Registration
-   User Login
-   JWT Authentication
-   Protected Routes
-   Destination Browsing
-   Package Browsing
-   Package Details
-   Destination-wise Hotels
-   Hotel Details
-   Booking
-   My Bookings
-   Booking Details
-   Payment Flow
-   Invoice Download
-   Logout

### 🛠️ Admin Features

-   Admin Login
-   Admin Dashboard
-   Destination Management
-   Add Destination
-   Edit Destination
-   View Destination Details
-   Package Management
-   Add Package
-   Edit Package
-   View Package Details
-   Hotel Management
-   Add Hotel
-   Edit Hotel
-   View Hotel Details
-   Booking Management
-   Booking Status Management
-   User Management
-   Inquiry Management
-   Image Management

### 🖼️ Image Management

-   Destination Images
-   Package Images
-   Hotel Images
-   Image Upload APIs
-   Thumbnail Support

------------------------------------------------------------------------

## 🔐 Authentication & Authorization

TravelGo uses **JWT-based authentication**.

The application includes:

-   Login and Registration APIs
-   JWT token generation
-   Password hashing using BCrypt
-   Angular authentication service
-   HTTP authentication interceptor
-   Route guards for protected pages
-   Role-based admin functionality

Protected pages such as booking, payment and my bookings require the
user to be authenticated.

------------------------------------------------------------------------

## 🧭 Application Flow

``` text
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

------------------------------------------------------------------------

## 🏗️ Project Structure

``` text
TravelGo/
│
├── TravelAgency.API/
│   ├── TravelAgency.API.sln
│   │
│   └── TravelAgency.API/
│       ├── Authentication/
│       ├── Controllers/
│       ├── Data/
│       ├── DTOs/
│       ├── Interfaces/
│       ├── Mappings/
│       ├── Migrations/
│       ├── Models/
│       ├── Repositories/
│       ├── Services/
│       ├── wwwroot/
│       │   └── uploads/
│       │
│       ├── Program.cs
│       └── appsettings.json
│
├── travel-agency/
│   ├── src/
│   │   ├── app/
│   │   │   ├── admin/
│   │   │   ├── core/
│   │   │   └── pages/
│   │   ├── environments/
│   │   └── ...
│   │
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

------------------------------------------------------------------------

## ⚙️ Prerequisites

Make sure the following are installed:

-   Node.js
-   npm
-   Angular CLI
-   .NET 8 SDK
-   SQL Server / SQL Server LocalDB
-   Visual Studio or Visual Studio Code
-   Git

------------------------------------------------------------------------

## 🔧 Backend Setup

### 1. Navigate to the API project

``` bash
cd TravelAgency.API/TravelAgency.API
```

### 2. Restore NuGet packages

``` bash
dotnet restore
```

### 3. Configure the database

Update the connection string in `appsettings.json` according to your SQL
Server setup.

Example:

``` json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=TravelAgencyDB;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

> Do not commit production credentials or private secrets to GitHub.

### 4. Apply migrations

``` bash
dotnet ef database update
```

### 5. Run the backend

``` bash
dotnet run
```

The API will run on the configured HTTPS/HTTP development URL.

Swagger can be opened from the URL shown by the ASP.NET Core
application.

------------------------------------------------------------------------

## 💻 Frontend Setup

### 1. Navigate to Angular project

``` bash
cd travel-agency
```

### 2. Install dependencies

``` bash
npm install
```

### 3. Start Angular development server

``` bash
ng serve
```

Open:

``` text
http://localhost:4200
```

------------------------------------------------------------------------

## 🔗 Main API Modules

The backend contains APIs for:

``` text
Auth
Destination
Package
Package Image
Hotel
Hotel Image
Booking
My Booking
User
Inquiry
Dashboard
Image Upload
```

------------------------------------------------------------------------

## 🗄️ Main Database Entities

The project contains entities including:

-   User
-   Role
-   Destination
-   Package
-   Hotel
-   Booking
-   PackageImage
-   HotelImage
-   Inquiry

Entity relationships are managed using **Entity Framework Core**.

------------------------------------------------------------------------

## 🛡️ Security

The project follows several security practices:

-   JWT authentication
-   Password hashing with BCrypt
-   Protected Angular routes
-   Authorization headers through HTTP interceptor
-   Environment-based API configuration
-   Sensitive development configuration excluded through `.gitignore`

------------------------------------------------------------------------

## 📦 GitHub Repository

**Repository:** TravelGo

``` text
https://github.com/sujald3505/TravelGo
```

------------------------------------------------------------------------

## 👨‍💻 Author

**Sujal Dudhatra**

GitHub:

``` text
https://github.com/sujald3505
```

------------------------------------------------------------------------

## 📌 Project Status

TravelGo is being developed as a complete full-stack Travel Agency
application with a customer-facing website and an administrative
management panel.

------------------------------------------------------------------------

## 📄 License

This project is developed for learning, portfolio and educational
purposes.
