import { useState, useEffect } from "react"
import { orderService, type RecentOrder } from "@/services/apiServices"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"






export default function RecentOrdersTable(){
    const { t } = useTranslation()
    const [orders, setOrders] = useState<RecentOrder[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    

    useEffect(()=>{
        orderService.getRecent().then(data=>{
            setOrders(data)
            
        }).catch((e:any)=>{
            toast.error(e?.response?.data?.message || e?.response?.data || e?.message)
        }).finally(() => setLoading(false))
    }, [])


    if(loading){
        return <p className="py-4 text-sm text-slate-500">{t("Loading...")}</p>
    }

    

    return(
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-slate-200 text-left">
                        <th className="pb-3">{t('Customer')}</th>
                        <th className="pb-3">{t('Product')}</th>
                        <th className="pb-3">Total</th>
                        <th className="pb-3">{t('Status')}</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order)=>(
                        <tr
                            key={order.id}
                            className="border-b border-slate-100">
                            
                            <td className="py-4">{order.username}</td>
                            <td className="py-4">{t(order.product)}</td>
                            <td className="py-4">$ {order.total}</td>

                            <td>
                                <span className={
                                    order.state === 'FINISHED'
                                    ? 'rounded-full bg-green-100 px-3 py-1 text-sm text-green-700'
                                    : 'rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700'
                                }>
                                    {t(order.state === 'REQUESTED' ? 'Pending' : 'Completed')}
                                </span>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}