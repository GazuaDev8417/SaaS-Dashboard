import { useAuth } from "@/context/AuthContext"
import LoginPage from "@/pages/login/LoginPage"
import { Outlet } from "react-router-dom"
import Header from "../components/layout/Header"
import Sidebar from "../components/layout/Sidebar"



export default function AppLayout(){
    const { user, token, isLoading } = useAuth()

    if (isLoading) {
        return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
            Loading session...
        </div>
        )
    }


    if (!token || !user) {
        return <LoginPage />
    }


    return(
        <div className="flex min-h-screen">
            <Sidebar/>
            <div className="flex flex-1 flex-col">
                <Header/>

                <main className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-6">
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}