import { Pencil, Trash2 } from 'lucide-react'
import type { Customer } from '@/services/apiServices'
import { useTranslation } from 'react-i18next'


interface CustomersTableProps{
    customers:Customer[]
    onEdit:(customer:Customer) => void
    onDelete:(customer:Customer) => void
}


export default function CustomersTable({
    customers,
    onEdit,
    onDelete
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
                        <th className="px-6 py-4">{t('Status')}</th>
                        <th className="px-6 py-4 text-center">
                            {t('Actions')}
                        </th>

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

                                        {customer.name
                                            .split(" ")
                                            .map((name) => name[0])
                                            .join("")
                                            .slice(0, 2)}

                                    </div>

                                    <span>{customer.name}</span>

                                </div>

                            </td>

                            <td className="px-6 py-4">
                                {customer.email}
                            </td>

                            <td className="px-6 py-4">
                                {customer.phone}
                            </td>

                            <td className="px-6 py-4">

                                <span
                                    className={
                                        customer.status === "Active"
                                            ? "rounded-full bg-green-100 px-3 py-1 text-sm text-green-700"
                                            : "rounded-full bg-red-100 px-3 py-1 text-sm text-red-700"
                                    }
                                >
                                    {customer.status}
                                </span>

                            </td>

                            <td className="px-6 py-4">

                                <div className="flex justify-center gap-2">

                                    <button
                                        onClick={() => onEdit(customer)}
                                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50 cursor-pointer"
                                    >
                                        <Pencil size={18} />
                                    </button>

                                    <button
                                        onClick={() => onDelete(customer)}
                                        className="rounded-lg p-2 text-red-600 hover:bg-red-50 cursor-pointer"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    )
}