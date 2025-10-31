<template>
    <button role="menuitem" type="button" class="category_btn" :style="{ backgroundColor: bg_color, '--hover': hover }">
      <img class="category_img" :src="image_path" alt="Category image">
      <span class="category_name">{{ name }}</span>
      <span class="category_count">{{ stock }} items</span>
    </button>
</template>

<script lang="ts">
import { setCommentRange } from 'typescript';

    export default {
        name: "CategoryComponent",
        props: {
            image_path: String,
            stock: Number,
            name: String,
            bg_color: String,
            hover: String,
        }
    }   
</script>

<style scoped>
.category_btn {
  padding         : 5px;
  min-width       : 100px;
  width           : 100px;
  height          : 140px;
  margin          : 10px;
  display         : flex;
  flex-direction  : column;
  justify-content : center;
  align-items     : center;
  background      : var(--bg);
  border          : 1px solid rgba(0, 0, 0, 0.06);
  border-radius   : 8px;

}

.category_btn:hover {
  background : var(--hover);
}

.category_img {
  width         : 65%;
  margin-bottom : 10px;
}

.category_name {
  font-size     : 11px;
  font-weight   : bold;
  margin-bottom : 5px;
}

.category_count {
  font-size : 10px;
  color     : lightslategray;
}
</style>