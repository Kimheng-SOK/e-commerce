<template>
  <div class="showcase">
    <div class="showcase-content">
      <h2 class="showcase-title">Don’t miss amazing grocery deals</h2>
      <div class="showcase-desc">Sign up for the daily newsletter</div>
      <form class="newsletter-form" @submit.prevent="subscribe">
        <div class="input-group">
          <span class="input-icon">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path d="M4 4h16v16H4V4zm2 4l6 5 6-5" stroke="#888" stroke-width="2" fill="none"/>
            </svg>
          </span>
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
    <img src="/showcase.png" alt="Showcase" class="showcase-img" />
  </div>
</template>

<script>
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
  }
};
</script>

<style scoped>
.showcase {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fdf6e3;
  border-radius: 18px;
  overflow: hidden;
  min-height: 240px;
  padding: 32px 48px;
  box-sizing: border-box;
  width: 100%;
  max-width: 1000px;
  margin: 32px auto;
  /* border for indication only, remove color if not needed */
  border: 2px solid transparent;
}
.showcase-content {
  max-width: 420px;
  z-index: 2;
}
.showcase-title {
  font-size: 2.2rem;
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
  height: 180px;
  object-fit: contain;
  z-index: 1;
  margin-left: 32px;
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
    width: 100%;
    height: auto;
  }
}
</style>
