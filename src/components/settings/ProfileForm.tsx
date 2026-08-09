import Button from "@/components/ui/Button"
import { useAuth } from "@/context/AuthContext"
import { useState, useEffect, type KeyboardEvent } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"




export default function ProfileForm({ onSuccess }: { onSuccess?: () => void }){
    const { updateProfile, user } = useAuth()
    const [name, setName] = useState<string>(user?.name ?? '')
    const [phone, setPhone] = useState<string>(user?.phone ?? '')
    const [address, setAddress] = useState<string>(user?.address ?? '')
    const { t } = useTranslation()



    useEffect(() => {
        if(user){
            setName(user.name)
            setPhone(user.phone)
            setAddress(user.address)
        }
    }, [user])



    const handleKeyPress = (e:KeyboardEvent<HTMLInputElement>) => {
        const allowedKeys = [
            'Backspace',
            'Delete',
            'Tab',
            'Escape',
            'Enter',
            'ArrowLeft',
            'ArrowRight',
            'Home',
            'End'
        ]

        if(allowedKeys.includes(e.key)) return

        if(e.ctrlKey || e.metaKey) return

        if(!/^[0-9]$/.test(e.key)) e.preventDefault()
    }
    

    const handleUpdate = async(name:string, phone:string, address:string)=>{
        try{
            await updateProfile({name, phone, address})
            toast.success('User updated successfully')
            onSuccess?.()
        }catch(e:any){
            toast.error(e?.response?.data?.message || e?.response?.data || e?.message)
        }
    }



    return(
        <section className="rounded-xl bg-white p-6 shadow-sm">
            <div className="bg-gray-500 m-2.5 p-2.5 rounded-md text-gray-100">
                <small>
                    You won't can change the email <br /> because it's a credential to access the application.
                </small>
            </div>
            <h2 className="mb-6 text-xl font-semibold">{t('Profile')}</h2>
            <div>
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        {t('Full Name')}
                    </label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 p-3"/>
                    
                </div>
            </div>
            <div className="mt-5">
                <label className="mb-2 block text-sm font-medium">{t('Phone')}</label>
                <input
                    value={phone}
                    maxLength={11}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 p-3"/>
                
                <label className="mb-2 block text-sm font-medium">{t('Address')}</label>
                <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 p-3"/>
            </div>
            <div className="mt-6 flex justify-end">
                <Button onClick={() => handleUpdate(name, phone, address)}>
                    {t('Save Profile')}
                </Button>
            </div>
        </section>
    )
}