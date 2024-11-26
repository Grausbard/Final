<!-- views/CartPage.vue -->
<template>
    <div class="cart-page">
      <div class="breadcrumbs">
        <router-link to="/">Главная</router-link> • 
        <span>Корзина</span>
      </div>
  
      <h1 class="cart-title">Моя корзина</h1>
  
      <div class="cart-content">
        <div class="cart-main">
          <div class="cart-header">
            <label class="select-all">
              <input type="checkbox" :checked="allSelected" @change="toggleSelectAll">
              Выбрать все
            </label>
            <button class="delete-btn">Удалить</button>
          </div>
  
          <div class="cart-items">
            <div v-for="item in cartItems" :key="item.id" class="cart-item">
              <div class="item-main">
                <input type="checkbox" v-model="item.selected">
                <img :src="item.image" :alt="item.name" class="item-image">
                <div class="item-info">
                  <h3 class="item-name">{{ item.name }}</h3>
                  <div class="item-status" :class="{ 'in-stock': item.status === 'В наличии', 'pre-order': item.status.includes('Под заказ') }">
                    {{ item.status }}
                  </div>
                  <div class="item-color" v-if="item.color">
                    <span class="color-dot" :style="{ backgroundColor: item.color }"></span>
                    {{ item.colorName }}
                  </div>
                  <div class="item-seller">
                    <img src="@/assets/profile-icon.png" alt="Seller" class="seller-icon">
                    {{ item.sellerName }}
                  </div>
                </div>
              </div>
  
              <div class="item-controls">
                <div class="price-block">
                  <div class="current-price">{{ formatPrice(item.price) }}₸</div>
                  <div v-if="item.oldPrice" class="old-price">{{ formatPrice(item.oldPrice) }}₸</div>
                </div>
                
                <div class="quantity-controls">
                  <button @click="decreaseQuantity(item)" class="quantity-btn">−</button>
                  <input type="number" v-model="item.quantity" min="1">
                  <button @click="increaseQuantity(item)" class="quantity-btn">+</button>
                </div>
  
                <div class="action-buttons">
                  <button class="favorite-btn">
                    <img src="@/assets/like.png" alt="В избранное">
                  </button>
                  <button class="remove-btn">
                    <img src="@/assets/trash.png" alt="Удалить">
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div class="order-details">
          <h2>Детали заказа</h2>
          <div class="order-summary">
            <div class="summary-row">
              <span>Покупки</span>
              <span>{{ formatPrice(cartTotal) }}₸</span>
            </div>
            <div class="summary-row">
              <span>Доставка</span>
              <span>{{ formatPrice(delivery) }}₸</span>
            </div>
            <div class="summary-row">
              <span>Скидка</span>
              <span>-{{ formatPrice(discount) }}₸</span>
            </div>
            <div class="summary-total">
              <span>Всего</span>
              <span>{{ formatPrice(finalTotal) }}₸</span>
            </div>
          </div>
          <button class="checkout-btn">Оформить заказ</button>
        </div>
      </div>
    </div>
  </template>
  
  
  
  <script>
  import { useCartStore } from '@/stores/cartStore'
  import { computed } from 'vue'
  
  export default {
    name: 'CartPage',
    
    setup() {
      const cartStore = useCartStore()
  
      return {
        cartItems: computed(() => cartStore.items),
        cartTotal: computed(() => cartStore.cartTotal),
        finalTotal: computed(() => cartStore.finalTotal),
        delivery: computed(() => cartStore.delivery),
        discount: computed(() => cartStore.discount),
        allSelected: computed(() => cartStore.items.every(item => item.selected))
      }
    },
  
    methods: {
      formatPrice(price) {
        return new Intl.NumberFormat('ru-RU').format(price)
      },
  
      toggleSelectAll(event) {
        const cartStore = useCartStore()
        cartStore.toggleSelectAll(event.target.checked)
      },
  
      toggleItemSelection(productId) {
        const cartStore = useCartStore()
        cartStore.toggleSelection(productId)
      },
  
      removeItem(productId) {
        const cartStore = useCartStore()
        cartStore.removeFromCart(productId)
      },
  
      increaseQuantity(item) {
        const cartStore = useCartStore()
        cartStore.updateQuantity(item.id, item.quantity + 1)
      },
  
      decreaseQuantity(item) {
        const cartStore = useCartStore()
        if (item.quantity > 1) {
          cartStore.updateQuantity(item.id, item.quantity - 1)
        }
      },
  
      deleteSelected() {
        const cartStore = useCartStore()
        cartStore.items
          .filter(item => item.selected)
          .forEach(item => cartStore.removeFromCart(item.id))
      },
  
      checkout() {
        // Реализация оформления заказа
        console.log('Оформление заказа')
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
.cart-page {
  padding: 40px;
  background: #F8F8F8;

  .breadcrumbs {
    margin-bottom: 24px;
    color: #666;
    
    a {
      color: #666;
      text-decoration: none;
      
      &:hover {
        color: #E31E24;
      }
    }
  }

  .cart-title {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 32px;
  }

  .cart-content {
    display: flex;
    gap: 32px;
  }

  .cart-main {
    flex: 1;
  }

  .cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    background: white;
    padding: 16px;
    border-radius: 8px;

    .select-all {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }

    .delete-btn {
      padding: 8px 16px;
      background: #F5F5F5;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
  }

  .cart-item {
    background: white;
    padding: 24px;
    margin-bottom: 8px;
    border-radius: 8px;

    .item-main {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;

      input[type="checkbox"] {
        width: 20px;
        height: 20px;
      }

      .item-image {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 8px;
      }

      .item-info {
        .item-name {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .item-status {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 14px;
          margin-bottom: 8px;

          &.in-stock {
            background: #E8F5E9;
            color: #2E7D32;
          }

          &.pre-order {
            background: #FFF3E0;
            color: #E65100;
          }
        }

        .item-color {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;

          .color-dot {
            width: 16px;
            height: 16px;
            border-radius: 50%;
          }
        }

        .item-seller {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #666;
          font-size: 14px;

          .seller-icon {
            width: 16px;
            height: 16px;
          }
        }
      }
    }

    .item-controls {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 32px;

      .price-block {
        text-align: right;

        .current-price {
          font-size: 24px;
          font-weight: 700;
        }

        .old-price {
          color: #666;
          text-decoration: line-through;
          font-size: 14px;
        }
      }

      .quantity-controls {
        display: flex;
        align-items: center;
        gap: 8px;
        background: #F5F5F5;
        border-radius: 8px;
        padding: 4px;

        button {
          width: 32px;
          height: 32px;
          border: none;
          background: none;
          cursor: pointer;
          font-size: 18px;
        }

        input {
          width: 40px;
          text-align: center;
          border: none;
          background: none;
          font-size: 16px;
        }
      }

      .action-buttons {
        display: flex;
        gap: 16px;

        button {
          background: none;
          border: none;
          padding: 8px;
          cursor: pointer;

          img {
            width: 24px;
            height: 24px;
          }
        }
      }
    }
  }

  .order-details {
    width: 300px;
    background: white;
    padding: 24px;
    border-radius: 8px;
    height: fit-content;

    h2 {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 24px;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
      color: #666;
    }

    .summary-total {
      margin-top: 24px;
      padding-top: 24px;
      border-top: 1px solid #E6E6E6;
      font-weight: 700;
      font-size: 18px;
    }

    .checkout-btn {
      width: 100%;
      padding: 16px;
      background: #E31E24;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      margin-top: 24px;
      cursor: pointer;

      &:hover {
        background: darken(#E31E24, 5%);
      }
    }
  }
}

  </style>
  