import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/queryClient"
import { Toaster } from "sonner"
import { SideBarProvider } from "./context/SideBarContext"
import { AuthProvider } from "./context/AuthContext"
import { TimezoneProvider } from "./context/TimezoneContext"
import router from "./routes/router"
import '@/i18n'

import './styles/global.css'



createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <SideBarProvider>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <TimezoneProvider>
                        <RouterProvider router={router}/>
                    </TimezoneProvider>
                </AuthProvider>
                <Toaster position="top-right" richColors/>
            </QueryClientProvider>
        </SideBarProvider>
    </StrictMode>
)