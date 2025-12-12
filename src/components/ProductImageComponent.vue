<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import type {Product} from "@/stores/productStore";

const props = defineProps<{
  product?: Product
  relatedProducts?: Product[]
}>()

const router = useRouter()
const scrollContainer = ref<HTMLElement | null>(null)

// Navigate to another product
const goToProduct = (productId: number | string) => {
  router.push(`/products/${productId}`)
  // Scroll to top when navigating
  window.scrollTo(0, 0)
}

// Scroll left
const scrollLeft = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: -200, behavior: 'smooth' })
  }
}

// Scroll right
const scrollRight = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: 200, behavior: 'smooth' })
  }
}

</script>

<template>
  <div class="image-container" v-if="product">
    <div class="selected-image">
      <img :src="product.image" alt="Product Image">
    </div>

    <!-- Related Products Carousel -->
    <div class="carousel-wrapper" v-if="relatedProducts && relatedProducts.length > 0">
      <button class="carousel-btn left" @click="scrollLeft">
        <span>‹</span>
      </button>

      <div class="image-selector" ref="scrollContainer">
        <!-- Current Product (with green border) -->
        <div class="product-thumb current">
          <img :src="product.image" :alt="product.name" />
        </div>

        <!-- Related Products -->
        <div
          v-for="relatedProduct in relatedProducts"
          :key="relatedProduct.id"
          class="product-thumb"
          @click="goToProduct(relatedProduct.id)"
        >
          <img :src="relatedProduct.image" :alt="relatedProduct.name" />
        </div>
      </div>

      <button class="carousel-btn right" @click="scrollRight">
        <span>›</span>
      </button>
    </div>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<style scoped>
.selected-image {
  margin-bottom: 20px;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  overflow: hidden;
  background: white;
}

.selected-image img {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
}

.image-container {
  display: flex;
  flex-direction: column;
}

/* Carousel Wrapper */
.carousel-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
}

/* Carousel Buttons */
.carousel-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #3BB77E;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  transition: all 0.3s ease;
  flex-shrink: 0;
  z-index: 2;
}

.carousel-btn:hover {
  background: #2ea868;
  transform: scale(1.1);
}

.carousel-btn span {
  line-height: 1;
  margin-top: -2px;
}

/* Image Selector - Scrollable Container */
.image-selector {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 4px;
  flex: 1;

  /* Hide scrollbar */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.image-selector::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* Product Thumbnail */
.product-thumb {
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  border: 2px solid #E0E0E0;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
}

.product-thumb:hover {
  border-color: #3BB77E;
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(59, 183, 126, 0.2);
}

.product-thumb.current {
  border-color: #3BB77E;
  border-width: 3px;
  cursor: default;
}

.product-thumb.current:hover {
  transform: none;
}

.product-thumb img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Responsive Design */
@media (max-width: 768px) {
  .product-thumb {
    width: 90px;
    height: 90px;
  }

  .carousel-btn {
    width: 36px;
    height: 36px;
    font-size: 20px;
  }
}
</style>
