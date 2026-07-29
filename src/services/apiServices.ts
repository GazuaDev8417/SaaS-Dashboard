import { api } from "@/lib/api"


//============================= INTERFACES ==================================
export interface Product{
    id:number
    name: string
    category: string
    price: number
    stock: number
    status: "Active" | "Inactive" | "Low Stock"
}

export interface DashboardStatistics{
  title:string
  value:string
}

export interface RecentOrder {
  id: number
  customerName: string
  product: string
  total: string
  status: 'completed' | 'pending'
}

export interface OrdersByMonth {
  month: string
  orders: number
}

export interface RevenueData {
  month: string
  revenue: number
}

export interface CategoryData {
  name: string
  value: number
}

export interface NotificationsSettingsData{
  emailNotifs: boolean
  pushNotifs: boolean
  marketingEmails: boolean
}

export interface Customer{
    id: number
    name: string
    email: string
    phone: string
    status: string
    createdAt?: string
}

//================== SERVICES ======================================
export const authService = {
    login: async(credentials: { email:string, password:string })=>{
        const response = await api.post('/auth/login', credentials)
        return response.data
    },
    
    getCurrentUser: async()=>{
        const response = await api.get('/auth/me')
        return response.data
    },

    updateProfile: async(data: { name:string, email:string, role:string })=>{
        const response = await api.put('/auth/profile', data)
        return response.data
    },

    changePassword: async(password: { currentPassword:string, newPassword:string })=>{
        const response = await api.put('/auth/password', password)
        return response.data
    }
}


export const productService = {
    getAll: async()=>{
        const response = await api.get<Product[]>('/products')
        return response.data
    },

    create: async(data: { name:string, category:string, price:number, stock:number })=>{
        const response = await api.post('/products', data)
        return response.data
    },

    update: async(id:number, data: { name:string, category:string, price:number, stock:number})=>{
        const response = await api.put(`/products/${id}`, data)
        return response.data
    },

    delete: async(id:number)=>{
        const response = await api.delete(`/products/${id}`)
        return response.data
    }
}


export const dashboardService = {
  getStatistics: async()=>{
    const response = await api.get<DashboardStatistics[]>('/dashboard/statistics')
    return response.data
  }
}


export const orderService = {
  getRecent: async () => {
    const response = await api.get<RecentOrder[]>("/orders/recent")
    return response.data
  },
  getByMonth: async () => {
    const response = await api.get<OrdersByMonth[]>("/orders/by-month")
    return response.data
  },
}


export const customerService = {
    getAll: async () => {
        const response = await api.get<Customer[]>("/customers")
        return response.data
    },

    create: async (data: { name: string; email: string; phone: string; status?: string }) => {
        const response = await api.post("/customers", data)
        return response.data
    },

    update: async (id: number, data: { name: string; email: string; phone: string; status: string }) => {
        const response = await api.put(`/customers/${id}`, data)
        return response.data
    },

    delete: async (id: number) => {
        const response = await api.delete(`/customers/${id}`)
        return response.data
    }
}


export const analyticsService = {
  getRevenue: async () => {
    const response = await api.get<RevenueData[]>("/analytics/revenue")
    return response.data
  },

  getCategories: async () => {
    const response = await api.get<CategoryData[]>("/analytics/categories")
    return response.data
  }
}


export const settingsService = {
  updateNotifications: async (data: { emailNotifs: boolean; pushNotifs: boolean; marketingEmails: boolean }) => {
    const response = await api.put<NotificationsSettingsData>("/settings/notifications", data)
    return response.data
  },

  getNotifications: async()=>{
    const response = await api.get<NotificationsSettingsData>('/settings/notifications')
    return response.data
  }
}