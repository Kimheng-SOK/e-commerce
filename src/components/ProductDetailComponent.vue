<script setup lang="ts">

import ButtonComponent from "@/components/ButtonComponent.vue";
import MenuItemComponent from "@/components/MenuItemComponent.vue";
import CartIcon from "@/assets/IconComponents/icon-cart-shop.vue";
import WhitelistIcon from "@/assets/IconComponents/icon-heart.vue";
import ShuffleIcon from "@/assets/IconComponents/icon-shuffle.vue";
import type { Product } from "@/stores/productStore";
import type { Category } from "@/stores/productStore";
import { computed } from 'vue';

const props = defineProps<{
  product?: Product;
  category?: Category;
}>();

// Calculate discounted price
const discountedPrice = computed(() => {
  const price = props.product?.price || 0;
  const promotion = props.product?.promotionAsPercentage || 0;
  return price - (price * promotion / 100);
});

// Calculate discount percentage
const discountPercentage = computed(() => {
  return Math.round(props.product?.promotionAsPercentage || 0);
});

</script>

<template>
  <div class="product-detail-component">
    <!-- Stock Badge -->
    <div class="stock-badge">In Stock</div>

    <!-- Product Title -->
    <h1 class="product-title">{{ product?.name }}</h1>

    <!-- Rating Section -->
    <div class="rating-section">
      <div class="stars">
        <span class="star filled">★</span>
        <span class="star filled">★</span>
        <span class="star filled">★</span>
        <span class="star filled">★</span>
        <span class="star half">★</span>
      </div>
      <span class="rating-count">(4)</span>
    </div>

    <!-- Price Section -->
    <div class="price-section">
      <span class="current-price">${{ discountedPrice.toFixed(0) }}</span>
      <span class="original-price" v-if="discountPercentage > 0">${{ product?.price }}</span>
    </div>

    <!-- Product Description -->
    <p class="product-description">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam rem officia, corrupti reiciendis minima nisi modi, quasi, odio minus dolore impedit fuga eum eligendi? Officia doloremque facere quia. Voluptatum, accusantium!
    </p>

    <!-- Quantity and Add to Cart -->
    <div class="action-section">
      <div class="quantity-control">
        <button class="qty-btn">−</button>
        <input type="number" class="qty-input" value="1" min="1" />
        <button class="qty-btn">+</button>
      </div>

      <button class="add-to-cart-btn">
        <CartIcon class="cart-icon" />
        Add To Cart
      </button>

      <button class="icon-btn wishlist-btn">
        <WhitelistIcon class="icon" />
      </button>

      <button class="icon-btn compare-btn">
        <ShuffleIcon class="icon" />
      </button>
    </div>

    <!-- Product Meta Information -->
    <div class="product-info">
      <div class="info-row">
        <span class="info-label">Vendor:</span>
        <span class="info-value">NestMart</span>
      </div>
      <div class="info-row">
        <span class="info-label">SKU:</span>
        <span class="info-value">{{ product?.id }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-detail-component {
  color: #253D4E;
  padding: 0;
  max-width: 600px;
}

/* Stock Badge */
.stock-badge {
  display: inline-block;
  color: #3BB77E;
  font-weight: 600;
  font-size: 13px;
  background: #DEF9EC;
  padding: 4px 12px;
  border-radius: 4px;
  margin-bottom: 12px;
}

/* Product Title */
.product-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #253D4E;
  line-height: 1.2;
  margin: 0 0 12px 0;
}

/* Rating Section */
.rating-section {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.stars {
  display: flex;
  gap: 2px;
}

.star {
  font-size: 18px;
  color: #FFC107;
}

.star.filled {
  color: #FFC107;
}

.star.half {
  color: #FFC107;
}

.rating-count {
  color: #B6B6B6;
  font-size: 14px;
  margin-left: 4px;
}

/* Price Section */
.price-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.current-price {
  color: #3BB77E;
  font-weight: 700;
  font-size: 3.5rem;
  line-height: 1;
}

.original-price {
  color: #ADADAD;
  text-decoration: line-through;
  font-weight: 500;
  font-size: 1.5rem;
  margin-top: 8px;
}

/* Product Description */
.product-description {
  color: #7E7E7E;
  font-size: 15px;
  line-height: 1.7;
  margin: 0 0 28px 0;
}

/* Action Section */
.action-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

/* Quantity Control */
.quantity-control {
  display: flex;
  align-items: center;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  overflow: hidden;
  background: white;
  height: 45px;
}

.qty-btn {
  width: 45px;
  height: 45px;
  border: none;
  background: white;
  color: #7E7E7E;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qty-btn:hover {
  background: #F5F5F5;
  color: #3BB77E;
}

.qty-input {
  width: 50px;
  height: 45px;
  border: none;
  border-left: 1px solid #E0E0E0;
  border-right: 1px solid #E0E0E0;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  color: #253D4E;
  outline: none;
}

.qty-input::-webkit-inner-spin-button,
.qty-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Add to Cart Button */
.add-to-cart-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #3BB77E;
  color: white;
  border: none;
  padding: 0 28px;
  height: 45px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  min-width: 160px;
}

.add-to-cart-btn:hover {
  background: #2ea868;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 183, 126, 0.3);
}

.cart-icon {
  width: 20px;
  height: 20px;
}

.cart-icon :deep(svg) {
  fill: white;
  stroke: white;
}

/* Icon Buttons */
.icon-btn {
  width: 45px;
  height: 45px;
  border: 1px solid #E0E0E0;
  background: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.icon-btn:hover {
  border-color: #3BB77E;
  background: #F0FDF4;
}

.icon-btn .icon {
  width: 20px;
  height: 20px;
}

.icon-btn:hover .icon :deep(svg) {
  fill: #3BB77E;
  stroke: #3BB77E;
}

/* Product Info */
.product-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-label {
  color: #7E7E7E;
  font-size: 14px;
  font-weight: 500;
  min-width: 60px;
}

.info-value {
  color: #B6B6B6;
  font-size: 14px;
  font-weight: 400;
}

/* Responsive Design */
@media (max-width: 768px) {
  .product-title {
    font-size: 2rem;
  }

  .current-price {
    font-size: 2.5rem;
  }

  .action-section {
    width: 100%;
  }

  .add-to-cart-btn {
    width: 100%;
    flex: unset;
  }
}
</style>
