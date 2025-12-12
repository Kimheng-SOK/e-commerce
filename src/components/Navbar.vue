<template>
  <nav class="navbar">
    <div class="navbar-top">
        <div class="navbar-left">
          <router-link to="/" class="logo">
              <img src="/logo.png" alt="Melon" />
          </router-link>
          <SearchBoxComponent class="searchbox" />
        </div>
      <div class="navbar-icons">
        <MenuItemComponent :icon="iconAcc" label="Account" class="icon-item"/>
        <MenuItemComponent :icon="iconCompare" label="Compare" class="icon-item"/>
        <MenuItemComponent :icon="iconHeart" label="Wishlist" class="icon-item"/>
        <MenuItemComponent :icon="iconCartShop" label="Cart" class="icon-item"/>
      </div>
    </div>
    <div class="navbar-bottom">
      <!-- <button class="browse-btn">Browse All Categories</button> -->
      <div style="display: flex; gap:30px;">
        <MenuItemComponent :icon="iconCategory" label="Browse All categories" hasDropdown class="browse-btn"></MenuItemComponent>
        <MenuItemComponent :icon="iconFlame" label="Hot Deals" style="display: flex; gap: 6px" />
        <div class="nav_item">
          <MenuItemComponent label="Home" />
          <MenuItemComponent label="Food" hasDropdown>
            <div>Fruits</div>
            <div>Vegetables</div>
            <div>Meat & Seafood</div>
          </MenuItemComponent>
          <MenuItemComponent label="Vegetables" hasDropdown>
            <div>Leafy</div>
            <div>Root</div>
          </MenuItemComponent>
          <MenuItemComponent label="Drink" />
          <MenuItemComponent label="Cookies" />
          <MenuItemComponent label="Meat & Seafood" />
          <MenuItemComponent label="Bakery" />
        </div>
      </div>

      <div class="support">
        <component :is="iconHeadset" v-if="iconHeadset" />
        <div class="support-info">
          <div class="support-phone">1900 - 8888</div>
          <div class="support-desc">24/7 Support Center</div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// @ts-ignore: no declaration file for .vue import
import SearchBoxComponent from '@/components/SearchBoxComponent.vue'
import MenuItemComponent from '@/components/MenuItemComponent.vue'
import iconFlame from '@/assets/IconComponents/icon-flame.vue'
import iconCategory from '@/assets/IconComponents/icon-category.vue'
import iconHeadset from '@/assets/IconComponents/icon-headset.vue'
import iconAcc from '@/assets/IconComponents/icon-acc.vue'
import iconCompare from '@/assets/IconComponents/icon-compare.vue'
import iconHeart from '@/assets/IconComponents/icon-heart.vue'
import iconCartShop from '@/assets/IconComponents/icon-cart-shop.vue'

export default defineComponent({
  name: "NavBar",
  components: {
    SearchBoxComponent,
    MenuItemComponent,
  },
  setup() {
    return {
      iconFlame,
      iconCategory,
      iconHeadset,
      iconAcc,
      iconCompare,
      iconHeart,
      iconCartShop,
    }
  }
});
</script>

<style scoped>
.navbar {
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d4e9d7;
  font-family: 'Segoe UI', Arial, sans-serif;
}
.navbar-top {
  display: flex;
  justify-content: space-between;
  padding: 12px 32px;
  gap: 32px;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}
.logo img {
  width: auto;
  height: 48px;
}
.logo-text .brand {
  font-size: 22px;
  font-weight: bold;
  color: #3a4d39;
}
.logo-text .desc {
  font-size: 12px;
  color: #3a4d39;
}
.searchbox {
  flex: 1;
  margin: 0 32px;
}
.navbar-icons {
  display: flex;
  align-items: right;
  gap: 24px;
}
.icon-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  color: #3a4d39;
  cursor: pointer;
}
.navbar-bottom {
  display: flex;
  align-items: center;
  padding: 8px 32px;
  gap: 8px;
  background: #f6fff7;
  border-top: 1px solid #d4e9d7;
}
.nav_item {
  /* width: 738px; */
  display: flex;
  align-items: center;
  gap: 20px;
}
.browse-btn {
  width: 220px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #3BB77E;
  color: #fff;
  border: none;
  border-radius: 5px;
  /* padding: 8px 16px; */
  font-size: 15px;
  cursor: pointer;
  /* margin-right: 8px; */
}
.browse-btn:hover {
  background: #3a4d39;
}

.support{
  display: flex;
  align-items: end;
  margin-left: auto;
  gap: 6px;
}

.support-info {
  margin-left: auto;
  text-align: right;
  color: #3a4d39;
}
.support-phone {
  font-size: 18px;
  font-weight: bold;
  color: #1fa463;
}
.support-desc {
  font-size: 12px;
}
</style>
