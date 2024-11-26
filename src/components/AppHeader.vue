<!-- components/AppHeader.vue -->
<template>
  <header class="header">
    <router-link to="/" class="logo">
      <div class="logo-wrapper">
        <img src="@/assets/logo.png" alt="Red bag icon" class="red-bag-icon" />
        <span class="daridobro-text">ДариДобро</span>
      </div>
      <div class="divider"></div>
      <img src="@/assets/bee.png" alt="Bee logo" class="bee-img" />
    </router-link>

    <nav class="nav">
      <router-link to="/" class="nav-link">Продукция</router-link>
      <router-link to="/" class="nav-link">Стать партнером</router-link>
      <router-link to="/" class="nav-link">О проекте</router-link>
    </nav>
      <div class="header-icons">
        <button class="icon-button">
          <img src="@/assets/search-icon.png" alt="Search" />
        </button>
        <button class="icon-button">
          <img src="@/assets/profile-icon.png" alt="Profile" />
        </button>
        
        <router-link to="/cart" class="cart-icon">
        <img src="@/assets/cart-icon.png" alt="Cart" />
        <span class="cart-badge" v-if="cartItemCount > 0">{{ cartItemCount }}</span>
      </router-link>
      </div>
    </header>
  </template>
  
  <script>
  import { useCartStore } from '@/stores/cartStore'
import { computed } from 'vue'

export default {
  name: 'AppHeader',
  setup() {
    const cartStore = useCartStore()
    return {
      cartItemCount: computed(() => cartStore.itemCount)
    }
  }
}

  </script>
  
  <style lang="scss" scoped>
.header {
  height: 80px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);

  .logo {
    display: flex;
    align-items: center;

    .logo-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .divider {
      width: 1px;
      height: 24px;
      background-color: #E0E0E0;
      margin: 0 16px;
    }

    .red-bag-icon {
      height: 32px;
    }

    .daridobro-text {
        font-family: Montserrat;
        font-size: 20px;
        font-weight: 700;
        line-height: 24.38px;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
    }

    .bee-img {
      height: 24px;
    }
  }

    .router-link-active {
    color: #000000;
  }

  .logo {
    text-decoration: none;
    color: inherit;
  }


  .nav {
    display: flex;
    gap: 32px;

    .nav-link {
      font-family: Montserrat;
        font-size: 16px;
        font-weight: 500;
        line-height: 19.5px;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;

      
      &:hover {
        font-family: Montserrat;
        font-size: 16px;
        font-weight: 700;
        line-height: 19.5px;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;
      }
    }
  }

  .header-icons {
    display: flex;
    gap: 24px;

    .icon-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;

      img {
        height: 24px;
      }
    }

    .cart-icon {
      position: relative;

      .cart-badge {
        position: absolute;
        top: 0;
        right: 0;
        background: #e31e24;
        color: white;
        font-size: 12px;
        padding: 2px 6px;
        border-radius: 50%;
      }
    }
  }
}
  </style>
  