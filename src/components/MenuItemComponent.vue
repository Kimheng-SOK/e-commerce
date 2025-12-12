<template>
  <div class="menu-item" @mouseenter="hover = true" @mouseleave="hover = false">
    <component :is="icon" v-if="icon" />
    <span class="label" >{{ label }}</span>
    <span v-if="hasDropdown" class="arrow">&#9662;</span>
    <div v-if="hasDropdown && hover" class="dropdown">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "MenuItemComponent",
  props: {
    label: { type: String, required: true },
    hasDropdown: { type: Boolean, default: false },
    icon: { type: [Object, Function], default: null },

  },
  data() {
    return { hover: false };
  }
};
</script>

<style scoped>
.menu-item {
  padding: 0 2px;
  font-size: 16px;
  color: #3a4d39;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
}

.label {
  size: 16px;
}

.menu-item:hover {
  background: #f6fff7;
}
.arrow {
  margin-left: 6px;
  font-size: 20px;
}
.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  border: 1px solid #d4e9d7;
  border-radius: 4px;
  min-width: 120px;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
</style>
