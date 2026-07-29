/* import Switch from "@/components/ui/Switch"
import { useTheme } from "@/context/ThemeContext" */
import TimezoneSettings from "../timezone/TimezoneSelect"
import { useTranslation } from "react-i18next"





export default function PreferencesForm(){
    const { i18n } = useTranslation()
    const { t } = useTranslation()
    
    

    return(
        <section className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">{t('Preferences')}</h2>
            <div className="space-y-5">
                <div>
                    <label className="mb-2 block">{t('Language')}</label>
                    <select
                        value={i18n.language}
                        onChange={(e) => i18n.changeLanguage(e.target.value)} 
                        className="w-full rounded-lg border border-slate-300 p-3">

                        <option value="en">English</option>
                        <option value="pt">Portuguese</option>                    
                    </select>
                    <div>
                        <TimezoneSettings/>
                    </div>
                </div>
            </div>
        </section>
    )
}