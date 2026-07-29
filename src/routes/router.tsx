import type { ReactNode } from "react"
import { createBrowserRouter, Navigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import LoginPage from "@/pages/login/LoginPage"
import AnalyticsPage from "@/pages/analytics/AnalyticsPage"
import CustomersPage from "@/pages/customers/CustomersPage"
import DashboardPage from "@/pages/dashboard/DashboardPage"
import NotFoundPage from "@/pages/not-found/NotFoundPage"
import ProductsPage from "@/pages/products/ProductsPage"
import SettingsPage from "@/pages/settings/SettingsPage"
import AppLayout from "@/layouts/AppLayout"




interface ProtectedRouteProps{
    children:ReactNode
}


function ProtectedRoute({ children }:ProtectedRouteProps){
    const { user, token, isLoading } = useAuth()

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
                Loading session...
            </div>
        )
    }

    if (!token && !user) {
        return <Navigate to="/login" replace />
    }

    return<>{children}</>
}

const router = createBrowserRouter([
    {
        path: 'login',
        element: <LoginPage/>,
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <AppLayout/>
            </ProtectedRoute>
        ),
        errorElement: <NotFoundPage/>,
        children: [
            {
                index: true,
                element: <DashboardPage/>,
            },
            {
                path: 'analytics',
                element: <AnalyticsPage/>
            },
            {
                path: 'customers',
                element: <CustomersPage/>
            },
            {
                path: 'products',
                element: <ProductsPage/>
            },
            {
                path: 'settings',
                element: <SettingsPage/>
            }
        ]
    }
])


export default router