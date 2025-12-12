<script setup lang="ts">
import { useProductStore, type Category } from '@/stores/productStore';
import { onMounted, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const productStore = useProductStore();
const categoryName = route.params.categoryId as string || 'Category';
const category_name: Ref<Category | undefined> = ref(undefined);
onMounted(() => {
  productStore.fetchCategories();
  const category = productStore.categories.find(cat => cat.id?.toString() === categoryName);
  console.log('Fetched category:', category);
  if (category) {
    category_name.value = category!;
  }
});
</script>

<template>
  <div class="container">
    <div class="component">
      <img src="../../public/sub-bg.png" alt="sub-bg" class="showcase-bg">
      <div class="content_container">
        <h2> {{ category_name?.name }} </h2>
        <div class="category_path">
          <div class="path_item"> Home </div>
          <div class="path_item"> > </div>
          <div class="path_item"> Categories </div>
          <div class="path_item"> > </div>
          <div class="path_item"> {{ category_name?.name }} </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.container {
  width: 100%;
}
.component {
  width: 100% - 64px;
  height: 223px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding: 0 64px;
  margin: 32px 32px;
  background: #3BB77E33;
  border-radius: 20px;
}
.showcase-bg {
  position: absolute;
  top: 0;
  left: 0;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.content_container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-evenly;
  padding: 48px 0;
}

.category_path {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

h2 {
  font: 700 48px 'Quicksand', sans-serif;
}

</style>
