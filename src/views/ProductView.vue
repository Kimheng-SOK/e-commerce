<script setup lang="ts">

import ProductDetailComponent from "@/components/ProductDetailComponent.vue";
import ProductImageComponent from "@/components/ProductImageComponent.vue";
import {useRoute} from "vue-router";
import {useProductStore, type Category, type Product} from "@/stores/productStore";
import {onMounted, type Ref, ref} from "vue";
import router from "@/router/index";
import MenuItemComponent from "@/components/MenuItemComponent.vue";

const route = useRoute();
const product_id = route.params.productId as string;

const pro_st = useProductStore();
const cate_st = useProductStore();
const product: Ref<Product | undefined> = ref(undefined);
const category: Ref<Category | undefined> = ref(undefined);
const relatedProducts: Ref<Product[]> = ref([]);

onMounted(async () => {
  await pro_st.fetchProducts();
  await cate_st.fetchCategories();
  const items = pro_st.products
  const categories = cate_st.categories;
  product.value = pro_st.products.find((p) => p.id.toString() === product_id)

  // Find related products from the same category
  if (product.value) {
    relatedProducts.value = pro_st.products
      .filter(p => p.categoryId === product.value?.categoryId || p.id !== product.value?.id)
      .slice(0, 4) // Get up to 4 related products
    console.log('Related products:', relatedProducts.value)
    console.log('Related products count:', relatedProducts.value.length)
  }

  for (let i = 0; i < categories.length; i++) {
    console.log(`Category ${categories[i]?.id}`)
    if (categories[i]?.id === product.value?.categoryId) {
      category.value = categories[i]
      break;
    }
  }
  console.log("Category id : " + product?.value?.categoryId)
})

async function back_home() {
  await router.push("/")
}

async function go_to_category() {
  await router.push(`/categories/${category.value?.id}`)
}

</script>

<template>
  <div class="cate-path">
    <p @click="back_home" class="path-ele">Home</p>
    <p class="sep"> > </p>
    <p class="path-ele" @click="go_to_category">{{ category?.name ?? 'Loading...' }}</p>
    <p class="sep"> > </p>
    <p class="path-ele">{{ product?.name ?? 'Loading...' }}</p>
  </div>
  <div class="product-view">
    <ProductImageComponent v-if="product" class="flex-item" :product="product" :relatedProducts="relatedProducts"/>
    <ProductDetailComponent v-if="product && category" :product="product" :category="category" class="flex-item"/>
  </div>
  <div class="product-comments">
    <div class="buttons-container">
      <MenuItemComponent class="button-info button-info-active" :border="'1px solid lightgray'" :border_radius="'15px'" label="Description"></MenuItemComponent>
      <MenuItemComponent class="button-info" :border="'1px solid lightgray'" :border_radius="'15px'" label="Additional Info"></MenuItemComponent>
      <MenuItemComponent  class="button-info" :border="'1px solid lightgray'" :border_radius="'15px'" label="Reviews"></MenuItemComponent>
    </div>
    <p class="description-text">
      Database Design Process:<br>
      1. Requirements Analysis: Gather and analyze user and application data needs.<br>
      2. Conceptual Design: Create an abstract model (often using ER diagrams) to identify entities,
      relationships, and attributes.<br>
      3. Logical Design: Map the conceptual model to a logical schema (tables, keys, relationships).<br>
    </p>

  </div>
</template>

<style scoped>


.product-view {
  display : flex;
  gap: 40px;
}

.flex-item {
  flex : 1;
}

.cate-path {
  margin: 10px 0;
  display   : flex;
  gap       : 10px;
  font-size : 1.1rem;
}

.path-ele, .sep {
  cursor     : pointer;
  color      : #868686;
  transition : color 0.3s;
}

.sep {
  cursor : default;
}

.path-ele:hover {
  color       : black;
  font-weight : bold;
}

.product-comments{
  padding: 3% 5%;
  margin-top: 10px;
  border: 1px solid #b2acac;
  border-radius: 10px;
}

.buttons-container{

  display: flex;
  gap: 20px;
}
.button-info{
  padding: 5px 20px;

}
.button-info-active{
  box-shadow: 0 0 10px #b2abab;
}
.description-text{
  padding-top: 20px;
  color: black;
}

</style>
