<template>
  <div class="container">
    <!-- Category Section -->
    <div class="category_list">
      <div v-for="(category, index) in categories" :key="category.id || category.name || index" class="category_item" role="list">
        <CategoryComponent
          :title="category.name"
          :itemCount="category.productCount"
          :bgColor="category.color"
          :imageSrc="category.image"
        />
      </div>
    </div>

    <!-- Promotions Section -->
    <div class="promotion_list">
      <div v-for="(promotion, index) in promotions" :key="promotion.id || promotion.title || index" class="promotion_item" role="list">
        <PromotionComponent
          :label="promotion.title"
          :btn_color="promotion.buttonColor"
          :bgColor="promotion.color"
          :imageSrc="promotion.image"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import CategoryComponent from './components/CategoryComponent.vue'
import PromotionComponent from './components/PromotionComponent.vue'

interface Category {
  id?: number | string
  name?: string
  productCount?: number
  color?: string
  image?: string
}

interface Promotion {
  id?: number | string
  title?: string
  buttonColor?: string
  color?: string
  image?: string
}

export default {
  name: 'App',
  components: {
    CategoryComponent,
    PromotionComponent,
  },

  data() {
    return {
      categories: [] as Category[],
      promotions: [] as Promotion[], 
    }
  },

  mounted() {
    this.fetchCategories()
    this.fetchPromotions()
  },

  methods: {
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
   },
}
</script>

<style scoped>
/* Container */
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.promotion_list,
.category_list {
  display: flex;
  gap: 15px;

}

.categories_item,
.promotion_item {
  width: auto;
}
</style>
