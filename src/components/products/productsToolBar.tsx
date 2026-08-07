import { Search } from "lucide-react"
import { useTranslation } from "react-i18next"



interface ProductsToolBarProps{
    search:string
    onSearchChange: (value:string) => void

    category:string
    onCategoryChange: (value:string) => void

    status:string
    onStatusChange: (value:string) => void

    categories: string[]
}


export default function ProductsToolBar({
    search,
    onSearchChange,
    category,
    onCategoryChange,
    status,
    onStatusChange,
    categories
}:ProductsToolBarProps){
    const { t } = useTranslation()


    return(
        <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:w-80">
                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                
                <input 
                    type="text"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder={t("Search products")}
                    className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-4 outline-none focus:border-blue-500" />
            </div>
            <div className="flex gap-3">
                <select 
                    value={category}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="rounded-lg border border-slate-300 px-3 py-2">
                    <option value="">{t('All Categories')}</option>
                    {categories.map(cat=>(
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <select 
                    value={status}
                    onChange={(e) => onStatusChange(e.target.value)}
                    className="rounded-lg border border-slate-300 px-3 py-2">
                    <option value="">{t('All Status')}</option>
                    <option value="Active">{t('Active')}</option>
                    <option value="Inactive">{t('Inactive')}</option>
                    <option value="Low Stock">{t('Low Stock')}</option>
                </select>
            </div>
        </div>
    )
}