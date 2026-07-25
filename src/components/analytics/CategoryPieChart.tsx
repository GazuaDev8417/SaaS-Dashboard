import { useEffect, useState } from "react"
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts"
import { analyticsService, type CategoryData } from "@/services/apiServices"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"



const COLORS = [
    "#2563eb",
    "#10b981",
    "#f59e0b",
    "#ef4444",
]


export default function CategoryPieChart(){
    const { t } = useTranslation()
    const [data, setData] = useState<CategoryData[]>([])



    useEffect(()=>{
        analyticsService.getCategories().then(res=>{
            const translated = res.map(item=>({
                ...item,
                name: t(item.name)
            }))
            setData(translated)
        }).catch((e:any)=>{
            toast.error(e?.response?.data?.message || e?.response?.data || e?.message)
        })
    }, [])

    

    return(
        <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">
                {t("Product Categories")}
            </h2>
            <div className="h-80">
                <ResponsiveContainer width='100%' height='100%'>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey='value'
                            nameKey='name'
                            outerRadius={110}
                            label>
                            
                            {data.map((_, index)=>(
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}/>
                            ))}
                        </Pie>
                        <Tooltip/>
                        <Legend/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}