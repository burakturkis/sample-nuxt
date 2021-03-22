<template>
  <div>
    <template v-if="!showActive">
      <b-dropdown-item
        v-for="lang in languageList"
        :key="lang.code"
        @click="handleLanguage(lang.code)"
        >{{ lang.name }}</b-dropdown-item
      >
    </template>
    <template v-else>
      <b-dropdown :text="activeLanguage" class="m-md-2" :size="size">
        <b-dropdown-item
          v-for="lang in languageList"
          :key="lang.code"
          :size="size"
          @click="handleLanguage(lang.code)"
          >{{ lang.name }}</b-dropdown-item
        >
      </b-dropdown>
    </template>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
  name: 'LangSwitcher',
  props: {
    size: {
      type: String,
      default: '',
    },
    showActive: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    languageList() {
      return this.$i18n.locales.filter((x) => x.code !== this.$i18n.locale)
    },
    activeLanguage() {
      return this.$i18n.locales.find((x) => x.code === this.$i18n.locale).name
    },
  },
  methods: {
    ...mapMutations(['setLocale']),
    handleLanguage(code) {
      this.$i18n.setLocale(code)
      this.setLocale(code)
    },
  },
}
</script>
<style lang="scss">
.dropdown-item[size='sm'] {
  padding-top: 0;
  padding-bottom: 0;
  font-size: 0.85rem;
}
</style>
