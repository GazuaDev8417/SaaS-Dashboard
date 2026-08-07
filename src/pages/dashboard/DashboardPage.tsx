import { useEffect, useState } from "react"
import { dashboardService, type DashboardStatistics } from "@/services/apiServices"
import RecentOrdersTable from "@/components/dashboard/RecentOrdersTable"
import DashboardWidget from "@/components/dashboard/DashboardWidget"
import SalesChart from "@/components/dashboard/SalesChart"
import StatCard from "@/components/ui/StatCard"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"




export default function DashboardPage(){
    const { t } = useTranslation()
    const [data, setData] = useState<DashboardStatistics[]>([])



    useEffect(()=>{
        getStatistics()
    }, [])


    const getStatistics = async()=>{
        try{
            const statistics = await dashboardService.getStatistics()
            
            setData(statistics)
        }catch(e:any){
            toast.error(e?.response?.data?.message || e?.response?.data || e?.message)
        }
    }
    

    return(
        <section className="space-y-9">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {data.map((stat) => (
                        <StatCard
                            key={stat.title}
                            title={t(stat.title)}
                            value={stat.value}/>
                    ))}
                </div>
            <DashboardWidget title="Revenue Overview">
                <SalesChart/>
            </DashboardWidget>
            <DashboardWidget title="Recent Orders">
                <RecentOrdersTable/>
            </DashboardWidget>
        </section>
    )   
    
}