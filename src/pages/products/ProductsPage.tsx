import { useState, useEffect } from "react"
import { productService, type Product } from "@/services/apiServices"
import Button from "@/components/ui/Button"
import ProductsToolBar from "@/components/products/productsToolBar"
import ProductsTable from "@/components/products/productsTable"
import ProductModal from "@/components/products/ProductModal"
import type { ProductFormData } from "@/components/products/ProductModal"
import { Plus } from "lucide-react"
import ConfirmDialog from "@/components/common/ConfirmDialog"
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
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)
    const [productToDelete, setProductToDelete] = useState<Product | null>(null)




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


    const handleAddProduct = async(productData:ProductFormData)=>{
        try{
            await productService.create(productData)
            toast.success('Product created successfully')
            setIsModalOpen(false)
            loadProducts()
        }catch(error:any){
            toast.error(error?.response?.data?.message || error?.response?.data || error?.message)
        }
    }


    const handleUpdateProduct = async(productData:Product)=>{
        try{
            await productService.update(productData.id, productData)
            toast.success('Product updated successfully')
            setIsModalOpen(false)
            setEditingProduct(null)
            loadProducts()
        }catch(error:any){
            toast.error(error?.response?.data?.message || error?.response?.data || error?.message)
        }
    }


    const handleOpenDeleteModal = (product:Product)=>{
        setProductToDelete(product)
        setIsDeleteOpen(true)
    }


    const confirmDeleteProduct = async()=>{
        if(!productToDelete) return
        
        try{
            await productService.delete(productToDelete.id)
            toast.success('Product deleted successfully')
            loadProducts()
        }catch(error:any){
            toast.error(error?.response?.data?.message || error?.response?.data || error?.message)
        }finally{
            setProductToDelete(null)
            setIsDeleteOpen(false)
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
                <Button
                    onClick={() => setIsModalOpen(true)}>
                    <div className="flex items-center gap-2">
                        <Plus size={18}/>
                        <span>{t('Add Product')}</span>
                    </div>
                </Button>
            </div>
            <ProductsToolBar
                search={search}
                onSearchChange={setSearch}
                category={category}
                onCategoryChange={setCategory}
                status={status}
                onStatusChange={setStatus}
                />
            {loading ? (
                <div className="p-8 text-center text-slate-500">Loading products...</div>
            ) : (
                <ProductsTable 
                    products={filteredProducts}
                    onEdit={(product)=>{
                        setEditingProduct(product)
                        setIsModalOpen(true)
                    }}
                    onDelete={handleOpenDeleteModal}/>
            )}
            <ProductModal 
                open={isModalOpen} 
                onClose={() =>{
                    setIsModalOpen(false)
                    setEditingProduct(null)
                }}
                onAddProduct={handleAddProduct}
                onUpdateProduct={handleUpdateProduct}
                product={editingProduct}/>
            <ConfirmDialog
                open={isDeleteOpen}
                title="Delete Product"
                message={`Are you sure you want to delete "${productToDelete?.name}"?`}
                onCancel={()=>{
                    setIsDeleteOpen(false)
                    setProductToDelete(null)
                }}
                onConfirm={confirmDeleteProduct} />
        </section>
    )
}