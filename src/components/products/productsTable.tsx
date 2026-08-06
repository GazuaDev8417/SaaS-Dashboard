import { Pencil, Trash2 } from "lucide-react"
import ProductsStatusBadge from "./productsStatusBadge"
import type { Product } from "@/services/apiServices"
import { useTranslation } from "react-i18next"



interface ProductsTableProps{
    products:Product[]
    onEdit: (product:Product) => void
    onDelete: (product:Product) => void
}



export default function ProductsTable({ products, onEdit, onDelete }:ProductsTableProps){
    const { t } = useTranslation()
    return(
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead>
                    <tr className="border-b border-slate-200 text-left">
                        <th className="p-4">{t('Product')}</th>
                        <th>{t('Category')}</th>
                        <th>{t('Price')}</th>
                        <th>{t('Stock')}</th>
                        <th>{t('Status')}</th>
                        <th>{t('Actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product)=>(
                        <tr 
                           key={product.id}
                           className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="p-4 font-medium">
                                {product.name}
                            </td>
                            <td>{t(product.category)}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                            <td>
                                <ProductsStatusBadge
                                    status={t(product.status) as 'Active' | 'Inactive' | 'Low Stock'}/>
                            </td>
                            <td>
                                <button 
                                    className="text-blue-600 cursor-pointer"
                                    onClick={() => onEdit(product)}>
                                    <Pencil
                                        size={18}/>
                                </button>
                            </td>
                           </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}