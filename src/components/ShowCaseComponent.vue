<template>
  <div class="showcase">
    <img src="../../public/sub-bg.png" alt="sub-bg" class="showcase-bg">
    <div class="showcase-content">
      <h2 class="showcase-title">Don’t miss amazing grocery deals</h2>
      <div class="showcase-desc">Sign up for the daily newsletter</div>
      <form class="newsletter-form" @submit.prevent="subscribe">
        <div class="input-group">
          <component :is="iconPaperPlane" class="input-icon" />
          <input
            v-model="email"
            type="email"
            class="newsletter-input"
            placeholder="Your email address"
            required
          />
        </div>
        <button type="submit" class="subscribe-btn">Subscribe</button>
      </form>
    </div>
    <img src="../../public/showcase-item.png" alt="Showcase" class="showcase-img" />
  </div>
</template>

<script lang="ts">
import iconPaperPlane from '@/assets/IconComponents/icon-paper-plane.vue';
export default {
  name: "ShowCaseComponent",
  data() {
    return {
      email: ""
    };
  },
  methods: {
    subscribe() {
      // Handle subscription logic here
      this.$emit("subscribe", this.email);
      this.email = "";
    }
  },
  setup() {
    return {
      iconPaperPlane
    }
  }
};
</script>

<style scoped>
.showcase {
  width: 100%;
  height: 400px;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #FDC04033;
  border-radius: 18px;
  overflow: hidden;
  box-sizing: border-box;
  border: 2px solid transparent;
}

.showcase-bg {
  position: absolute;
  top: 0;
  left: 0;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.showcase-content {
  max-width: 770px;
  margin-left: 50px;
  z-index: 2;
}
.showcase-title {
  font-size: 4rem;
  font-weight: 700;
  color: #253d4e;
  margin-bottom: 12px;
}
.showcase-desc {
  font-size: 1.1rem;
  color: #253d4e;
  margin-bottom: 24px;
}
.newsletter-form {
  display: flex;
  gap: 12px;
  align-items: center;
}
.input-group {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 6px;
  border: 1px solid #d4e9d7;
  padding: 0 8px;
  height: 40px;
}
.input-icon {
  display: flex;
  align-items: center;
  margin-right: 6px;
}
.newsletter-input {
  border: none;
  outline: none;
  font-size: 15px;
  background: transparent;
  color: #253d4e;
  width: 170px;
  padding: 8px 0;
}
.subscribe-btn {
  background: #1fa463;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0 24px;
  height: 40px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.subscribe-btn:hover {
  background: #168a52;
}
.showcase-img {
  height: 100%;
  z-index: 2;
  border-radius: 12px;
  background: none;
}
@media (max-width: 900px) {
  .showcase {
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
  }
  .showcase-img {
    margin-left: 0;
    margin-top: 24px;
    height: auto;
  }
}
</style>
