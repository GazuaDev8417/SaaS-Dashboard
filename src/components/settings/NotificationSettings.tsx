import { useState, useEffect } from "react"
import { settingsService, type NotificationsSettingsData } from "@/services/apiServices"
import Switch from "@/components/ui/Switch"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"




export default function NotificationsSettings(){
    const { t } = useTranslation()
    const [notifications, setNotifications ] = useState<NotificationsSettingsData>({
        emailNotifs: true,
        marketingEmails: true,
        pushNotifs: true
    })


    useEffect(()=>{
        async function loadSettings(){
            try{
                const data = await settingsService.getNotifications()
                setNotifications(data)
            }catch(e:any){
                toast.error(e?.resonse?.data?.message || e?.response?.data || e?.message)
            }
        }
        loadSettings()
    }, [t])


    async function handleToggle(key: keyof NotificationsSettingsData){
        const nextValue = !notifications[key]
        const previousNotifications = { ...notifications}

        const updatedNotifications = {
            ...notifications,
            [key]: nextValue
        }

        setNotifications(updatedNotifications)
        const featureName = t(key)

        toast.success(
            nextValue
                ? t('enabledMessage', { feature: featureName })
                : t('disabledMessage', { feature: featureName })
        )
        try{
            await  settingsService.updateNotifications(updatedNotifications)
        }catch(e:any){
            setNotifications(previousNotifications)
            toast.error(e?.response?.data?.message || e?.response?.data || e?.message)
        }
    }


    return(
        <section className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">{t('Notifications')}</h2>
            <div className="space-y-5">
                <label className="flex items-center justify-between">
                    <span>{t('Email Notifications')}</span>
                    <Switch
                        checked={notifications.emailNotifs}
                        onChange={() => handleToggle('emailNotifs')}/>
                </label>

                <label className="flex items-center justify-between">
                    <span>{t('Push Notifications')}</span>
                    <Switch
                        checked={notifications.pushNotifs}
                        onChange={() => handleToggle('pushNotifs')}/>
                </label>

                <label className="flex items-center justify-between">
                    <span>{t('Marketing Emails')}</span>
                    <Switch
                        checked={notifications.marketingEmails}
                        onChange={() => handleToggle('marketingEmails')}/>
                </label>

            </div>
        </section>
    )
}