import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { authService } from "@/services/apiServices"




type User = {
    id:number
    name:string
    email:string
    role:string
    emailNotifs?: boolean
    pushNotifs?: boolean
    marketingEmails?: boolean
}

type AuthContextType = {
    user: User | null
    token: string | null
    isLoading: boolean
    login: (credentials: { email: string; password: string }) => Promise<void>
    logout: () => void
    updateProfile: (data: { name: string; email: string; role: string }) => Promise<void>
    updatePassword: (passwords: { currentPassword: string; newPassword: string }) => Promise<void>
}




const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }:{ children:ReactNode}){
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
    const [isLoading, setIsLoading] = useState<boolean>(true)



    useEffect(() => {
        async function loadUser() {
            if (!token) {
                setIsLoading(false)
                return
            }

            try {
                const userData = await authService.getCurrentUser()
                setUser(userData)
            } catch (e:any) {
                console.error(e?.response?.data?.message || e?.response?.data || e?.message)
                logout()
            } finally {
                setIsLoading(false)
            }
        }

        loadUser()
    }, [token])



    const login = async(credentials: { email:string, password:string, rememberMe?:boolean })=>{
        const data = await authService.login(credentials)
        
        const storage = credentials.rememberMe ? localStorage : sessionStorage
        const alternativeStorage = credentials.rememberMe ? sessionStorage : localStorage

        alternativeStorage.removeItem('token')
        storage.setItem('token', data.token)

        setToken(data.token)
        setUser(data.user)
    }


    const logout = ()=>{
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
    }


    const updateProfile = async(data: { name:string, email:string, role:string })=>{
        const updatedUser = await authService.updateProfile(data)
        setUser(updatedUser)
    }


    const updatePassword = async(password: { currentPassword:string, newPassword:string })=>(
        await authService.changePassword(password)
    )



    return(
        <AuthContext.Provider value={{ 
            user,
            token,
            isLoading,
            login,
            logout,
            updateProfile,
            updatePassword 
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




