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
  categoryId: string
  group?: string
  countSold?: number
}


export const useProductStore = defineStore('product', {
    state: () => ({
        groups: [] as String[],
        promotions: [] as Promotion[],
        categories: [] as Category[],
        products: [] as Product[]
    }),
    getters: {
        getCategoriesByGroup: (state) => {
            return (groupName: String) => state.categories.find((category) => category.group === groupName)
        },

        getProductsByGroup: (state) => {
            return (groupName: String) => state.products.find((product) => product.group === groupName)
        },

        getProductsByCategory: (state) => {
           return (categoryId: string) => state.products.filter((product) => product.categoryId === categoryId)
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
                this.categories = response.data;
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
            },

        async fetchPromotions() {
            try {
            const response = await axios.get(
                "http://localhost:3000/api/promotions"
            );
            this.promotions = response.data;
            console.log(response.data);
            } catch (error) {
            console.error("Error fetching promotions:", error);
            }
        },

        async fetchProducts() {
            try {
                const response = await axios.get('http://localhost:3000/api/products');
                this.products = response.data
                console.log(response.data)
            } catch(error) {
                console.log(error);
            }
        }
    },
})   