<template>
  <main class="container">
    <NavBar/>

    <!-- Featured Categories Section -->
    <section class="flex flex-row justify-between items-center mt-10 mb-5 w-full">
      <MenuComponent
        :categories="'Featured Categories'"
        :groupName="groups"
        :selectedGroup="selectedCategoryByGroup"
        @update-group="selectedCategoryByGroup = $event"

      />
    </section>

    <!-- Categories Section -->
    <section class="category_list">
      <div 
      class="category_item"
      v-for="category in categoryByGroup(selectedCategoryByGroup)" 
      :key="category.id || category.name" 
      role="listitem"
      >
        <CategoryComponent
          :title="category.name"
          :itemCount="category.productCount"
          :bgColor="category.color"
          :imageSrc="category.image"
        />
      </div>
    </section>

    <!-- Promotions Section -->
    <section class="promotion_list">
      <div v-for="promotion in promotions" :key="promotion.id || promotion.title" class="promotion_item" role="list">
        <PromotionComponent
          :label="promotion.title"
          :btn_color="promotion.buttonColor"
          :bgColor="promotion.color"
          :imageSrc="promotion.image"
        />
      </div>
    </section>

    <!-- Popular Products Section -->
    <section class="flex flex-row justify-between items-center mt-10 mb-5 w-full">
      <MenuComponent
        :categories="'Popular Products'"
        :groupName="groups"
        :selectedGroup="selectedProductsByGroup"
        @update-group="selectedProductsByGroup = $event"
      />
    </section>

    <!-- Products Section -->
     <section class="product_list w-full max-w-7xl mx-auto">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-6 py-4 justify-items-center">
        <div 
        class="product_item relative w-full max-w-sm bg-white p-6 rounded-2xl border-3 border-gray-500 hover:border-green-300 shadow-xs flex flex-col items-center justify-end" 
        v-for="product in productByGroup(selectedProductsByGroup)" 
        :key="product.id || product.name" 
        role="listitem">
          <ProductComponent
            :item="product"
            :productQuantities="productQuantities"
            @add-to-cart="addItemToCart"
            @update-quantity="updateQuantity"
          />
        </div>
      </div>
     </section>
  </main>
</template>

<script lang="ts">
import CategoryComponent from '../components/CategoryComponent.vue'
import PromotionComponent from '../components/PromotionComponent.vue'
import ProductComponent from '../components/ProductComponent.vue'
// @ts-ignore: missing declaration for .vue SFCs in this project
import NavBar from '../components/Navbar.vue'
import { onMounted, reactive } from 'vue'
import { mapState, storeToRefs } from 'pinia'
import { useProductStore } from '../stores/productStore'

export default {
  name: 'HomeView',
  components: {
    CategoryComponent,
    PromotionComponent,
    ProductComponent,
    NavBar
  },

  setup() {
    const productStore = useProductStore()
    const { categories, promotions, products, groups } = storeToRefs(productStore)

    // reactive Map to track quantities for products in the parent
    const productQuantities = reactive(new Map<string, number>())
    const categoryQuantities = reactive(new Map<string, number>())

    function addItemToCart(productName: string) {
      productQuantities.set(productName, 1)
    }

    function updateQuantity(payload: { name: string; quantity: number }) {
      const { name, quantity } = payload
      if (quantity > 0) productQuantities.set(name, quantity)
      else productQuantities.delete(name)
    }

    onMounted(() => {
      productStore.fetchGroups()
      productStore.fetchCategories()
      productStore.fetchPromotions()
      productStore.fetchProducts()
    })

    return {
      productStore,
      categories,
      promotions,
      products,
      groups,
      productQuantities,
      addItemToCart,
      updateQuantity
    }
  },

  data() {
    return {
      selectedCategoryByGroup: "All",
      selectedProductsByGroup:  "All" 
    }
  },

  computed: {
    ...mapState(useProductStore, {
      popularProducts: (state) => state.getPopularProducts,
      productByGroup: (state) => state.getProductsByGroup,
      productByCategory: (state) => state.getProductsByCategory,
      categoryByGroup: (state) => state.getCategoriesByGroup,
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
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.promotion_list,
.category_list {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}

.category_item {
  width: auto;
  height: 140px;
}
.promotion_item {
  width: auto;
}
</style>
