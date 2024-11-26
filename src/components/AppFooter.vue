<template>
  <footer class="footer">
    <div class="footer-content">
      <!-- Левая колонка с логотипом и соц. сетями -->
      <div class="footer-left">
        <div class="footer-logo">
          <img src="@/assets/logo.png" alt="ДариДобро" class="logo-img" />
          <span class="logo-text">ДариДобро</span>
        </div>
        <div class="social-links">
          <a href="#" class="social-link" aria-label="Facebook">
            <div class="social-icon facebook"></div>
          </a>
          <a href="#" class="social-link" aria-label="Twitter">
            <div class="social-icon twitter"></div>
          </a>
          <a href="#" class="social-link" aria-label="Instagram">
            <div class="social-icon instagram"></div>
          </a>
          <a href="#" class="social-link" aria-label="YouTube">
            <div class="social-icon youtube"></div>
          </a>
        </div>
      </div>

      <!-- Правая колонка с навигацией -->
      <nav class="footer-nav">
        <ul class="nav-list">
          <li class="nav-item">
            <a href="#" class="nav-link">Стать партнером</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">Доставка</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">О проекте</a>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style lang="scss" scoped>
.footer {
  background: #fff;
  padding: 40px 0;
  border-top: 1px solid #e6e6e6;
  position: relative; // Изменено с fixed на relative
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 10;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .footer-left {
    .footer-logo {
      display: flex;
      align-items: center;
      margin-bottom: 24px;

      .logo-img {
        height: 32px;
        width: auto;
      }

      .logo-text {
        font-size: 24px;
        font-weight: 700;
        margin-left: 12px;
        color: #000;
      }
    }

    .social-links {
      display: flex;
      gap: 16px;

      .social-link {
        text-decoration: none;
        
        .social-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #f5f5f5;
          transition: background-color 0.3s ease;

          &:hover {
            background: #e6e6e6;
          }

          &.facebook,
          &.twitter,
          &.instagram,
          &.youtube {
            background-color: #f5f5f5;
          }
        }
      }
    }
  }

  .footer-nav {
    .nav-list {
      list-style: none;
      padding: 0;
      margin: 0;

      .nav-item {
        margin-bottom: 16px;

        &:last-child {
          margin-bottom: 0;
        }

        .nav-link {
          text-decoration: none;
          color: #333;
          font-size: 16px;
          transition: color 0.3s ease;

          &:hover {
            color: #e31e24;
          }
        }
      }
    }
  }
}

// Медиа-запросы для адаптивности
@media (max-width: 768px) {
  .footer {
    .footer-content {
      flex-direction: column;
      gap: 32px;
      padding: 0 20px;
    }

    .footer-nav {
      width: 100%;

      .nav-list {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }

    .footer-left {
      width: 100%;
      
      .footer-logo {
        justify-content: center;
      }

      .social-links {
        justify-content: center;
      }
    }
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 24px 0;

    .footer-logo {
      .logo-text {
        font-size: 20px;
      }
    }

    .social-links {
      .social-link {
        .social-icon {
          width: 32px;
          height: 32px;
        }
      }
    }
  }
}
</style>
