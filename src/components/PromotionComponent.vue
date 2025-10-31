<template>
    <div class="poster_container" :style="{ backgroundColor: bg_color }">
        <div class="poster_main">
            <div class="poster_item">
                <p class="poster_label">{{ label }}</p>
                <ButtonComponent :bgColor= "btn_Color" />
            </div>
        </div>
        <div class="img_container">
            <img class="poster_img" :src = "image_path" alt="Poster image"></img>
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
            image_path: String,

            label: {
                type: String,
                default: '' 
            },

            btn_Color: {
                type: String,
                default: '#3BB77E'
            },

            bg_color: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped>
.poster_container{
    width: 512px;
    height: 300px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 10px;
}

.poster_main {
    display        : flex;
    flex-direction : column;
    align-items    : flex-start;
    justify-content: center;

}

.poster_label{
  font-size: 24px;
  font-weight: bold;
  color: #181818;
  margin-bottom: 16px;
}

.poster_item {
    display        : flex;
    flex-direction : column;
    align-items    : left;
    height         : 146px;
    width          : 250px;
    justify-content: space-between;
    padding: 0 0 0 50px;
}

.poster_img {
    width: 250px;
    height: 200px;
    border-radius: 10px;
}

.img_container {
    width: 100%;
    height: 100%;
    display        : flex;
    flex-direction : column;
    align-items    : center;
    justify-content: end;
    padding-right: 16px;
}

</style>
