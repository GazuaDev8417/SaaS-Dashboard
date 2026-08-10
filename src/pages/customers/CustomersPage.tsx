import { useState, useEffect } from "react"
import { customerService } from "@/services/apiServices"
import type { Customer } from "@/services/apiServices"
import CustomersToolbar from "@/components/customers/CustomersToolbar"
import CustomersTable from "@/components/customers/CustomersTable"
import DashboardWidget from "@/components/dashboard/DashboardWidget"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"






export default function CustomersPage(){
    const { t } = useTranslation()
    const [customers, setCustomers] = useState<Customer[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [search, setSearch] = useState('')
    



    const fetchCustomers = async()=>{
        setIsLoading(true)

        try{
            const data = await customerService.getAll()
            setCustomers(data)
        }catch(e:any){
            toast.error(e?.response?.data?.message || e?.response?.data || e?.message)
        }finally{
            setIsLoading(false)
        }
    }


    useEffect(()=>{
        fetchCustomers()
    }, [])
    
    

    const filteredCustomers = customers.filter(
        (c) =>
        c.username.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    )

     


    return(
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">{t('Customers')}</h1>
                    <p className="text-slate-500">
                        {t('Manage your customer base')}
                    </p>
                </div>
            </div>

            <CustomersToolbar
                search={search}
                onSearchChange={setSearch}/>
            
            {isLoading ? (
                <div className="rounded-xl bg-white p-12 text-center shadow-sm text-slate-500">
                    {t("Loading customers...")}
                </div>
            ) : (
                <DashboardWidget title="Customers Table">
                    <CustomersTable
                        customers={filteredCustomers}/>
                </DashboardWidget>
            )}
            <></>
        </section>
    )
}