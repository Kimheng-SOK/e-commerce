<template>
  <div class="container">
    <!-- ShowCase component -->
    <section class="showcase_section">
      <ShowCaseComponent />
    </section>


    <!-- Featured Categories Section -->
    <section class="menu-feature">
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
          :cate_id="category.id"
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
          :prod_id="promotion.id"
        />
      </div>
    </section>

    <!-- Popular Products Section -->
    <section class="menu-feature">
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
            :prod_id="Number(product.id)"
            @add-to-cart="addItemToCart"
            @update-quantity="updateQuantity"
          />
        </div>
      </div>
     </section>
  </div>
</template>

<script lang="ts">
import { mapState, storeToRefs } from 'pinia'
import CategoryComponent from '../components/CategoryComponent.vue'
import PromotionComponent from '../components/PromotionComponent.vue'
import ProductComponent from '../components/ProductComponent.vue'
import MenuComponent from '@/components/MenuComponent.vue'
import ShowCaseComponent from '../components/ShowCaseComponent.vue'
import { onMounted, reactive } from 'vue'
import { useProductStore } from '../stores/productStore'
import router from '@/router'

export default {
  name: 'home',
  components: {
    CategoryComponent,
    PromotionComponent,
    ProductComponent,
    ShowCaseComponent,
    MenuComponent,
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
      updateQuantity,
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

  // methods: {
  //   async onClick(id: string | number){
  //     await router.push({ name: "category", params: { categoryId: id }})
  //     console.log("Navigated to category:", id)
  //   }
  // }
}
</script>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
}

.showcase_section {
  width: 100%;
  padding: 0 32px;
}

.menu-feature {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
}

.promotion_list,
.category_list {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  padding: 16px 32px;
}

</style>
