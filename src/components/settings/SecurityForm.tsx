import Button from "@/components/ui/Button"
import { useAuth } from "@/context/AuthContext"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"




export default function SecurityForm() {
    const { t } = useTranslation()
    const { user, updatePassword } = useAuth()
    const [currentPassword, setCurrentPassword] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    
    
    
    async function handleChangePassword(){
        if(!user){
            toast.error(t('User is not authenticated'))
            return
        }

        if(!currentPassword || !password || !confirmPassword){
            toast.error(t('Pleasde fill in all the fields'))
            return
        }

        if(password !== confirmPassword){
            toast.error(t('The password and its confirmation do not match'))
            return
        }

        try{
            setIsSubmitting(true)

            await updatePassword({ currentPassword, newPassword: password })
            toast.success(t('Password changed successfully'))
            
            setCurrentPassword('')
            setPassword('')
            setConfirmPassword('')
        }catch(e:any){
            toast.error(e?.response?.data?.message || e?.response?.data || e?.message)
        }finally{
            setIsSubmitting(false)
        }
    }



    return (
        <section className="rounded-xl bg-white p-6 shadow-sm">            
            <h2 className="mb-6 text-xl font-semibold">{t('Security')}</h2>
            <div className="space-y-5">
                <input
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    type="password"
                    placeholder={t("Current password")}
                    className="w-full rounded-lg border border-slate-300 p-3"/>

                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder={t("New password")}
                    className="w-full rounded-lg border border-slate-300 p-3"/>

                <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    placeholder={t("Confirm password")}
                    className="w-full rounded-lg border border-slate-300 p-3"/>
            </div>

            <div className="mt-6 flex justify-end">
                <Button 
                    disabled={isSubmitting}
                    onClick={handleChangePassword}>{t('Update Password')}</Button>
            </div>

        </section>

    )
}