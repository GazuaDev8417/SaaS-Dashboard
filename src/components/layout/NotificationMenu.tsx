import { useEffect, useState, useRef } from "react"
import { settingsService, type NotificationsSettingsData } from "@/services/apiServices"
import { Bell } from "lucide-react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"





interface NotificationItemProps{
    title:string
    time:string
    unread?:boolean
    onClick: () => void
}

const VITE_ORDER_NOTIFICATION_URL = import.meta.env.VITE_ORDER_NOTIFICATION_URL


export default function NotificationMenu(){
    const { t } = useTranslation()
    const menuRef = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState<boolean>(false)
    const [notifications, setNotifications] = useState<NotificationsSettingsData[]>([])
    


    useEffect(()=>{
        async function loadNotifications(){
            try{
                const data = await settingsService.getNotifications()
                setNotifications(data)
            }catch(e:any){
                toast.error(e?.response?.data?.message || e?.response?.data || e?.message)
            }
        }
        loadNotifications()
    }, [t])



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


    async function handleNotificationClick(id:string, message:string){
        try{
            await settingsService.updateNotifications(id)

            setNotifications(current =>
                current.map(notification =>
                    notification.id === id
                        ? { ...notification, is_read: true }
                        : notification
                )
            )

            if(message.startsWith('An order for') ||  message.startsWith('New order placed')){
                window.open(VITE_ORDER_NOTIFICATION_URL, '_blank')
            }
        }catch(e:any){
            toast.error(e?.response?.data?.message || e?.response?.data || e?.message)
        }        
    }


    async function handleMarkAllAsRead(){
        try{
            await settingsService.updateAll()

            setNotifications(current =>
                    current.map(notification => ({
                        ...notification,
                        is_read: true
                    })
                )
            )
        }catch(e:any){
            toast.error(e?.response?.data?.message || e?.response?.data || e?.message)
        }
    }

 
    const unreadCount = notifications.filter(notification => !notification.is_read).length
    const hasUnread = notifications.some(notification => !notification.is_read)
    


    return(
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="relative rounded-lg p-2 transition hover:bg-slate-100 cursor-pointer">
                <Bell size={22}/>
                {unreadCount > 0 && (
                    <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500"/>
                )}
            </button>

            <div
                className={`
                    fixed
                    left-4
                    right-4
                    top-16
                    z-50
                    sm:absolute
                    sm:left-auto
                    sm:right-0
                    sm:top-auto
                    sm:w-80
                    sm:max-w-none
                    mt-2
                    w-72
                    max-w-[calc(100vw-2rem)]
                    sm:w-80
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    shadow-xl
                    origin-top-right
                    transition-all
                    duration-200
                    ${
                        open
                            ? "scale-100 opacity-100"
                            : "pointer-events-none scale-95 opacity-0"
                    }`}>

                <div className="flex items-center justify-between border-b px-4 py-3">
                    <h3 className="font-semibold">Notifications</h3>
                    {hasUnread && (
                        <button
                            className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
                            onClick={handleMarkAllAsRead}>Mark all as read</button>
                    )}
                </div>

                <div className="divide-y cursor-pointer">
                    {notifications.length > 0 ? (
                        notifications.map((notification)=>(
                        <NotificationItem
                            key={notification.id}
                            title={notification.notification}
                            time={notification.created_at}
                            unread={!notification.is_read}
                            onClick={() => handleNotificationClick(notification.id, notification.notification)}/>
                        ))
                    ) : (
                        <div className="px-4 py-8 text-center text-sm text-slate-500">
                            No notifications
                        </div>
                    )}
                </div>
                <div className="border-t px-4 py-3 text-center"/>
            </div>
        </div>    
    )
}


function NotificationItem({ title, time, unread = false, onClick }:NotificationItemProps){
    return(
        <div
            onClick={onClick} 
            className="flex gap-3 px-4 py-4 transition hover:bg-slate-50">

            <div className="flex flex-1 justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-800">
                        {title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                        {new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}
                    </p>
                </div>
                {unread && (
                    <span className="mt-2 h-2 w-2 rounded-full bg-blue-600"/>
                )}
            </div>
        </div>
    )
}