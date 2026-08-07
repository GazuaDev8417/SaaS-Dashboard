import { Pencil } from 'lucide-react'
import type { Customer } from '@/services/apiServices'
import { useTranslation } from 'react-i18next'


interface CustomersTableProps{
    customers:Customer[]
    onEdit:(customer:Customer) => void
}


export default function CustomersTable({
    customers,
    onEdit
}:CustomersTableProps){
    const { t } = useTranslation()
    if(customers.length === 0){
        return(
            <div className="rounded-xl bg-white p-12 text-center shadow-sm">
                <h2 className="text-xl font-semibold text-slate-700">
                    {t("No customers found")}
                </h2>

                <p className="mt-2 text-slate-500">
                    {t("Try another search or add a new customer.")}
                </p>
            </div>
        )
    }

    return(
        <div className="overflow-x-auto">

            <table className="w-full">

                <thead className="bg-slate-50">

                    <tr className="text-left">

                        <th className="px-6 py-4">{t('Customer')}</th>
                        <th className="px-6 py-4">{t('Email')}</th>
                        <th className="px-6 py-4">{t('Phone')}</th>

                    </tr>

                </thead>

                <tbody>

                    {customers.map((customer) => (

                        <tr
                            key={customer.id}
                            className="border-t border-slate-200"
                        >

                            <td className="px-6 py-4">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">

                                        {customer.username
                                            .split(" ")
                                            .map((name) => name[0])
                                            .join("")
                                            .slice(0, 2)}

                                    </div>

                                    <span>{customer.username}</span>

                                </div>

                            </td>

                            <td className="px-6 py-4">
                                {customer.email}
                            </td>

                            <td className="px-6 py-4">
                                {customer.phone}
                            </td>

                            <td className="px-6 py-4">
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    )
}