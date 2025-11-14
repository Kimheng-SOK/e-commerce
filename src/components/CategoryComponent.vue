<template>
  <div class="category_list">
    <button role="menuitem" type="button" class="category_btn" :style="{ backgroundColor: bgColor }">
      <img class="category_img" :src="`http://localhost:3000/${imageSrc}`" alt="Category image">
      <span class="category_name">{{ title }}</span>
      <span class="category_count">{{ itemCount }} items</span>
    </button>
  </div>
</template>

<script lang="ts">
  export default {
    name: "CategoryComponent",
    props: {
        title: String,
        itemCount: Number,
        bgColor: String,
        imageSrc: String,
    },
    // mounted() {
    //   console.log("imageSrc", this.imageSrc)
    // }
  }  
</script>

<style scoped>
.category_list {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  scrollbar-width: none;
  gap: 10px;
  margin-bottom: 50px;
}

.category_btn {
  padding: 5px;
  width: 100px;
  height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--bg);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  transition: background 0.3s;
}

.category_btn:hover {
  background: var(--hover);
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