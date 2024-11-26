<template>
    <article class="product-card" role="article">
      <img
        :src="product.image"
        :alt="product.name"
        class="product-image"
        loading="lazy"
      />
      <div class="product-info">
        <h3 class="product-title">
          <a :href="`/product/${product.id}`" :aria-label="`${product.name} - подробнее`">
            {{ product.name }}
          </a>
        </h3>
        <p
          class="availability-status"
          :class="{
            'status-in-stock': product.status === 'in-stock',
            'status-preorder': product.status === 'preorder',
          }"
        >
          {{ product.status === 'in-stock' ? 'В наличии' : 'Предзаказ' }}
        </p>
        <div class="price-block">
          <div>
            <span class="price" :class="{ 'discounted-price': product.discount }">
              {{ formatPrice(product.price) }} ₸
            </span>
            <span
              v-if="product.discount"
              class="old-price"
            >
              {{ formatPrice(product.oldPrice) }} ₸
            </span>
          </div>
          <button
  class="add-to-cart"
  :class="{ active: product.inCart }"
  @click="toggleCart"
  aria-label="Добавить в корзину"
>
  <!-- Ваш SVG или иконка корзины -->
</button>

        </div>
        <div class="seller-info">
          <img :src="product.sellerImage" alt="Seller" class="seller-icon" />
          <span>{{ product.sellerName }}</span>
        </div>
      </div>
    </article>
  </template>
  
  <script>
  export default {
    name: 'ProductCard',
    props: {
      product: Object,
    },
    methods: {
      formatPrice(value) {
        return new Intl.NumberFormat('ru-RU').format(value);
      },
      toggleCart() {
        // Эмитируем событие 'toggle-cart' с продуктом
        this.$emit('toggle-cart', this.product);
      },
    },
  };
  </script>
  
  
  <style scoped>
  /* Вставьте здесь стили из спецификации */
  </style>
  