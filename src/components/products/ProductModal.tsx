import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "../ui/Button"
import type { Product } from "@/services/apiServices"
import { useTranslation } from "react-i18next"



interface ProductModalProps{
    open:boolean
    onClose: () => void
    product:Product | null
    onUpdateProduct: (product:Product) => void
}


const productSchema = z.object({
    name: z.string().min(3, 'Product name is required'),
    category: z.string().min(2, 'Category is required'),
    price: z.coerce.number().positive(),
    stock: z.coerce.number().min(0)
})

export type ProductFormData = z.output<typeof productSchema>



export default function ProductModal({
    open,
    onClose,
    onUpdateProduct,
    product
}:ProductModalProps){
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<
        z.input<typeof productSchema>,
        any,
        z.output<typeof productSchema>
    >({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: '',
            category: '',
            price: 0,
            stock: 0
        }
    })

    const { t } = useTranslation()



    useEffect(()=>{
        if(product){
            reset({
                name: product.name,
                category: product.category,
                price: product.price,
                stock: product.stock,
            })
        }else{
            reset({
                name:'',
                category:'',
                price:0,
                stock:0,
            })
        }
    }, [product, reset])

    if(!open) return null


    const onSubmit = (data: ProductFormData)=>{
        if(product){
            onUpdateProduct({
                ...product,
                ...data,
                status: data.stock > 5 ? 'Active' : 'Low Stock'
            })
        }

        reset()
        onClose()
    }


    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-xl">

                <div className="mb-6 flex items-center justify-between">

                    <h2 className="text-xl font-semibold">
                        {product ? t('Edit Product') : t('Add Product')}
                    </h2>

                    <button
                        type="button"
                        onClick={()=>{
                            reset()
                            onClose()
                        }}
                        className="text-2xl text-slate-500 hover:text-slate-800">
                        ×
                    </button>

                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <input
                        {...register('name')}
                        placeholder={t("Product name")}
                        className="w-full rounded-lg border border-slate-300 p-3"
                    />

                    {errors.name && (
                        <p className="text-sm text-red-500">
                            {errors.name.message}
                        </p>
                    )}

                    <input
                        {...register('category')}
                        placeholder={t("Category")}
                        className="w-full rounded-lg border border-slate-300 p-3"
                    />

                    {errors.category && (
                        <p className="text-sm text-red-500">
                            {errors.category.message}
                        </p>
                    )}

                    <input
                        {...register('price')}
                        type="number"
                        placeholder={t("Price")}
                        className="w-full rounded-lg border border-slate-300 p-3"
                    />

                    {errors.price && (
                        <p className="text-sm text-red-500">
                            {errors.price.message}
                        </p>
                    )}

                    <input
                        {...register('stock')}
                        type="number"
                        placeholder={t("Stock")}
                        className="w-full rounded-lg border border-slate-300 p-3"
                    />

                    {errors.stock && (
                        <p className="text-sm text-red-500">
                            {errors.stock.message}
                        </p>
                    )}

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={()=>{
                                reset()
                                onClose()
                            }}
                            className="rounded-lg border border-slate-300 px-4 py-2"
                        >
                            {t('Cancel')}
                        </button>

                        <Button type="submit">
                            {product ? t('Update Product') : t('Save Product')}
                        </Button>
                    </div>
                </form>                

            </div>

        </div>
    )
}