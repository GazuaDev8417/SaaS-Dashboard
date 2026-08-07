import { useState, useEffect } from "react"
import StatCard from "@/components/ui/StatCard"
import { analyticsService, type DashboardStatistics } from "@/services/apiServices"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"



export default function AnalyticsStats(){
    const [data, setData] = useState<DashboardStatistics[]>([])
    const { t } = useTranslation()


    useEffect(()=>{
        getStatistics()
    }, [])



    const getStatistics = async()=>{
        try{
            const statistics = await analyticsService.getGrowth()
            
            setData(statistics)
        }catch(e:any){
            toast.error(e?.response?.data?.message || e?.response?.data || e?.message)
        }
    }


    return(
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {data.map(stat=>(
                <StatCard
                    key={stat.title}
                    title={t(stat.title)}
                    value={stat.title === 'Revenue' ? `R$ ${stat.value}` : stat.value }/>
            ))}
        </section>
    )
}