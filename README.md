# 📈 SaaS Analytics & Control Panel — Business Intelligence Hub

[![Live Demo](https://img.shields.io/badge/Live_App-Try_It_Now-2ea44f?style=for-the-badge&logo=vercel)](https://dashboard-project-nu-one.vercel.app/)
[![Portfolio](https://img.shields.io/badge/Author-Flamarion_França-007acc?style=for-the-badge&logo=render)](https://portfolio-vtu0.onrender.com)

> **Ecosystem Core:** The *SaaS Control Panel* serves as the centralized Business Intelligence (BI) engine of the platform. It aggregates revenue streams, transaction volumes, platform user growth, and merchant performance generated across **[My Delivery](https://my-delivery-silk.vercel.app)** and **[My Delivery Provider](https://my-delivery-provider.vercel.app)**, powered by **My Delivery Server**.

---

## ⚡ Interactive Live Demo

Explore platform analytics and management controls directly in your browser:

* 🌐 **Live SaaS Application:** [https://dashboard-project-nu-one.vercel.app/](https://dashboard-project-nu-one.vercel.app/) 
* 🛒 **Live Customer Application (Data Source):** [https://my-delivery-silk.vercel.app](https://my-delivery-silk.vercel.app)
* 💼 **Developer Portfolio:** [https://portfolio-vtu0.onrender.com](https://portfolio-vtu0.onrender.com)

🔑 **Demo Access Credentials:**
* **Admin 1:** `admin1@example.com` | Password: `password123`
* **Admin 2:** `admin2@example.com` | Password: `password123`

> 💡 **Suggested Test Flow:** Log in with one of the credentials above, navigate through the live analytics dashboard, test real-time internationalization switching (`i18next`), inspect merchant and customer management modules, and test schema-validated settings forms.

---

## 🌟 Technical Highlights & Engineering Decisions

Built using **Vite**, **React**, **TypeScript**, **Tailwind CSS**, and **Zod**, this dashboard demonstrates how to architect production-ready enterprise intelligence tools with strict type safety, modular UI systems, and global readiness:

* **⚡ Optimized Vite + Tailwind Infrastructure:** Features minimal bundle footprints, instant Hot Module Replacement (HMR), and utility-first responsive layout architecture.
* **🛡️ Type-Safe Form & Schema Validation:** Leverages **React Hook Form** paired with **Zod** schema inference for strict runtime input checking and error handling across platform configuration panels.
* **🌐 Enterprise Internationalization (i18n):** Real-time language switching (English and Portuguese) using `i18next` with modular translation namespace loading.
* **🎨 Scalable Design System:** Reusable, accessible UI components built with **Lucide React** and Tailwind CSS abstractions for visual consistency across complex analytical views.
* **📊 Ecosystem Data Aggregation:** Designed to ingest, process, and display real-time order volumes, financial tracking, and platform performance metrics.

---

## 🏛️ Ecosystem Architecture & Data Aggregation

```text
  ┌───────────────────────────┐         ┌───────────────────────────┐
  │   My Delivery (Client)    │         │   My Delivery Provider    │
  │   (Customer Transactions) │         │   (Merchant Operations)   │
  └─────────────┬─────────────┘         └─────────────┬─────────────┘
                │                                     │
                └──────────────────┬──────────────────┘
                                   │
                                   ▼
                      ┌───────────────────────────┐
                      │    My Delivery Server     │
                      │     (Centralized API)     │
                      └────────────┬──────────────┘
                                   │
                                   ▼
                      ┌───────────────────────────┐
                      │    SaaS Control Panel     │
                      │   (Analytics & BI Hub)    │
                      └───────────────────────────┘