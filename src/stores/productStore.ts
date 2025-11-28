import {defineStore} from 'pinia'
import axios from 'axios'

interface Promotion {
  id?: number | string
  title?: string
  buttonColor?: string
  color?: string
  image?: string
}

interface Category {
  id?: number | string
  name?: string
  productCount?: number
  color?: string
  image?: string
  group?:String
}

interface Product {
  name?: string
  rating?: number
  size?: string
  price?: number
  promotionAsPercentage?: number
  categoryId: number
  group?: string
  countSold?: number
  image: string
}

function normalizePath(path?: string) {
    if (!path) return ''
    const s = String(path)

    if (/^https?:\/\//.test(s) || s.startsWith('/')) return s
    const base = 'http://localhost:3000'

    if (s.startsWith(base)) return `${base}${s}`

    return `${base}/${s.replace(/^\/+/, '')}`
}

export const useProductStore = defineStore('product', {
    state: () => ({
        groups: [] as string[],
        promotions: [] as Promotion[],
        categories: [] as Category[],
        products: [] as Product[]
    }),
    getters: {
        getCategoriesByGroup: (state) => {
            return (groupName: String): Category[] => state.categories.filter   ((category) => category.group === groupName)
        },

        getProductsByGroup: (state) => {
            return (groupName: string): Product[] => state.products.filter((product) => product.group === groupName)
        },

        getProductsByCategory: (state) => {
           return (categoryId: number): Product[] => state.products.filter((product) => product.categoryId === categoryId)
        },

        getPopularProducts: (state) => {
            return state.products.filter((product) => (product.countSold ?? 0) > 10)
        }
    },
    actions: {
        async fetchCategories() {
            try {
                const response = await axios.get(
                "http://localhost:3000/api/categories"
                );
                this.categories = (response.data || []).map((c:any) => ({
                    ...c, 
                    image: normalizePath(c.image ?? c.img ?? c.file)
            }))
            console.log("Categories:", this.categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
                this.categories = [];
            }
            },

        async fetchPromotions() {
            try {
            const response = await axios.get(
                "http://localhost:3000/api/promotions"
            );
            this.promotions = (response.data || []).map((p:any) => ({
                ...p,
                image: normalizePath(p.image ?? p.img ?? p.file)
            }))
            console.log("Promotions:", response.data);
            } catch (error) {
            console.error("Error fetching promotions:", error);
            this.promotions = [];
            }
        },

        async fetchProducts() {
            try {
                const response = await axios.get('http://localhost:3000/api/products');
                this.products = response.data
                console.log("Products:", this.products);
            } catch(error) {
                console.log(error);
                this.products = [];
            }
        },

        async fetchGroups() {
            try {
                const response = await axios.get("http://localhost:3000/api/groups");
                const data = Array.isArray(response.data) ? response.data.map(String) : [];
                this.groups = ['All', ...data];
                console.log("Groups:", response.data);
            } catch (error) {
                console.error("Error fetching groups:", error);
                this.groups = ['All'];
            }
        },
    }
})   