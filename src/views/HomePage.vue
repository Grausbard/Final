<template>
  <div class="page-wrapper">
  <div class="home">

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Маркетплейс с душой</h1>
        <p class="hero-subtitle">Плати людям, а не корпорациям</p>
        <div class="hero-buttons">
          <button class="btn primary-button">К товарам</button>
          <button class="btn secondary-button">О проекте</button>
        </div>
      </div>
      <div class="hero-image-wrapper">
        <img src="@/assets/heart2.png" alt="Big Heart" class="big-heart" />
        <img src="@/assets/girl.png" alt="Girl" class="hero-image" />
        <img src="@/assets/heart1.png" alt="Heart" class="heart-small heart-top" />
        <img src="@/assets/heart3.png" alt="Heart" class="heart-small heart-bottom" />
      </div>
    </section>

    <!-- Best Products Section -->
    <div class="best-products-container">
      <section class="best-products" v-for="(section, index) in sections" :key="index">
        <h2 class="section-title">Лучшие товары недели</h2>
        <div class="products-grid">
          <div class="product-card" 
       v-for="product in products" 
       :key="product.id"
       @click="goToProduct(product.id)">
    <div class="product-content">
      <img :src="product.image" :alt="product.name" class="product-image" />
      <div class="product-info">
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-status">{{ product.status }}</p>
      </div>
    </div>
    <div class="product-footer">
      <div class="price-info">
        <div class="price-block">
          <span v-if="product.oldPrice" class="old-price">{{ product.oldPrice }}₸</span>
          <span class="price" :class="{ 'red': product.oldPrice }">{{ product.price }}₸</span>
        </div>
        <div class="seller-info">
          <img src="@/assets/profile-icon.png" alt="Seller" class="seller-icon" />
          <span class="seller-name">{{ product.sellerName }}</span>
        </div>
      </div>
      <button 
        class="add-to-cart-btn" 
        :class="{ 'active': isProductInCart(product.id) }"
        @click.stop="toggleCart(product)"
      >
        {{ isProductInCart(product.id) ? '+' : '+' }}
      </button>

    </div>
  </div>

        </div>

      </section>
    </div>
  </div>
</div>
</template>

<script>
import { useCartStore } from '@/stores/cartStore'


export default {

  name: 'HomePage',
  setup() {
    const cartStore = useCartStore()
    
    return {
      cartStore,
      isProductInCart: (productId) => cartStore.items.some(item => item.id === productId)
    }
  },
  data() {
    return {
      sections: [1, 2, 3, 4],
      products: [
        {
          id: 1,
          name: 'Минималистичный стул',
          status: 'В наличии',
          price: '27 000',
          image: require('@/assets/product1.png'),
          sellerName: 'GreenTal',
          isActive: false
        },
        {
          id: 2,
          name: 'Ковёр в национальном стиле с орнаментом',
          status: 'Под заказ (1-2 недели)',
          price: '56 990',
          image: require('@/assets/product2.png'),
          sellerName: 'Руслан А.',
          isActive: false
        },
        {
          id: 3,
          name: 'Светильник из стали',
          status: 'В наличии',
          price: '9000',
          image: require('@/assets/product3.png'),
          sellerName: 'Мадина И.',
          isActive: false
        },
        {
          id: 4,
          name: 'Лофт-комплект из стола и стула',
          status: 'Под заказ (2-4 недели)',
          price: '89 990',
          oldPrice: '93 500',
          image: require('@/assets/product4.png'),
          sellerName: 'СП «Медиалайн»',
          isActive: false
        },
        {
          id: 5,
          name: 'Худи "Barcode"',
          status: 'В наличии',
          price: '15 000',
          image: require('@/assets/product5.png'),
          sellerName: 'Ержан Г.',
          isActive: false
        }
      ]
    }
  },

  methods: {
    goToProduct(id) {
  const product = this.products.find(p => p.id === id);
  this.$router.push({
    name: 'Product',
    params: { 
      id: id.toString()
    },
    query: {
      name: product.name,
      price: product.price,
      oldPrice: product.oldPrice || null, // Добавляем старую цену
      seller: product.sellerName,
      status: product.status,
      image: product.image,
      color: product.color || 'default' // Добавляем цвет
    }
  })
},

toggleCart(product) {
  const productToAdd = {
    id: product.id,
    name: product.name,
    price: parseInt(product.price.replace(/\s/g, '')), // Преобразуем строку в число
    oldPrice: product.oldPrice ? parseInt(product.oldPrice.replace(/\s/g, '')) : null,
    status: product.status,
    image: product.image,
    sellerName: product.sellerName,
    color: product.color || 'default'
  }
  
  if (this.isProductInCart(product.id)) {
    this.cartStore.removeFromCart(product.id)
  } else {
    this.cartStore.addToCart(productToAdd)
  }
}
  }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 200px; // Отступ для футера
}

.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 80px 40px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 600px;
  position: relative;
  overflow: hidden;

  .hero-content {
    max-width: 500px;
    z-index: 2;

    .hero-title {
      font-family: 'Montserrat', sans-serif;
      font-size: 64px;
      font-weight: 700;
      line-height: 1.2;
      color: #2C3E50;
      margin-bottom: 24px;
    }

    .hero-subtitle {
      font-family: 'Montserrat', sans-serif;
      font-size: 20px;
      font-weight: 500;
      color: #666;
      margin-bottom: 48px;
    }

    .hero-buttons {
      display: flex;
      gap: 16px;

      .btn {
        font-family: 'Montserrat', sans-serif;
        font-size: 16px;
        font-weight: 600;
        padding: 16px 32px;
        border-radius: 8px;
        text-decoration: none;
        cursor: pointer;
        transition: all 0.2s ease;

        &.primary-button {
          background: #DC2840;
          color: white;
          border: none;

          &:hover {
            background: darken(#DC2840, 5%);
          }
        }

        &.secondary-button {
          background: transparent;
          color: #666;
          border: none;

          &:hover {
            color: #DC2840;
          }
        }
      }
    }
  }

  .hero-image-wrapper {
    position: relative;
    width: 600px;
    height: 600px;

    .hero-image {
      position: absolute;
      right: 0;
      bottom: 0;
      width: auto;
      height: 90%;
      z-index: 2;
    }

    .big-heart {
      position: absolute;
      right: -50px;
      bottom: -50px;
      width: 120%;
      height: auto;
      z-index: 1;
    }

    .small-heart {
      position: absolute;
      width: 40px;
      height: auto;
      z-index: 3;

      &.top-heart {
        top: 20%;
        left: 20%;
        transform: rotate(-15deg);
      }

      &.bottom-heart {
        bottom: 30%;
        right: 10%;
        transform: rotate(15deg);
      }
    }
  }
}

.best-products {
  padding: 30px 40px;
  max-width: 1200px;
  margin: 0 auto;

  .best-products-container {
  flex: 1;
  margin-bottom: 40px;
  }

  .section-title {
    font-family: Montserrat;
    font-size: 32px;
    font-weight: 700;
    line-height: 39.01px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    margin-bottom: 40px;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(5, 230px);
    gap: 24px;
  }

  .product-card {
  width: 230px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .product-content {
    .product-image {
      width: 230px;
      height: 230px;
      object-fit: cover;
      border-radius: 12px;
    }

    .product-info {
      padding: 16px 0;

      .product-name {
        font-family: Montserrat;
        font-size: 16px;
        font-weight: 600;
        line-height: 19.5px;
        text-align: left;
        margin-bottom: 4px;
      }

      .product-status {
        font-family: Montserrat;
        font-size: 16px;
        font-weight: 400;
        line-height: 19.5px;
        text-align: left;
        color: #676767;
      }
    }
  }

  .product-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end; // Изменено для выравнивания по нижнему краю
  padding-top: 16px;

  .price-info {
    .price-block {
      display: flex;
      flex-direction: column;
      margin-bottom: 8px;

      .old-price {
        font-family: Montserrat;
        font-size: 14px;
        font-weight: 400;
        line-height: 17px;
        color: #676767;
        text-decoration: line-through;
      }

      .price {
        font-family: Montserrat;
        font-size: 24px;
        font-weight: 700;
        line-height: 29.26px;
        color: #000;
        margin-top: 4px;
        
        &.red {
          color: #DC2840;
        }
      }
    }

    .seller-info {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 8px;

      .seller-icon {
        width: 16px;
        height: 16px;
      }

      .seller-name {
        font-family: Montserrat;
        font-size: 12px;
        font-weight: 400;
        line-height: 14.63px;
        color: #676767;
      }
    }
  }

  .add-to-cart-btn {
    width: 42px;
    height: 32px;
    border-radius: 8px;
    background: #F5F5F5;
    border: none;
    cursor: pointer;
    font-size: 20px;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    align-self: flex-end; // Добавлено для выравнивания с новой ценой
    
    &:hover {
      background: #DC2840;
      color: white;
    }

    &.active {
      background: #DC2840;
      color: white;
      width: Hug (58px)px;
      height: Hug (40px)px;
      top: -4px;
      left: 172px;
      padding: 10px 24px 10px 24px;
      gap: 8px;
      border-radius: 8px;
      opacity: 0px;
    }
  }
}

}
}

@media (max-width: 1024px) {
  .hero {
    flex-direction: column;
    text-align: center;
    padding: 40px 20px;

    .hero-content {
      margin-bottom: 40px;

      .hero-buttons {
        justify-content: center;
      }
    }

    .hero-image-wrapper {
      width: 100%;
      height: 400px;
    }
  }
}


@media (max-width: 1200px) {
  .products-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 992px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .hero {
    grid-template-columns: 1fr;
    text-align: center;

    .hero-buttons {
      justify-content: center;
    }
  }
}

@media (max-width: 768px) {
  .header {
    .nav {
      display: none;
    }
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .hero-title {
    font-size: 48px;
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }

  .hero-title {
    font-size: 36px;
  }
}
</style>