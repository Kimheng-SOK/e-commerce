<template>
    <div class="poster_list" role="list">
        <div class="poster_item" role="listItem" :style="{ backgroundColor: bgColor }">
            <div class="poster_main" >
                <p class="poster_label">{{ label }}</p>
                <ButtonComponent :bgColor="btn_color" @click="shopNow(label)" />
            </div>
            <img class="poster_img" :src="imageSrc" alt="Poster image" />
        </div>
    </div>
</template>

<script lang="ts">
import ButtonComponent from './ButtonComponent.vue';

export default {
    name: "PromotionComponent",
    components: {
        ButtonComponent
    },
    props: {
        label: String,
        btn_color: String,
        imageSrc: String,
        bgColor: String
    },

    methods: {
        shopNow(promotion: String | undefined) {
            alert("Let's shop: " + promotion);
        }
    }
};
</script>

<style scoped>
.poster_list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap; 
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  gap: 24px;
  margin-top: 24px;
}

.poster_item {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 200px;
  width: 380px;
  min-width: 300px;
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
}

.poster_main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  margin-left: 24px;
}


.poster_img {
  max-width: 200px;
  max-height: 200px;
}

.poster_label {
  font-size: 16px;
  font-weight: bold;
  color: #181818;
  margin-bottom: 16px;
}
</style>
