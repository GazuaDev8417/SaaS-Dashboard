import { useEffect, useState } from "react"
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts"
import { useTranslation } from "react-i18next"
import { orderService, type OrdersByMonth } from "@/services/apiServices"
import { toast } from "sonner"




export default function OrdersChart() {
    const { t } = useTranslation()
    const [chartData, setChartData] = useState<OrdersByMonth[]>([])
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nove", "Dec"
    ]



    useEffect(()=>{
        orderService.getByMonth().then(data=>{
            const translatedData = data.map(item=>({
                ...item,
                month: t(months[Number(item.month.split('-')[1]) - 1])
            }))
            setChartData(translatedData)
        }).catch((e:any)=>{
            toast.error(e?.response?.data?.message || e?.response?.data || e?.message)
        })
    }, [t])





    return (
        <div className="rounded-xl bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold">
                {t("Orders by Month")}
            </h2>

            <div className="h-80">

                <ResponsiveContainer width="100%" height="100%">

                    <BarChart data={chartData}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="month" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="orders"
                            fill="#2563eb"
                            radius={[8, 8, 0, 0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>
    )
}