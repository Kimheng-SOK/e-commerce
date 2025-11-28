<template>
    <main class="product_card border">
        <section class="product_image h-[170px] bg-gray-200 flex justify-center items-center">
            <div class="absolute top-5 left-0 bg-green-400 w-20 h-10 rounded-r-full text-white">
                <span class="flex justify-center items-center h-full">
                </span>
            </div>
            <a href="#">
                <img :src="item.image" alt="product image">
            </a>
        </section>
        <section class="product_details flex flex-col gap-2 p-4">
            <span class="brand text-[#7E7E7E] text-[12px]" > {{ item.brandName ?? 'Brand' }}</span>
            <a href="#">
                <h5 class="product_name text-[#253D4E] text-[16px] font-bold" >{{ item.name }}</h5>
            </a>
            <div class="flex flex-row items-center gap-2">
                <div class="rating_range flex flex-row items-center w-[72px] h-[12px] gap-1">
                    <template v-for="i in 5" :key="i">
                        <svg
                        :class="['w-5 h-5 fill-current', i <= (item.rating ?? 0) ? 'text-yellow-400' : 'text-gray-300']"
                        :style="i <= (item.rating ?? 0) ? { color: '#f59e0b' } : { color: '#d1d5db' }"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        role="img"
                        :aria-label="`${i <= (item.rating ?? 0) ? 'filled' : 'empty'} star`"
                        >
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
                        </svg>
                    </template>
                </div>
                <span>({{ item.rating ?? 0 }})</span>
            </div>
            <span class="text-base text-light text-gray-400">{{ item.size }}</span>
            <div class="flex items-center justify-between mt-4">
          <div class="flex flex-row items-center gap-2">
            <span class="text-3xl font-extrabold text-green-400 text-heading"
              >${{ formatPrice((item.price ?? 0) * (1 - (item.promotionAsPercentage ?? 0) / 100)) }}</span
            >
            <span class="text-lg font-light text-gray-400 text-heading line-through"
              >${{ item.promotionAsPercentage ?? 0 }}</span
            >
          </div>

          <div v-if="!isProductAdded(item.name)">
          <button
            type="button"
            @click="emitAdd(item.name)"
            class="inline-flex items-center text-green-600 bg-green-200 leading-5 rounded-[4px] text-sm font-medium px-6 py-2.5"
          >
            Add
            <!-- inline plus SVG to replace unresolved <Plus/> component -->
            <svg class="w-4 h-4 ml-1 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M11 11V5a1 1 0 1 1 2 0v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6z" />
            </svg>
          </button>
        </div>

        <div v-else class="inline-flex items-center bg-green-200 leading-5 rounded-[4px] text-sm font-medium">
            <input
              type="number"
              :value="getQuantity(item.name)"
              @input="onUpdateQuantity(item.name, $event)"
              min="0"
              class="text-green-600 text-center text-sm bg-transparent w-20 py-2.5 outline-none focus:ring-2 focus:ring-green-400 rounded-[4px]"
            />
          </div>
        </div>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProductComponent',
  props: {
    item: { type: Object as () => any, required: true },
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
      return (Math.round(value * 1000) / 1000).toFixed(3)
    }

    return {
      getQuantity,
      isProductAdded,
      emitAdd,
      onUpdateQuantity,
      formatPrice
    }
  }
})
</script>