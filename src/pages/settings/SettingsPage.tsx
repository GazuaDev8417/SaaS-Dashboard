import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import ProfileForm from "@/components/settings/ProfileForm"
import PreferencesForm from "@/components/settings/PreferencesForm"
import SecurityForm from "@/components/settings/SecurityForm"
import { useTranslation } from "react-i18next"
import { Pencil } from "lucide-react"





export default function SettingsPage(){
    const { user } = useAuth()
    const { t } = useTranslation()
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)



    const formatPhoneNumber = (phone?:string)=>{
        const digits = (phone ?? '').replace(/\D/g, '')

        if(digits.length <= 10){
            return digits.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3')
        }

        return digits.replace(/^(\d{2})(\d{5})(\d{0,4})$/, '($1) $2-$3')
    }



    return(
        <section className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">{t('Settings')}</h1>
                
                <p className="text-slate-500">
                    {t('Manage your account preferences')}
                </p>
            </div>            
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">{t('Profile Information')}</h2>
                        <p className="text-sm text-slate-500">{t('Your personal account details')}</p>                        
                    </div>
                    <button
                        onClick={() => setIsProfileModalOpen(true)}
                        className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                        aria-label={t('Edit Profile')}
                    >
                        <Pencil className="w-5 h-5 cursor-pointer" />
                    </button>
                </div>
                {user && (
                    <div className="grid gap-4 sm:grid-cols-3 text-sm">
                        <div>
                            <span className="block text-slate-400 font-medium">{t('Name')}</span>
                            <span className="text-slate-700 font-semibold">{user.name}</span>
                        </div>
                        <div>
                            <span className="block text-slate-400 font-medium">{t('Email')}</span>
                            <span className="text-slate-700 font-semibold">{user.email}</span>
                        </div>
                        <div>
                            <span className="block text-slate-400 font-medium">{t('Role')}</span>
                            <span className="text-slate-700 font-semibold">{user.role}</span>
                        </div>
                        <div>
                            <span className="block text-slate-400 font-medium">{t('Phone')}</span>
                            <span className="text-slate-700 font-semibold">{formatPhoneNumber(user.phone)}</span>
                        </div>
                        <div>
                            <span className="block text-slate-400 font-medium">{t('Address')}</span>
                            <span className="text-slate-700 font-semibold">{user.address}</span>
                        </div>
                    </div>
                )}
            </div>
            <div>
                <PreferencesForm/>
            </div>
            {/* <SecurityForm/> */}
            
            {isProfileModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-slate-800">{t('Edit Profile')}</h3>
                            <button
                                onClick={() => setIsProfileModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 text-lg font-bold cursor-pointer"
                            >
                                &times;
                            </button>
                        </div>
                        
                        {/* Pass close function to your form so it can dismiss the modal on successful submit */}
                        <ProfileForm onSuccess={() => setIsProfileModalOpen(false)} />
                    </div>
                </div>
            )}
        </section>
    )
}