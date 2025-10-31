<template>
  <div class="container">

    <!-- Category Section -->
    <div class="category_list" role="list">
      <CategoryComponent
        v-for="item in category_list"
        :key="item.name"
        :image_path="item.img"
        :name="item.name"
        :stock="item.stock"
        :bg_color="item.bg_color"
        :hover="item.hover"
      />
    </div>

    <!-- Promotions Section -->
    <div class="poster_list">
      <PromotionComponent
        image_path="/promotion3.jpg"
        label="Everyday Fresh & Clean with Our Products"
        btn-color="#3BB77E"
        bg_color="#F0E8D5"
      />
      <PromotionComponent
        image_path="/promotion2.png"
        label="Make your Breakfast Healthy and Easy"
        btn-color="#3BB77E"
        bg_color="#F3E8E8"
      />
      <PromotionComponent
        image_path="/promotion1.jpg"
        label="The best Organic Products Online Shop Now"
        btn-color="#FDC040"
        bg_color="#E7EAF3"
      />
    </div>

  </div>
</template>

<script setup lang="ts">
import CategoryComponent from './components/CategoryComponent.vue';
import PromotionComponent from './components/PromotionComponent.vue';

const category_list = [
  {img: '/cat-1.png', name: 'Hamburger', stock: 10, bg_color: '#E8F9EF', hover: '#c8f1dc'},
  {img: '/cat-2.png', name: 'Peach', stock: 15, bg_color: '#E8F9EF', hover: '#c8f1dc'},
  {img: '/cat-3.png', name: 'Organic Kiwi', stock: 8, bg_color: '#FFF0E6', hover: '#ffd8c2'},
  {img: '/cat-4.png', name: 'Red Apple', stock: 20, bg_color: '#EAFEEC', hover: '#d4f8da'},
  {img: '/cat-5.png', name: 'Snack', stock: 5, bg_color: '#FFECEF', hover: '#ffd6dc'},
  {img: '/cat-6.png', name: 'Black plum', stock: 12, bg_color: '#FFF8E7', hover: '#ffefc8'},
  {img: '/cat-7.png', name: 'Vegetables', stock: 7, bg_color: '#F1EDFF', hover: '#e2d9ff'},
  {img: '/cat-8.png', name: 'Headphone', stock: 10, bg_color: '#EBFAEE', hover: '#d5f4dc'},
  {img: '/cat-9.png', name: 'Cake & Milk', stock: 24, bg_color: '#EAF6FF', hover: '#d2ecff'},
  {img: '/cat-10.png', name: 'Orange', stock: 34, bg_color: '#FFF3E0', hover: '#ffe3b8'},
];
</script>

<style scoped>
/* Container */
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px;
  box-sizing: border-box;
}

/* Horizontal Scroll for Categories */
.category_list {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 16px;
  flex-wrap: nowrap;
  padding-bottom: 8px;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
}
.category_list > * {
  flex-shrink: 0;
  min-width: 160px; /* adjust as needed */
  scroll-snap-align: start;
}

/* Horizontal Scroll for Promotions */
.poster_list {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 24px;
  flex-wrap: nowrap;
  padding-bottom: 8px;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
}
.poster_list > * {
  flex-shrink: 0;
  min-width: 300px; /* adjust per card size */
  scroll-snap-align: start;
}

/* Optional: hide scrollbar for both sections */
.category_list::-webkit-scrollbar,
.poster_list::-webkit-scrollbar {
  display: none;
}
</style>
