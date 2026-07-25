import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useTranslation } from "react-i18next"


interface TimezoneContextType {
    timezone: string
    setTimezone: (tz: string) => void
}

const TimezoneContext = createContext<TimezoneContextType | undefined>(undefined)


export function TimezoneProvider({ children }: { children:ReactNode}){
    const { t } = useTranslation()
    const [timezone, setTimezoneState] = useState<string>(()=>{
        return localStorage.getItem('app_timezone') || Intl.DateTimeFormat().resolvedOptions().timeZone
    })
    
    const setTimezone = (tz:string)=>{
        setTimezoneState(tz)
        localStorage.setItem('app_timezone', tz)
    }

    return(
        <TimezoneContext value={{ timezone, setTimezone }}>
            { children }
        </TimezoneContext>
    )
}


export function useTimezone(){
    const context = useContext(TimezoneContext)
    if(!context){
        throw new Error('useTimezone must be used within a TimezoneProvider')
    }
    return context
}