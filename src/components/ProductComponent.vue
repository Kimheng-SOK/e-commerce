<template>
  <button class="product-card">
    <div class="image-wrap">
      <img :src="item.image" :alt="item.name" class="product-img" />

      <!-- Discount badge -->
      <span v-if="badge" :class="['badge', badge.type]">{{ badge.text }}</span>

      <!-- Hover overlay with quick actions -->
      <div class="img-overlay">
        <button class="quick-view" type="button" @click="onClick(prod_id)">Quick view</button>
      </div>
    </div>

    <div class="card-body">
      <div class="meta">
        <span class="brand">{{ item.brandName ?? 'Hodo Food' }}</span>
      </div>
      <h3 class="product-title">{{ item.name }}</h3>
      <div class="rating">
          <template v-for="i in 5" :key="i">
            <svg
              :class="['star', i <= (item.rating ?? 0) ? 'filled' : 'empty']"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
            </svg>
          </template>
          <span class="rating-num">({{ item.rating ?? 0 }})</span>
        </div>
      <div class="product-size">{{ item.size }}</div>

      <div class="price-row">
        <div class="prices">
          <div class="price-current">${{ formatPrice((item.price ?? 0) * (1 - (item.promotionAsPercentage ?? 0) / 100)) }}</div>
          <div v-if="item.promotionAsPercentage > 0" class="price-old">${{ item.price?.toFixed ? (item.price).toFixed(2) : item.price }}</div>
        </div>

        <div class="actions">
          <div v-if="!isProductAdded(item.name)">
            <button
              type="button"
              @click="emitAdd(item.name)"
              class="btn-add"
            >
              <span>Add</span>
              <svg class="icon-plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M11 11V5a1 1 0 1 1 2 0v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6z" />
              </svg>
            </button>
          </div>

          <div v-else class="qty-control">
            <input
              type="number"
              :value="getQuantity(item.name)"
              @input="onUpdateQuantity(item.name, $event)"
              min="0"
              class="qty-input"
            />
          </div>
        </div>
      </div>
    </div>
  </button>
</template>

<script lang="ts">
import router from '@/router';
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'ProductComponent',
  props: {
    item: { type: Object as () => any, required: true },
    prod_id: { type: Number, required: true },
    productQuantities: { type: Object as () => any, default: () => new Map() }
  },
  emits: ['add-to-cart', 'update-quantity'],
  setup(props, { emit }) {
    const isMap = (q: any): q is Map<string, number> => q && typeof q.get === 'function'

    const getQuantity = (name: string) => {
      const q = props.productQuantities
      if (!q) return 0
      if (isMap(q)) return q.get(name) ?? 0
      return (q as any)[name] ?? 0
    }

    const isProductAdded = (name: string) => getQuantity(name) > 0

    const emitAdd = (name: string) => emit('add-to-cart', name)

    const onUpdateQuantity = (name: string, event: Event) => {
      const target = event.target as HTMLInputElement | null
      const raw = target?.value ?? ''
      const quantity = parseInt(raw, 10)
      emit('update-quantity', { name, quantity: isNaN(quantity) ? 0 : quantity })
    }

    // format price to 3 decimal places
    const formatPrice = (value: number) => {
      return (Math.round(value * 1000) / 1000).toFixed(2)
    }

    const badge = computed(() => {
      const it = props.item || {}
      // HOT if flagged
      if (it.isHot === true || it.hot === true || (Array.isArray(it.tags) && it.tags.includes('hot')) || (typeof it.badge === 'string' && it.badge.toLowerCase() === 'hot')) {
        return { type: 'hot', text: 'HOT' }
      }
      // SALE if explicitly marked
      if (it.onSale === true || it.sale === true || (Array.isArray(it.tags) && it.tags.includes('sale')) || (typeof it.badge === 'string' && it.badge.toLowerCase() === 'sale')) {
        return { type: 'sale', text: 'SALE' }
      }
      // PROMO by promotion percentage
      if (typeof it.promotionAsPercentage === 'number' && it.promotionAsPercentage > 0) {
        return { type: 'promo', text: `-${it.promotionAsPercentage}%` }
      }
      return null
    })

    async function onClick(id: number) {
      await router.push({ name: 'Product', params: { productId: id } })
      console.log('Navigated to product:', id)
    }



    return {
      getQuantity,
      isProductAdded,
      emitAdd,
      onUpdateQuantity,
      formatPrice,
      onClick,
      badge
    }
  }
})
</script>

<style scoped>
.product-card {
  width: 100%;
  max-width: 260px;
  background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(12, 20, 35, 0.06);
  transition: transform 220ms ease, box-shadow 220ms ease;
  display: flex;
  flex-direction: column;
}
.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 44px rgba(12, 20, 35, 0.12);
}
.image-wrap {
  position: relative;
  height: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
}
.product-img {
  width: auto;
  max-width: 85%;
  max-height: 140px;
  object-fit: contain;
  display: block;
  transition: transform 300ms ease;
}
.image-wrap:hover .product-img { transform: scale(1.04); }

.badge {
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
  font-weight: 700;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
}

/* badge variants */
.badge.hot {
  background: linear-gradient(90deg,#ef4444,#dc2626); /* red */
}
.badge.sale {
  background: linear-gradient(90deg,#f59e0b,#fbbf24); /* yellow/orange */
}
.badge.promo {
  background: linear-gradient(90deg,#10b981,#16a34a); /* green */
}

.img-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 12px;
  background: linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.18) 100%);
  opacity: 0;
  transition: opacity 220ms ease;
}
.image-wrap:hover .img-overlay { opacity: 1; }
.quick-view {
  background: rgba(255,255,255,0.92);
  border: none;
  padding: 6px 12px;
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
}

.card-body {
  padding: 14px 14px 18px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.brand {
  font-size: 12px;
  color: #6b7280;
}
.rating {
  display: flex;
  align-items: center;
  gap: 6px;
}
.star {
  width: 14px;
  height: 14px;
  fill: currentColor;
  color: #d1d5db;
}
.star.filled { color: #f6b93b; }
.rating-num { font-size: 12px; color: #9ca3af; }

.product-title {
    width: 100%;
  font-size: 14px;
  color: #0f172a;
  margin: 0;
  line-height: 1.2;
  font-weight: 700;
}
.product-size { font-size: 12px; color: #9ca3af; }

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
}
.prices { display: flex; align-items: baseline; gap: 10px; }
.price-current { font-size: 18px; font-weight: 800; color: #16a34a; }
.price-old { font-size: 13px; color: #9ca3af; text-decoration: line-through; }

.btn-add {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  background: linear-gradient(90deg, rgba(16,185,129,0.12), rgba(34,197,94,0.12));
  border: 1px solid #16a34a;
  color: #16a34a;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 700;
}
.btn-add { width: auto; height: 30px;}
.icon-plus { width: 14px; height: 14px; }

.qty-control { display: flex; align-items: center; }
.qty-input {
  width: 64px;
  padding: 6px 8px;
  border-radius: 8px;
  border: 1px solid #16a34a;
  background: transparent;
  color: #16a34a;
  font-weight: 700;
  text-align: center;
}

/* small screens tweak */
@media (max-width: 420px) {
  .product-card { max-width: 220px; }
  .price-current { font-size: 16px; }
}
</style>
