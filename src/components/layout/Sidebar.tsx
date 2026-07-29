import { useEffect, useState } from "react"
import NavItem from "@/components/ui/NavItem"
import { useSidebar } from "@/context/SideBarContext"
import { useTimezone } from "@/context/TimezoneContext"
import {
    LayoutDashboard,
    Package,
    Users,
    BarChart3,
    Settings,
    Clock as ClockIcon
} from 'lucide-react'



export default function Sidebar(){
    const { isOpen, closeSidebar } = useSidebar()
    
    

    function SideBarClock(){
        const { timezone } = useTimezone()
        const [time, setTime] = useState<Date | null>(null)


        useEffect(()=>{
            setTime(new Date())

            const timer = setInterval(()=>{
                setTime(new Date())
            }, 1000)

            return () => clearInterval(timer)
        }, [])

        if(!time) return  null

        const timeString = time.toLocaleTimeString([], {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })

        const dateString = time.toLocaleDateString([], {
            timeZone: timezone,
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        })

        return (
            <div className="mb-4 rounded-xl bg-slate-800/80 p-3 text-slate-300 border border-slate-700/50 shadow-inner">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                    <ClockIcon size={14} className="text-blue-400" />
                    <span>{dateString}</span>
                </div>
                <span className="text-[10px] uppercase font-semibold text-blue-400 bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-800/50">
                    {timezone.split("/")[1] || timezone}
                </span>
                <div className="mt-1 font-mono text-xl font-bold tracking-wider text-white">
                    {timeString}
                </div>
            </div>
        )

    }



    
    return(
        <aside className={`
            fixed
            left-0
            top-0
            z-50
            h-screen
            w-72
            bg-slate-900
            p-4
            transition-transform
            duration-300
            ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }
            lg:sticky
            lg:top-0
            lg:translate-x-0
            lg:shrink-0
        `}>
            <h1 className="text-2xl font-bold text-white">Dashboard SaaS</h1>

            <nav className="mt-8 flex flex-col gap-2">
                <SideBarClock/>
                <NavItem to="/" label="Dashboard" icon={LayoutDashboard} onClick={closeSidebar} />
                <NavItem to="/products" label="Products" icon={Package} onClick={closeSidebar} />
                <NavItem to="/customers" label="Customers" icon={Users} onClick={closeSidebar}/>
                <NavItem to="/analytics" label="Analytics" icon={BarChart3} onClick={closeSidebar}/>
                <NavItem to="/settings" label="Settings" icon={Settings} onClick={closeSidebar}/>
            </nav>
        </aside>
    )
}