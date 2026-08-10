import { useState, useEffect } from "react"
import { productService, type Product } from "@/services/apiServices"
import ProductsToolBar from "@/components/products/productsToolBar"
import ProductsTable from "@/components/products/productsTable"
import ProductModal from "@/components/products/ProductModal"
import DashboardWidget from "@/components/dashboard/DashboardWidget"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"




export default function ProductsPage(){
    const { t } = useTranslation()
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')
    const [category, setCategory] = useState<string>('')
    const [status, setStatus] = useState<string>('')
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)




    useEffect(()=>{
        loadProducts()
    }, [])




    const loadProducts = async()=>{
        try{
            setLoading(true)
            const data = await productService.getAll()
            setProducts(data)
        }catch(e:any){
            toast.error(e?.response?.data?.message || e?.response?.data || e?.message)
        }finally{
            setLoading(false)
        }
    }



    const filteredProducts = products.filter((product)=>{
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
        const matchesCategory = category === '' || product.category === category
        const matchesStatus = status === '' || product.status === status

        return matchesSearch && matchesCategory && matchesStatus
    })


    const handleUpdateProduct = async(productData:Product)=>{
        try{

            if(productData.stock === 0){
                toast('Once the stock has depleted the product will no longer be visible in client platform', {
                    action: {
                        label: 'Confirm',
                        onClick: async()=>{
                            await productService.update(productData.id, productData)
                            toast.success('Product updated successfully')
                            setIsModalOpen(false)
                            setEditingProduct(null)
                            loadProducts()
                        }
                    },
                    cancel: {
                        label: 'Cancel',
                        onClick: () => toast.success('Update was canceled') 
                    }
                })
            }else{
                await productService.update(productData.id, productData)
                toast.success('Product updated successfully')
                setIsModalOpen(false)
                setEditingProduct(null)
                loadProducts()
            }
        }catch(error:any){
            toast.error(error?.response?.data?.message || error?.response?.data || error?.message)
        }
    }
    
    

    

    return(
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="flex-3xl font-bold text-slate-800">{t('Products')}</h1>
                    <p className="mt-1 text-slate-500">
                        {t('Manage your products and inventory')}
                    </p>
                </div>
            </div>
            <ProductsToolBar
                search={search}
                onSearchChange={setSearch}
                category={category}
                onCategoryChange={setCategory}
                status={status}
                onStatusChange={setStatus}
                categories={Array.from(new Set(products.map(p => p.category)))}
                />
            {loading ? (
                <div className="p-8 text-center text-slate-500">Loading products...</div>
            ) : (
                <DashboardWidget title="Products Table">
                    <ProductsTable 
                        products={filteredProducts}
                        onEdit={(product)=>{
                            setEditingProduct(product)
                            setIsModalOpen(true)
                        }}/>
                </DashboardWidget>
            )}
            <ProductModal 
                open={isModalOpen} 
                onClose={() =>{
                    setIsModalOpen(false)
                    setEditingProduct(null)
                }}
                onUpdateProduct={handleUpdateProduct}
                product={editingProduct}/>
        </section>
    )
}