<template>
  <div class="container">
    <!-- Category Section -->
    <div class="category_list">
      <div v-for="category in categories" :key="category.id || category.name || index" class="category_item" role="list">
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
      <div v-for="promotion in this.promotions" :key="promotion.id || promotion.title" class="promotion_item" role="list">
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
import CategoryComponent from './components/CategoryComponent.vue'
import PromotionComponent from './components/PromotionComponent.vue'
import { mapState } from 'pinia';
import { useProductStore } from './stores/productStore';

export default {
  name: 'App',
  components: {
    CategoryComponent,
    PromotionComponent,
  },

  setup() {
    const productStore = useProductStore()

    productStore.fetchCategories()
    productStore.fetchPromotions()
    productStore.fetchProducts?.()

    return {
      productStore,
      categories: productStore.categories,
      promotions: productStore.promotions
    }
  },

  data() {
    return {
      currentGroupName: 'Group A'
    }
  },

  computed: {
    ...mapState (useProductStore, {
      popularProducts: 'getProductsByGroup',
      categories(store) {
        return this.store.getCategoriesByGroup(this.currentGroupName)
      },
    })
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
