<template>
    <button id="btn" :style="{ background: bgColor, borderColor: bgColor }">
        <p>{{label}}</p>
        <span :style="{ display: 'flex', alignItems: 'center', justifyContent: 'center' }"> 
            <img src="/right-arrow.png" alt="Right Arrow" style="width:12px; height:12px;">
        </span>
        
    </button>
</template>

<script lang="ts">
export default {
    name: "ButtonComponent",
    props: {
        label: {
            type: String,
            default: 'Shop Now'
        },
        bgColor: {
            type: String,
            default: '#3BB77E'
        }
    }
}
</script>

<style scoped>
    #btn {
        width: 110px;
        height: 31px;
        display        : flex;
        flex-direction : row;
        align-items    : center;
        justify-content: center;
        gap            : 6px;
        padding        : 12px 8px;
        border         : 0.2px solid;
        transition     : background 0.3s ease;
        color: white;
        font-size: small;
    }

    #btn:hover {
        transform: scale(0.95);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }


</style>