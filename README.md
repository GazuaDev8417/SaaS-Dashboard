# 📈 SaaS Analytics & Management Dashboard

[![Live Demo](https://img.shields.io/badge/Live_App-Try_It_Now-2ea44f?style=for-the-badge&logo=vercel)](https://dashboard-project-nu-one.vercel.app/)
[![Portfolio](https://img.shields.io/badge/Author-Flamarion_França-007acc?style=for-the-badge&logo=render)](https://portfolio-vtu0.onrender.com)

> **Ecosystem Core:** The *SaaS Dashboard* functions as the overarching Business Intelligence (BI) engine for the platform. It aggregates revenue, transaction volumes, user growth, and merchant performance generated across **[My Delivery](https://my-delivery-silk.vercel.app)** and **[My Delivery Provider](https://my-delivery-provider.vercel.app)**.

---

## ⚡ Interactive Live Demo

Explore the analytics and platform management suite:

* 🌐 **Live SaaS Application:** [https://dashboard-project-nu-one.vercel.app/](https://dashboard-project-nu-one.vercel.app/) 
* 🌐 **Live My Delivery Application** (source of data analyzed by the SaaS): [https://my-delivery-silk.vercel.app](https://my-delivery-silk.vercel.app)
* 💼 **Developer Portfolio:** [https://portfolio-vtu0.onrender.com](https://portfolio-vtu0.onrender.com)

> 💡 **Try this flow:** Navigate through the live analytics overview, adjust internationalization settings (`i18next`), inspect customer management modules, and test schema-validated user settings forms.

---

## 🌟 Why Test This Application?

Built using **Vite**, **React**, **TypeScript**, **Tailwind CSS**, and **Zod**, this project demonstrates how to structure large-scale, production-ready enterprise dashboards with strict type safety, modular component architecture, and internationalization:

* **⚡ Ultra-Lean Vite + Tailwind Build Engine:** Optimized bundle size with near-instant hot module replacement (HMR) and utility-first responsive layout structures.
* **🛡️ Type-Safe Form Validation:** Powered by **React Hook Form** and **Zod**, enforcing strict schema validation and runtime type checking for profile and security operations.
* **🌐 Internationalization (i18n): Language switching between English and Portuguese configured via i18next.
* **🎨 Scalable Design System:** Reusable UI components built with **Lucide React** icons and modular CSS abstractions to ensure visual consistency across screens.

---

## 🏛️ Ecosystem Overview

```text
   ┌───────────────────────┐         ┌───────────────────────────────┐
   │      My Delivery      │         │     My Delivery Provider      │
   │  (Customer Ordering)  │         │    (Merchant Operations)      │
   └───────────┬───────────┘         └───────────────┬───────────────┘
               │                                     │
               └─────────────────┬───────────────────┘
                                 ▼
                     ┌───────────────────────┐
                     │    SaaS Dashboard     │
                     │  (Analytics & BI Hub) │
                     └───────────────────────┘