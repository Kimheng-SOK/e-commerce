<template>
  <button
    role="menuitem"
    type="button"
    class="category_btn"
    :style="{ backgroundColor: bgColor }"
    ,
    @click="onClick(cate_id)"
  >
    <img class="category_img" :src="imageSrc" alt="Category image" />
    <span class="category_name">{{ title }}</span>
    <span class="category_count">{{ itemCount }} items</span>
  </button>
</template>

<script setup lang="ts">
import router from '@/router'
const props = withDefaults(defineProps<{
  title?: string;
  itemCount?: number;
  bgColor?: string;
  cate_id?: string | number;
  imageSrc?: string;
}>(), {
  bgColor: '#FFFFFF',
  title: "Missing Title",
  itemCount: 0,
  imageSrc: '',
  cate_id: ''

})
async function onClick(cate_id: string | number) {
  await router.push({ name: 'Category', params: { categoryId: cate_id } })
  console.log('Navigated to category:', cate_id)
}
</script>

<style scoped>
/* .category_card {
  width: 100%;
  display: flex;
  align-items: center;
  scrollbar-width: none;
  gap: 10px;
} */

.category_btn {
  padding: 8px;
  width: 100px;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--bg);
  border-radius: 10px;
  border: 0.3px solid rgba(99, 100, 99, 0.9);
  transition:
    transform 200ms cubic-bezier(0.2, 0.8, 0.2, 1),
    box-shadow 200ms cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 200ms;
  will-change: transform, box-shadow, border-color;
  cursor: pointer;
}

.category_btn:hover,
.category_btn:focus-visible {
  transform: scale(0.9);
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 14),
    0 6px 12px rgba(238, 234, 234, 0.06);
  border-color: rgba(99, 100, 99, 0.9);
}

.category_btn:active {
  transform: scale(0.95);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1);
  border-color: rgba(59, 183, 126, 0.75);
}

.category_img {
  width: 65%;
  margin-bottom: 10px;
}

.category_name {
  font-size: 11px;
  font-weight: bold;
  margin-bottom: 5px;
}

.category_count {
  font-size: 10px;
  color: lightslategray;
}
</style>
