import { useTimezone } from "@/context/TimezoneContext"
import { useTranslation } from "react-i18next"



export default function TimezoneSettings(){
    const { t } = useTranslation()
    const { timezone, setTimezone } = useTimezone()


    return(
        <div>
            <label className="mb-2 block font-medium text-slate-700">{t('Timezone')}</label>
            <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-3 bg-white"
            >
                <option value="UTC">UTC (Coordinated Universal Time)</option>
                <option value="America/New_York">EST / EDT (New York, GMT-5/GMT-4)</option>
                <option value="America/Chicago">CST / CDT (Chicago, GMT-6/GMT-5)</option>
                <option value="America/Los_Angeles">PST / PDT (Los Angeles, GMT-8/GMT-7)</option>
                <option value="Europe/London">GMT / BST (London)</option>
                <option value="Europe/Paris">CET / CEST (Paris)</option>
                <option value="America/Sao_Paulo">BRT (São Paulo, GMT-3)</option>
                <option value="Asia/Tokyo">JST (Tokyo, GMT+9)</option>
            </select>
        </div>
    )
}