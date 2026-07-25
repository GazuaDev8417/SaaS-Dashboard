import { Bell, CheckCircle2, Package, UserPlus } from "lucide-react"
import { useEffect, useState, useRef, type ReactNode } from "react"



interface Notification{
    id:number
    icon:ReactNode
    title:string
    time:string
    unread?:boolean
}

interface NotificationItemProps{
    icon:ReactNode
    title:string
    time:string
    unread?:boolean
    onClick: () => void
}




export default function NotificationMenu(){
    const menuRef = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState<boolean>(false)
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: 1,
            icon: <UserPlus size={18} />,
            title: "New customer registered",
            time: "2 min ago",
            unread: true,
        },
        {
            id: 2,
            icon: <Package size={18} />,
            title: "Product stock updated",
            time: "12 min ago",
            unread: true,
        },
        {
            id: 3,
            icon: <CheckCircle2 size={18} />,
            title: "Monthly report generated",
            time: "1 hour ago",
            unread: false,
        },
    ])



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


    function handleNotificationClick(id:number){
        setNotifications(current =>
            current.map(notification =>
                notification.id === id
                    ? {
                        ...notification,
                        unread: false
                    } : notification
            )
        )
    }


    const unreadCount = notifications.filter(notification => notification.unread).length
    const hasUnread = notifications.some(notification => notification.unread)


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
                            onClick={()=>
                                setNotifications(current =>
                                    current.map(notification => ({
                                        ...notification,
                                        unread: false
                                    })
                                )
                            )
                        }>Mark all as read</button>
                    )}
                </div>

                <div className="divide-y cursor-pointer">
                    {notifications.length > 0 ? (
                        notifications.map((notification)=>(
                        <NotificationItem
                            key={notification.id}
                            icon={notification.icon}
                            title={notification.title}
                            time={notification.time}
                            unread={notification.unread}
                            onClick={() => handleNotificationClick(notification.id)}/>
                        ))
                    ) : (
                        <div className="px-4 py-8 text-center text-sm text-slate-500">
                            No notifications
                        </div>
                    )}
                </div>
                <div className="border-t px-4 py-3 text-center">
                    <button
                        className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer">
                        View all notifications
                    </button>
                </div>
            </div>
        </div>    
    )
}


function NotificationItem({ icon, title, time, unread = false, onClick }:NotificationItemProps){
    return(
        <div
            onClick={onClick} 
            className="flex gap-3 px-4 py-4 transition hover:bg-slate-50">
            <div className="mt-1 text-blue-600">
                {icon}
            </div>

            <div className="flex flex-1 justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-800">
                        {title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                        {time}
                    </p>
                </div>
                {unread && (
                    <span className="mt-2 h-2 w-2 rounded-full bg-blue-600"/>
                )}
            </div>
        </div>
    )
}