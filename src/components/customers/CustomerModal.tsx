import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@/components/ui/Button"
import type { Customer } from "@/services/apiServices"


const customerSchema = z.object({
    name: z.string().min(3, 'Name is required'),
    email: z.email('Invalid email'),
    phone: z.string().min(8, 'Phone is required'),
    status: z.enum(['Active', 'Inactive'])
})

export type CustomerFormData = z.output<typeof customerSchema>

interface CustomerModalProps{
    open:boolean
    customer:Customer | null
    onClose: () => void
    onAddCustomer: (customer:CustomerFormData) => void
    onUpdateCustomer: (customer:Customer) => void
}



export default function CustomerModal({
    open,
    customer,
    onClose,
    onAddCustomer,
    onUpdateCustomer
}:CustomerModalProps){

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<
        z.input<typeof customerSchema>,
        any,
        z.output<typeof customerSchema>
    >({
        resolver: zodResolver(customerSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            status: "Active",
        },
    })


    useEffect(()=>{
        if(customer){
            reset({
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                status: customer.status === 'Inactive' ? 'Inactive' : 'Active'
            })
        }else{
            reset({
                name: "",
                email: "",
                phone: "",
                status: "Active"
            })
        }
    }, [customer, reset])


    if(!open) return null


    const onSubmit = (data:CustomerFormData)=>{
        if(customer){
            onUpdateCustomer({
                ...customer,
                ...data
            })
        }else{
            onAddCustomer(data)
        }

        reset()
        onClose()
    }

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">

                <h2 className="mb-6 text-xl font-semibold">
                    {customer ? "Edit Customer" : "Add Customer"}
                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >

                    <input
                        {...register("name")}
                        placeholder="Customer name"
                        className="w-full rounded-lg border border-slate-300 p-3"
                    />

                    {errors.name && (
                        <p className="text-sm text-red-500">
                            {errors.name.message}
                        </p>
                    )}

                    <input
                        {...register("email")}
                        placeholder="Email"
                        className="w-full rounded-lg border border-slate-300 p-3"
                    />

                    {errors.email && (
                        <p className="text-sm text-red-500">
                            {errors.email.message}
                        </p>
                    )}

                    <input
                        {...register("phone")}
                        placeholder="Phone"
                        className="w-full rounded-lg border border-slate-300 p-3"
                    />

                    {errors.phone && (
                        <p className="text-sm text-red-500">
                            {errors.phone.message}
                        </p>
                    )}

                    <select
                        {...register("status")}
                        className="w-full rounded-lg border border-slate-300 p-3"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>

                    <div className="flex justify-end gap-3 pt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-slate-300 px-4 py-2"
                        >
                            Cancel
                        </button>

                        <Button type="submit">
                            {customer ? "Update Customer" : "Save Customer"}
                        </Button>

                    </div>

                </form>

            </div>

        </div>
    )
}

