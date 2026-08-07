import { useEffect, useState } from 'react'
import { analyticsService, type RevenueData } from '@/services/apiServices'
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from 'recharts'
import { useTranslation } from "react-i18next"
import { toast } from 'sonner'




export default function RevenueChart(){
    const { t } = useTranslation()
    const [data, setData] = useState<RevenueData[]>([])
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nove", "Dec"
    ]


    useEffect(()=>{
        analyticsService.getRevenue().then(res=>{
            const translated = res.map(item=>({
                ...item,
                month: t(months[Number(item.month.split('/')[0]) -1])
            }))
            setData(translated)
        }).catch((e:any)=>{
            toast.error(e?.response?.data?.message || e?.response?.data || e?.message)
        })
    }, [t])

    
    return(
        <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">
                {t("Revenue Overview")}
            </h2>
            <div className="h-80">
                <ResponsiveContainer width='100%' height='100%'>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray='3 3'/>
                        <XAxis dataKey='month'/>
                        <YAxis/>
                        <Tooltip/>
                        <Line
                            type='monotone'
                            dataKey='revenue'
                            stroke='#2563eb'
                            strokeWidth={3}/>                        
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}