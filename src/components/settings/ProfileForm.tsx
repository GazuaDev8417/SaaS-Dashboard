import Button from "@/components/ui/Button"
import { useAuth } from "@/context/AuthContext"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"




export default function ProfileForm({ onSuccess }: { onSuccess?: () => void }){
    const { updateProfile, user } = useAuth()
    const [name, setName] = useState<string>(user?.name ?? '')
    const [email, setEmail] = useState<string>(user?.email ?? '')
    const [role, setRole] = useState<string>(user?.role ?? '')
    const { t } = useTranslation()



    useEffect(() => {
        if(user){
            setName(user.name)
            setEmail(user.email)
            setRole(user.role)
        }
    }, [user])


    const handleUpdate = async(name:string, email:string, role:string)=>{
        try{
            await updateProfile({name, email, role})
            toast.success('User updated successfully')
            onSuccess?.()
        }catch(e:any){
            toast.error(e?.response?.data?.message || e?.response?.data || e?.message)
        }
    }



    return(
        <section className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">{t('Profile')}</h2>
            <div className="grid gap-5 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        {t('Full Name')}
                    </label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 p-3"/>
                    
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 p-3"/>
                </div>
            </div>
            <div className="mt-5">
                <label className="mb-2 block text-sm font-medium">{t('Role')}</label>
                <input
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 p-3"/>
            </div>
            <div className="mt-6 flex justify-end">
                <Button onClick={() => handleUpdate(name, email, role)}>
                    {t('Save Profile')}
                </Button>
            </div>
        </section>
    )
}