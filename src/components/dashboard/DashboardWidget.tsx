import { useTranslation } from "react-i18next"

interface DashboardWidgetProps{
    title:string
    children:React.ReactNode
}


export default function DashboardWidget({ title, children }:DashboardWidgetProps){
    const { t } = useTranslation()
    return(
        <section className="reounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-800">
                {t(title)}
            </h2>
            {children}
        </section>
    )
}