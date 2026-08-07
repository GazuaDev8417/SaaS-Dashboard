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
  id:string
  username:string
  product:string
  quantity:number
  total:number
  state: 'REQUESTED' | 'FINISHED'
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
    id: string
    username: string
    email: string
    phone: string
    status: string
    createdAt?: string
}

//================== SERVICES ======================================
export const authService = {
    login: async(credentials: { email:string, password:string })=>{
        const response = await api.post('/restaurants/login', credentials)
        return response.data
    },
    
    getCurrentUser: async()=>{
        const response = await api.get('/restaurants')
        return response.data
    },

    updateProfile: async(data: { name:string, email:string, role:string })=>{
        const response = await api.put('/auth/profile', data)
        return response.data
    },

    changePassword: async(password: { currentPassword:string, newPassword:string })=>{
        const response = await api.put('/auth/password', password)
        return response.data
    },

    resetPassword: async()=>{
      const response = await api.put('/auth/reset-to-default')
      return response.data
    }
}


export const productService = {
    getAll: async()=>{
        const response = await api.get<Product[]>('/restaurants/products')
        return response.data
    },

    update: async(id:number, data: { name:string, category:string, price:number, stock:number})=>{
        const response = await api.put(`/products/${id}`, data)
        return response.data
    }
}


export const dashboardService = {
  getStatistics: async()=>{
    const response = await api.get<DashboardStatistics[]>('/statistics/revenue')
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
        const response = await api.get<Customer[]>("/users")
        return response.data
    },

    update: async (id: number, data: { name: string; email: string; phone: string; status: string }) => {
        const response = await api.put(`/customers/${id}`, data)
        return response.data
    }
}


export const analyticsService = {
  getRevenue: async () => {
    const response = await api.get<RevenueData[]>("/statistics/revenue-month")
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