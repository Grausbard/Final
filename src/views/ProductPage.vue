<template>
  <div class="product-page">
    <div class="breadcrumbs">
      <router-link to="/">Главная</router-link> •
      <router-link to="/">Лучшие продукты недели</router-link> •
      <span>{{ productData.name }}</span>
    </div>

    <div class="product-content">
      <div class="product-gallery">
        <!-- Основное изображение -->
        <div class="main-image-container">
          <img :src="currentImage" :alt="productData.name" class="main-image" />
        </div>
        
        <!-- Вертикальная галерея -->
        <div class="thumbnail-gallery">
          <div 
            v-for="(image, index) in productImages" 
            :key="index"
            class="thumbnail"
            :class="{ active: currentImageIndex === index }"
            @click="setCurrentImage(index)"
          >
            <img :src="image" :alt="`${productData.name} view ${index + 1}`" />
          </div>
        </div>
      </div>

      <div class="product-info">
        <div class="product-header">
      <h1 class="product-title">{{ productData.name }}</h1>
      <button class="favorite-btn" @click="toggleFavorite">
        <img 
          :src="require('@/assets/like.png')" 
          :class="{ 'active': isFavorite }"
          alt="Like"
          class="like-icon"
        />
      </button>
    </div>
        <div class="product-meta">
          <span class="availability">{{ productData.status }}</span>
          <span class="article"> Article no.: {{ productData.articleNo }}</span>
        </div>

        <!-- Выбор цвета -->
        <div class="color-selection">
          <div 
            v-for="(color, index) in colors" 
            :key="index"
            class="color-option"
            :class="{ active: selectedColor === index }"
            :style="{ backgroundColor: color }"
            @click="selectColor(index)"
          ></div>
        </div>

        <div class="seller-info">
          <img src="@/assets/profile-icon.png" :alt="productData.seller" class="seller-avatar" />
          <span class="seller-name">{{ productData.seller }}</span>
        </div>

        <div class="product-purchase">
          <div class="price">{{ productData.price }}₸</div>
          <button class="add-to-cart-btn" @click="addToCart">Добавить в корзину</button>
        </div>

        
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cartStore'
export default {
  name: 'ProductPage',
  setup() {
    const cartStore = useCartStore()
    return { cartStore }
  },
  data() {
    return {
      productData: {
        id: this.$route.params.id,
        name: this.$route.query.name,
        price: parseInt(this.$route.query.price.replace(/\s/g, '')), // Преобразуем в число
        oldPrice: this.$route.query.oldPrice ? parseInt(this.$route.query.oldPrice.replace(/\s/g, '')) : null,
        seller: this.$route.query.seller,
        status: this.$route.query.status,
        articleNo: 'random-gift',
        color: this.$route.query.color || 'default'
      },
      currentImageIndex: 0,
      selectedColor: 0,
      isFavorite: false,
      colors: ['#FFE4C4', '#ADD8E6', '#4B0082', '#8B4513'],
      productImages: [
        require('@/assets/product1.png'),
        require('@/assets/product2.png'),
        require('@/assets/product3.png'),
        require('@/assets/product4.png')
      ]
    }
  },
  computed: {
    currentImage() {
      return this.productImages[this.currentImageIndex]
    }
  },
  methods: {
    setCurrentImage(index) {
      this.currentImageIndex = index
    },
    selectColor(index) {
      this.selectedColor = index
    },
    toggleFavorite() {
      this.isFavorite = !this.isFavorite
    },
    addToCart() {
      const productToAdd = {
        id: this.productData.id,
        name: this.productData.name,
        price: this.productData.price,
        oldPrice: this.productData.oldPrice,
        status: this.productData.status,
        sellerName: this.productData.seller,
        color: this.colors[this.selectedColor], // Добавляем выбранный цвет
        image: this.currentImage
      }
      this.cartStore.addToCart(productToAdd)
    }
  }
}
</script>

<style lang="scss" scoped>
.product-page {
  max-width: 1200px;
  background: #FAFAFF;
  margin: 0 auto;
  padding: 40px;

  .breadcrumbs {
    margin-bottom: 32px;
    font-size: 14px;
    color: #666;

    a {
      color: #666;
      text-decoration: none;
      
      &:hover {
        color: #e31e24;
      }
    }
  }

  .product-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;

    .product-gallery {
  display: flex;
  gap: 20px;

  .main-image-container {
    width: 416px; // Фиксированная ширина основного изображения
    height: 416px; // Фиксированная высота основного изображения
    
    .main-image {
      width: 100%;
      height: 100%;
      object-fit: cover; // Обеспечивает правильное масштабирование
      border-radius: 12px;
    }
  }

  .thumbnail-gallery {
    width: 113px; // Фиксированная ширина для миниатюр
    display: flex;
    flex-direction: column;
    gap: 16px;

    .thumbnail {
      width: 113px;
      height: 113px;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &.active {
        border: 2px solid #e31e24;
      }
    }
  }
}


.product-info {
  .product-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
    position: relative;

    .product-title {
      font-size: 32px;
      font-weight: 700;
      margin-right: 40px; // Отступ для кнопки
    }

    .favorite-btn {
      position: absolute;
      right: 0;
      top: 0;
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s ease;

      &:hover {
        transform: scale(1.1);
      }

      .like-icon {
        width: 24px;
        opacity: 0.6;
        transition: opacity 0.2s ease;

        &.active {
          opacity: 1;
        }
      }
    }
  } // Добавлено
      .product-title {
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 16px;
      }

      .product-meta {
        margin-bottom: 24px;
        color: #666;
      }

      .color-selection {
        display: flex;
        gap: 12px;
        margin-bottom: 24px;

        .color-option {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.3s ease;

          &.active {
            border-color: #e31e24;
            transform: scale(1.1);
          }

          &:hover {
            transform: scale(1.1);
          }
        }
      }

      .seller-info {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 24px;

        .seller-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
        }

        .seller-name {
          color: #666;
        }
      }

      .product-purchase {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 24px;

        .price {
          font-size: 32px;
          font-weight: 700;
        }

        .add-to-cart-btn {
          width: 50%;
          padding: 16px;
          background: #DC2840;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;

          &:hover {
            background: darken(#e31e24, 10%);
          }
        }
      }

      
    }
  }
}
</style>
