import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { useTranslation } from "react-i18next"
import {
    Settings,
    LogOut,
    ChevronDown
} from 'lucide-react'




export default function UserMenu(){
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { user, logout } = useAuth()
    const [open, setOpen] = useState<boolean>(false)
    const menuRef = useRef<HTMLDivElement | null>(null)



    useEffect(()=>{
        function handleClickOutside(event:MouseEvent){
            if(menuRef.current && !menuRef.current.contains(event.target as Node)){
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return ()=>{
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])


    useEffect(()=>{
        function handleEscape(event:KeyboardEvent){
            if(event.key === 'Escape'){
                setOpen(false)
            }            
        }
        document.addEventListener('keydown', handleEscape)

        return () => document.removeEventListener('keydown', handleEscape)
    }, [])

    return(
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3 rounded-lg p-2 transition hover:bg-slate-100 cursor-pointer">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-700 text-sm font-bold text-white shadow-md">
                        FF
                    </div>
                    <div className="hidden text-left md:block">
                        <p className="text-sm font-semibold">
                            {user?.name || 'Guest'}
                        </p>
                        <p className="text-xs text-slate-500">
                            {t(user?.role || 'Member')}
                        </p>
                    </div>
                    <ChevronDown size={18}/>
                </button>
                
                <div className={`
                    absolute
                    right-0
                    mt-2
                    w-56
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    shadow-xl
                    overflow-hidden
                    z-50
                    origin-top-right
                    transition-all
                    duration-200
                    ${open ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'}
                `}>
                    
                    <button 
                        onClick={()=>{
                            navigate('/settings')
                            setOpen(false)
                        }}
                        className="flex w-full items-center gap-3 px-4 py-3 hover:bg-slate-100 cursor-pointer">
                        <Settings size={18}/>   
                        Settings
                    </button>

                    <hr/>

                    <button
                        onClick={()=> logout()} 
                        className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 cursor-pointer">
                        <LogOut size={18}/>
                        Logout
                    </button>

                </div>
        </div>
    )
}