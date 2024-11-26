<!-- components/ProductFooter.vue -->
<template>
  <footer class="product-footer">
    <div class="footer-content">
      <div class="footer-columns">
        <div class="footer-column">
          <router-link to="/" class="footer-link">Стать партнером</router-link>
          <router-link to="/" class="footer-link">Продукция</router-link>
          <router-link to="/" class="footer-link">О проекте</router-link>
        </div>
        <div class="footer-column">
          <router-link to="/" class="footer-link">Стать партнером</router-link>
          <router-link to="/" class="footer-link">Продукция</router-link>
          <router-link to="/" class="footer-link">О проекте</router-link>
        </div>
        <div class="footer-column">
          <router-link to="/" class="footer-link">Стать партнером</router-link>
          <router-link to="/" class="footer-link">Продукция</router-link>
          <router-link to="/" class="footer-link">О проекте</router-link>
        </div>
      </div>

      <div class="footer-brand">
        <router-link to="/" class="brand-logo">
          <img src="@/assets/logo.png" alt="ДариДобро" class="logo-img" />
          <span class="logo-text">ДариДобро</span>
        </router-link>
        <div class="social-links">
          <a href="#" class="social-link">
            <img src="@/assets/facebook-icon.png" alt="Facebook" />
          </a>
          <a href="#" class="social-link">
            <img src="@/assets/twitter-icon.png" alt="Twitter" />
          </a>
          <a href="#" class="social-link">
            <img src="@/assets/instagram-icon.png" alt="Instagram" />
          </a>
          <a href="#" class="social-link">
            <img src="@/assets/youtube-icon.png" alt="YouTube" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

  
  <script>
  export default {
    name: 'ProductFooter'
  }
  </script>
  
  <style lang="scss" scoped>
  .product-footer {
    background: #fff;
    padding: 40px 0;
    border-top: 1px solid #e6e6e6;
  
    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 40px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
  
    .footer-columns {
      display: flex;
      gap: 80px;
  
      .footer-column {
        display: flex;
        flex-direction: column;
        gap: 16px;
  
        .footer-link {
          color: #333;
          text-decoration: none;
          font-size: 16px;
          transition: color 0.3s ease;
  
          &:hover {
            color: #e31e24;
          }
        }
      }
    }
  
    .footer-brand {
      text-align: right;
      text-decoration: none;
  
      .brand-logo {
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-bottom: 24px;
  
        .logo-img {
          height: 32px;
          width: auto;
        }
  
        .logo-text {

          font-family: Montserrat;
font-size: 21.08px;
font-weight: 700;
line-height: 25.69px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;
color: black;
        }
      }
  
      .social-links {
        display: flex;
        gap: 16px;
        justify-content: flex-end;
  
        .social-link {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.3s ease;
  
          img {
            width: 20px;
            height: 20px;
          }
  
          &:hover {
            background: #e6e6e6;
          }
        }
      }
    }
  }
  
  @media (max-width: 768px) {
    .product-footer {
      .footer-content {
        flex-direction: column-reverse;
        gap: 40px;
      }
  
      .footer-columns {
        flex-direction: column;
        gap: 32px;
        align-items: center;
        text-align: center;
      }
  
      .footer-brand {
        text-align: center;
  
        .brand-logo {
          justify-content: center;
        }
  
        .social-links {
          justify-content: center;
        }
      }
    }
  }
  </style>
  