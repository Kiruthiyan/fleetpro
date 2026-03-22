# FleetPro

FleetPro is a **full-stack vehicle fleet management system** built to support modern fleet operations through a secure backend, scalable architecture, and a clean web interface. The project combines a **Next.js 14 + TypeScript frontend** with a **Spring Boot 3 + Java 21 backend**, using **PostgreSQL** for persistence and **JWT-based security** for authentication.

It is designed as a portfolio-quality, enterprise-style system that demonstrates full-stack development, clean project structure, secure API design, and production-oriented configuration.

---

## Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Security](#security)
- [Configuration](#configuration)
- [Installation and Setup](#installation-and-setup)
- [Build and Run](#build-and-run)
- [Screenshots](#screenshots)
- [Future Improvements](#future-improvements)
- [Author](#author)
- [License](#license)

---

## Overview

Managing a vehicle fleet efficiently requires a system that can centralize operational data, secure access to internal workflows, and provide a maintainable foundation for future growth.

FleetPro was developed as a modular full-stack application to address those needs. It separates the user-facing interface from backend business logic and database access, making the project easier to maintain, scale, and deploy.

The repository is structured into two main modules:

- **Frontend** — built with Next.js and TypeScript
- **Backend** — built with Spring Boot, Java, and PostgreSQL

This project demonstrates practical full-stack engineering using modern tools and structured architecture.

---

## Problem Statement

Organizations that manage vehicles often rely on disconnected records, manual updates, and inefficient processes. These limitations can create problems such as:

- difficulty maintaining centralized fleet data
- lack of secure access control
- poor visibility into operational workflows
- limited maintainability as the system grows
- challenges integrating a modern frontend with a secure backend

FleetPro aims to provide a strong technical foundation for solving these issues through a modern web-based fleet management solution.

---

## Solution

FleetPro addresses the above challenges through:

- a **modular frontend-backend architecture**
- a **secure backend** with Spring Security and JWT
- a **PostgreSQL database layer** for reliable persistence
- a **modern TypeScript frontend** for scalable UI development
- **environment-based configuration** for safer deployment
- **Docker support** for backend portability

The result is a project that is both portfolio-ready and extensible for real-world fleet management scenarios.

---

## Key Features

### Core Technical Features
- Full-stack project structure with separate **frontend** and **backend** modules
- Modern frontend built with **Next.js 14** and **TypeScript**
- Secure backend powered by **Spring Boot 3**
- **PostgreSQL** integration for relational data persistence
- **JWT-based authentication** foundation for protected access
- Form handling and schema validation with **React Hook Form** and **Zod**
- Client-side state management using **Zustand**
- API communication using **Axios**
- UI enhancement support through **Framer Motion** and **Radix UI**
- Backend ready for deployment with **Docker**

### Product-Level Scope
FleetPro is designed to support fleet-oriented workflows such as:

- vehicle information management
- operational record handling
- secure login and authenticated access
- administrative management flows
- scalable dashboard-based monitoring
- future expansion into analytics, reporting, and role-based operations

> Update this section further to reflect your exact implemented business features once all modules are finalized.

---

## Tech Stack

### Frontend
- **Next.js 14**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **React Hook Form**
- **Zod**
- **Zustand**
- **Axios**
- **Radix UI**

### Backend
- **Java 21**
- **Spring Boot 3.4.0**
- **Spring Web**
- **Spring Data JPA**
- **Spring Security**
- **Spring Validation**
- **PostgreSQL**
- **JJWT**

### DevOps / Deployment
- **Docker**
- **Maven Wrapper**
- Environment-based configuration

---

## Architecture

FleetPro follows a **modular full-stack architecture** where the frontend and backend are maintained as independent modules.

### High-Level Architecture

```text
Client (Browser)
   │
   ▼
Next.js Frontend
   │
   ▼
Spring Boot REST API
   │
   ▼
PostgreSQL Database
