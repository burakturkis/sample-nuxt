<template>
  <div class="w-100">
    <b-card
      class="w-100"
      :title="$t('contact.card.title')"
      :sub-title="$t('contact.card.description')"
    >
      <b-form id="contactForm" @submit.stop.prevent="onSubmit">
        <b-form-group :label="$t('global.name')" label-for="contact-txtName">
          <b-form-input
            id="contact-txtName"
            v-model="$v.form.name.$model"
            :state="validateState('name')"
            :placeholder="$t('global.placeholder.name')"
            :disabled="isDisabled"
            aria-describedby="contact-txtName-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="contact-txtName-feedback">{{
            $t('global.error.name')
          }}</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group :label="$t('global.email')" label-for="contact-txtEmail">
          <b-form-input
            id="contact-txtEmail"
            v-model="$v.form.email.$model"
            :state="validateState('email')"
            :placeholder="$t('global.placeholder.email')"
            :disabled="isDisabled"
            aria-describedby="contact-txtEmail-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="contact-txtEmail-feedback">{{
            $t('global.error.email')
          }}</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group :label="$t('global.phone')" label-for="contact-txtPhone">
          <b-form-input
            id="contact-txtPhone"
            v-model="$v.form.phone.$model"
            type="tel"
            :state="validateState('phone')"
            :placeholder="$t('global.placeholder.phone')"
            :disabled="isDisabled"
            aria-describedby="contact-txtPhone-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="contact-txtPhone-feedback">{{
            $t('global.error.phone')
          }}</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          :label="$t('global.country')"
          label-for="contact-txtPhone"
        >
          <b-form-input
            v-model="$v.form.country.$model"
            list="countryList"
            :placeholder="$t('global.placeholder.country')"
            :disabled="isDisabled"
            :state="validateState('country')"
            aria-describedby="contact-txtCountry-feedback"
            @change="checkCountry"
          ></b-form-input>
          <b-form-datalist
            id="countryList"
            :options="countries"
          ></b-form-datalist>
          <b-form-invalid-feedback id="contact-txtCountry-feedback">{{
            $t('global.error.country')
          }}</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          :label="$t('global.message')"
          label-for="contact-txtMessage"
        >
          <b-form-textarea
            v-model="$v.form.message.$model"
            list="countryList"
            :placeholder="`${$t('global.message')}...`"
            :disabled="isDisabled"
            :state="validateState('message')"
            aria-describedby="contact-txtMessage-feedback"
            rows="4"
            max-rows="7"
          ></b-form-textarea>
          <b-form-invalid-feedback id="contact-txtMessage-feedback">{{
            $t('global.error.message')
          }}</b-form-invalid-feedback>
        </b-form-group>
        <div class="text-right">
          <b-button
            type="submit"
            variant="outline-success"
            :disabled="isDisabled"
          >
            <b-spinner v-if="isDisabled" small type="grow"></b-spinner>
            {{ $t('global.submit') }}</b-button
          >
        </div>
      </b-form></b-card
    >
  </div>
</template>
<script>
import { mapMutations } from 'vuex'

import { validationMixin } from 'vuelidate'
import { required, minLength, email, numeric } from 'vuelidate/lib/validators'

export default {
  name: 'Contact',
  mixins: [validationMixin],

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      countries: [
        { text: 'US', value: 'United States of America' },
        { text: 'GB', value: 'United Kingdom' },
        { text: 'TR', value: 'Turkey' },
        { text: 'DE', value: 'Germany' },
        { text: 'SE', value: 'Sweden' },
        { text: 'KE', value: 'Kenya' },
        { text: 'BR', value: 'Brazil' },
        { text: 'ZW', value: 'Zimbabwe' },
      ],
      form: {
        name: null,
        email: null,
        phone: null,
        country: null,
        message: null,
      },
      countryObject: null,
      isDisabled: false,
      result: null,
    }
  },
  head() {
    return {
      title: this.$t('header.menu.contactUs'),
    }
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
      },
      email: {
        required,
        email,
      },
      phone: {
        required,
        numeric,
        minLength: minLength(8),
      },
      country: {
        required,
      },
      message: {},
    },
  },
  methods: {
    ...mapMutations(['setUser']),
    handleCloseModal() {
      this.resetForm()
      this.$emit('close', false)
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name]
      return $dirty ? !$error : null
    },
    checkCountry() {
      const mapped = this.countries.map((x) => x.value)
      const isMatch = mapped.includes(this.form.country)
      if (!isMatch) {
        this.form.country = null
        return
      }
      this.countryObject = this.getCountryValue(this.form.country)
    },
    getCountryValue(name) {
      return this.countries.find((x) => x.value === name)
    },
    resetForm(type = 'all') {
      if (type === 'all') {
        this.form = {
          name: null,
          email: null,
          phone: null,
          country: null,
          message: null,
        }
      }

      this.$nextTick(() => {
        this.$v.$reset()
      })
    },
    onSubmit() {
      this.$v.form.$touch()
      if (this.$v.form.$anyError) {
        return
      }
      this.isDisabled = true

      // Set up send model..
      const modelpool = {
        name: this.form.name,
        email: this.form.email,
        phonenumber: this.form.phone,
        country_code: this.countryObject.text,
        text: this.form.message,
      }

      // Send modelpool
      setTimeout(() => {
        console.log('form is => ', modelpool) // eslint-disable-line
        this.isDisabled = false
        this.$bvToast.toast(this.$t('contact.toastMessage'), {
          title: this.$t('global.success'),
          variant: 'success',
          solid: true,
        })
      }, 500)
    },
  },
}
</script>
<style lang="scss">
#loginModal {
  .modal-header {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }
  .modal-title {
    width: 100%;
  }
}
</style>
