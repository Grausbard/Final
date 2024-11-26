// stores/cartStore.js
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    delivery: 1500,
    discount: 1000
  }),

  getters: {
    cartTotal: (state) => {
        return state.items.reduce((total, item) => {
          return total + (parseInt(item.price) * item.quantity)
        }, 0)
      },
      
      finalTotal: (state) => {
        return state.cartTotal + state.delivery - state.discount
      },
    
    itemCount: (state) => {
      return state.items.length
    }
  },

  actions: {
    addToCart(product) {
      const existingItem = this.items.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({
          ...product,
          quantity: 1,
          selected: true
        })
      }
    },

    removeFromCart(productId) {
      const index = this.items.findIndex(item => item.id === productId)
      if (index > -1) {
        this.items.splice(index, 1)
      }
    },

    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.id === productId)
      if (item) {
        item.quantity = quantity
      }
    },

    toggleSelection(productId) {
      const item = this.items.find(item => item.id === productId)
      if (item) {
        item.selected = !item.selected
      }
    },

    toggleSelectAll(value) {
      this.items.forEach(item => {
        item.selected = value
      })
    },
    toggleFavorite(productId) {
        const index = this.favorites.indexOf(productId)
        if (index === -1) {
          this.favorites.push(productId)
        } else {
          this.favorites.splice(index, 1)
        }
      },
  
      isFavorite(productId) {
        return this.favorites.includes(productId)
      },
    persist: true

  }
})