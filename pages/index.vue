<template>
  <div class="w-100">
    <b-card :title="$t('homepage.card.title')" class="w-100">
      <b-card-text> {{ $t('homepage.card.description') }} </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  head() {
    return {
      title: this.$t('header.menu.homepage'),
    }
  },
}
</script>

<style></style>
