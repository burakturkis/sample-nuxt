<template>
  <b-container fluid class="px-0 mainContainer">
    <Login :visible="visible.login" @close="(x) => (visible.login = x)" />
    <header>
      <b-navbar toggleable="lg" type="light">
        <b-navbar-brand href="#">{{ $t('logo') }}</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <template v-for="(menuItem, menuIndex) in menuItems">
              <template v-if="menuItem.active">
                <template
                  v-if="
                    menuItem.value !== 'language' &&
                    menuItem.value !== 'login' &&
                    menuItem.value !== 'user'
                  "
                >
                  <b-nav-item :key="menuIndex" :to="menuItem.path">
                    {{ $t(`header.menu.${menuItem.value}`) }}
                  </b-nav-item>
                </template>
                <template v-else-if="menuItem.value === 'language'">
                  <b-nav-item-dropdown
                    :key="menuItem.value"
                    :text="activeLanguage"
                    right
                  >
                    <LangSwitcher />
                  </b-nav-item-dropdown>
                </template>
                <template v-else-if="menuItem.value === 'login'">
                  <b-nav-item :key="menuIndex" @click="visible.login = true">
                    {{ $t(`header.menu.${menuItem.value}`) }}
                  </b-nav-item>
                </template>
                <template v-else-if="menuItem.value === 'user'">
                  <b-nav-item-dropdown
                    :key="menuIndex"
                    :text="getUser.name"
                    right
                  >
                    <b-dropdown-item>{{ getUser.email }}</b-dropdown-item>
                    <b-dropdown-item @click="logout">{{
                      $t('header.menu.logout')
                    }}</b-dropdown-item>
                  </b-nav-item-dropdown>
                </template>
              </template>
            </template>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </header>
    <div class="content">
      <Nuxt />
    </div>
    <footer class="text-center">
      <small
        >&copy; Brand {{ new Date().getFullYear() }} -
        {{ $i18n.locale.toUpperCase() }}</small
      >
    </footer>
  </b-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'MainLayout',
  data() {
    return {
      visible: {
        login: false,
      },
      menuItems: [
        {
          value: 'homepage',
          path: '/',
          active: true,
        },
        {
          value: 'contactUs',
          path: '/contact',
          active: true,
        },
        {
          value: 'language',
          path: '',
          active: true,
        },
        {
          value: 'login',
          path: '',
          active: true,
        },
        {
          value: 'user',
          path: '',
          active: false,
        },
      ],
    }
  },
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
    }
  },
  computed: {
    ...mapGetters(['getUser']),
    activeLanguage() {
      return this.$i18n.locales.find((x) => x.code === this.$i18n.locale).name
    },
  },
  watch: {
    getUser() {
      this.checkUser()
    },
  },
  methods: {
    ...mapActions(['logout']),
    checkUser() {
      this.menuItems.map((x) => {
        if (x.value === 'user' || x.value === 'login') {
          x.active = !x.active
        }
        return x
      })
    },
  },
}
</script>
<style lang="scss">
html,
body {
  color: $primary;
}
.mainContainer {
  display: flex;
  flex-direction: column;
  height: 100vh;
  header {
    background-color: $gray-1;
    flex-grow: 0;
    .nav-item {
      transition: $globalTransition;
      border-radius: 6px;
      margin-right: 6px;

      &.loggedUser {
        ul {
          li {
            padding-left: 1rem;
          }
        }
      }
    }
  }
  .content {
    margin: 0 auto;
    width: 100%;
    display: flex;
    padding: 1rem;
    flex-grow: 1;
    flex-shrink: 0;
  }
  footer {
    padding: 0.25rem 1rem;
    background-color: $gray-1;
    flex-grow: 0;
  }
}
</style>
