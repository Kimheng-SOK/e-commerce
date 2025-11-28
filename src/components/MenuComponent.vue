<script lang="ts">
import { defineComponent, type PropType } from 'vue'
export default defineComponent({
  name: 'MenuComponent',
  props: {
    categories: { type: String, default: '' },
    groupName: { type: Array as PropType<string[]>, default: () => [] },
    selectedGroup: { type: String, default: '' }
  },
  emits: ['update-group', 'update:selectedGroup'],
  methods: {
    selectGroup(group: string) {
      this.$emit('update-group', group)
      this.$emit('update:selectedGroup', group)
    }
  }
})
</script>

<template>
    <div class="flex flex-row justify-between items-center">
      <div class="text-[32px] font-bold mt-10 mb-5 ml-5">{{ categories }}</div>
    </div>

    <div>
      <div class="text-[16px] font-bold text-center text-body">
        <ul class="flex flex-wrap justify-between -mb-px w-auto gap-[30px]">
          <li class="mr-2" v-for="group in groupName" :key="group">
            <a href="#"
               @click.prevent="selectGroup(group)"
               :class="['inline-block p-4 rounded-t-lg border-b-2 transition-colors duration-150', { 'border-accent': group === selectedGroup, 'border-transparent': group !== selectedGroup }]"
               >
              {{ group }}
            </a>
          </li>
        </ul>
      </div>
    </div>
</template>