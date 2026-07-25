import { useEffect, useState } from 'react'
import { analyticsService, type RevenueData } from '@/services/apiServices'
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    CartesianGrid,
    Tooltip,
    YAxis
} from 'recharts'
import { useTranslation } from "react-i18next"
import { toast } from 'sonner'




export default function SalesChart(){
    const { t } = useTranslation()
    const [data, setData] = useState<RevenueData[]>([])


    useEffect(()=>{
        analyticsService.getRevenue().then(res=>{
            const translated = res.map(item=>({
                ...item,
                month: t(item.month)
            }))
            setData(translated)
        }).catch((e:any)=>{
            toast.error(e?.response?.data?.message || e?.response?.data || e?.message)
        })
    }, [t])


    const translatedData = data.map((item)=>({
        ...item,
        month: t(item.month)
    }))

    return(
        <div className="h-80">
            <ResponsiveContainer>
                <LineChart data={translatedData}>
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
    )
}