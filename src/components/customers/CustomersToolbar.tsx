import { Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'



interface CustomersToolbarProps{
    search:string
    onSearchChange: (value:string) => void
}


export default function CustomersToolbar({
    search,
    onSearchChange
}:CustomersToolbarProps){
    const { t } = useTranslation()
    return(
        <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">

            <div className="relative w-full md:w-80">

                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder={t("Search customers...")}
                    className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-4 outline-none focus:border-blue-500"
                />

            </div>
        </div>
    )
}