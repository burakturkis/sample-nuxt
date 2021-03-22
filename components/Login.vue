<template>
  <b-modal
    id="loginModal"
    centered
    hide-footer
    :visible="visible"
    @change="handleCloseModal"
  >
    <template #modal-title>
      <b-row align-h="between" align-v="center">
        <b-col cols="5">{{ $t('login.title') }}</b-col>
        <b-col class="text-right"
          ><LangSwitcher :show-active="true" size="sm"
        /></b-col>
      </b-row>
    </template>

    <b-form @submit.stop.prevent="onSubmit">
      <b-form-group :label="$t('global.name')" label-for="login-txtName">
        <b-form-input
          id="login-txtName"
          v-model="$v.form.name.$model"
          :state="validateState('name')"
          :placeholder="$t('global.placeholder.name')"
          :disabled="isDisabled"
          aria-describedby="login-txtName-feedback"
        ></b-form-input>
        <b-form-invalid-feedback id="login-txtName-feedback">{{
          $t('global.error.name')
        }}</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group :label="$t('global.email')" label-for="login-txtEmail">
        <b-form-input
          id="login-txtEmail"
          v-model="$v.form.email.$model"
          :state="validateState('email')"
          :placeholder="$t('global.placeholder.email')"
          :disabled="isDisabled"
          aria-describedby="login-txtEmail-feedback"
        ></b-form-input>
        <b-form-invalid-feedback id="login-txtEmail-feedback">{{
          $t('global.error.email')
        }}</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        :label="$t('global.password')"
        label-for="login-txtPassword"
      >
        <b-form-input
          id="login-txtPassword"
          v-model="$v.form.password.$model"
          type="password"
          :state="validateState('password')"
          :placeholder="$t('global.placeholder.password')"
          :disabled="isDisabled"
          aria-describedby="login-txtPassword-feedback"
        ></b-form-input>
        <b-form-invalid-feedback id="login-txtPassword-feedback">{{
          $t('global.error.password')
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
    </b-form>
  </b-modal>
</template>
<script>
import { mapMutations } from 'vuex'

import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  mixins: [validationMixin],

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        name: null,
        email: null,
        password: null,
      },
      isDisabled: false,
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
      password: {
        required,
        minLength: minLength(8),
      },
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
    resetForm(type = 'all') {
      if (type === 'all') {
        this.form = {
          name: null,
          email: null,
          password: null,
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
      this.resetForm('validation')
      this.isDisabled = true

      this.setUser(this.form)
      setTimeout(() => {
        this.handleCloseModal()
        // Push message
        this.$bvToast.toast(this.$t('login.toastMessage'), {
          title: this.$t('global.success'),
          variant: 'success',
          solid: true,
        })
        this.isDisabled = false
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
