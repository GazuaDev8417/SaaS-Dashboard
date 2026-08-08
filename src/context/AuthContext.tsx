import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { authService } from "@/services/apiServices"




type User = {
    id:number
    name:string
    email:string
    role:string
    phone:string
    address:string
}

type AuthContextType = {
    user: User | null
    token: string | null
    isLoading: boolean
    login: (credentials: { email: string; password: string }) => Promise<void>
    logout: () => void
    updateProfile: (data: { name: string; phone:string; role: string; address:string }) => Promise<void>
    updatePassword: (passwords: { currentPassword: string; newPassword: string }) => Promise<void>
    revertPassword: () => Promise<void>
}




const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }:{ children:ReactNode}){
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)




    useEffect(() => {
        async function loadUser() {
            const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token')
            if(!storedToken){
                setIsLoading(false)
                return
            }
            
            try {      
                setToken(storedToken)
                
                const userData = await authService.getCurrentUser()
                setUser(userData)
            } catch (e: any) {
                console.error("Session load failed:", e?.response?.data?.message || e?.message)
                logout()
            }finally{
                setIsLoading(false)
            }
        }

        loadUser()
    }, [])
    



    const login = async(credentials: { email:string, password:string, rememberMe?:boolean })=>{
        const data = await authService.login(credentials)
        const storage = credentials.rememberMe ? localStorage : sessionStorage
        
        storage.setItem('token', data)

        const userData = await authService.getCurrentUser()
        setToken(data.token)
        setUser(userData)
    }


    const logout = ()=>{
        localStorage.removeItem('token')
        sessionStorage.removeItem('token')
        setToken(null)
        setUser(null)
    }


    const updateProfile = async(data: { name:string, phone:string, role:string, address:string })=>{
        const updatedUser = await authService.updateProfile(data)
        setUser(updatedUser)
    }


    const updatePassword = async(password: { currentPassword:string, newPassword:string })=>(
        await authService.changePassword(password)
    )


    const revertPassword = async()=>{
        await authService.resetPassword()
    }



    return(
        <AuthContext.Provider value={{ 
            user,
            token,
            isLoading,
            login,
            logout,
            updateProfile,
            updatePassword,
            revertPassword
        }}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth(){
    const context = useContext(AuthContext)

    if(!context){
        throw new Error('useAuth must be used inside AuthProvider')
    }

    return context
}




