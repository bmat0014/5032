<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { isAuthenticated } from '@/auth.js'

const router = useRouter()

const sampleUser = {
  username: 'user',
  password: 'User123!'
}

const loginData = ref({
  username: '',
  password: ''
})

const errors = ref({
  username: null,
  password: null,
  login: null
})

const validateUsername = (blur) => {
  if (loginData.value.username.length < 1) {
    if (blur) errors.value.username = 'Please enter a username'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  if (loginData.value.password.length < 1) {
    if (blur) errors.value.password = 'Please enter a password'
  } else {
    errors.value.password = null
  }
}

const handleLogin = () => {
  validateUsername(true)
  validatePassword(true)

  errors.value.login = null

  if (!errors.value.username && !errors.value.password) {
    if (
      loginData.value.username === sampleUser.username &&
      loginData.value.password === sampleUser.password
    ) {
      console.log('Login successful!')
      isAuthenticated.value = true
      router.push('/home')
    } else {
      errors.value.login = 'Invalid username or password.'
    }
  }
}

const clearForm = () => {
  loginData.value = {
    username: '',
    password: ''
  }
  errors.value = {
    username: null,
    password: null,
    login: null
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center mb-0">Login</h2>
        <div class="card-body">
          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                v-model="loginData.username"
                @blur="() => validateUsername(true)"
                @input="() => validateUsername(false)"
                placeholder="Enter your username"
              />
              <div v-if="errors.username" class="text-danger mt-1">
                {{ errors.username }}
              </div>
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="loginData.password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                placeholder="Enter your password"
              />
              <div v-if="errors.password" class="text-danger mt-1">
                {{ errors.password }}
              </div>
            </div>

            <!-- Show login error if credentials are wrong -->
            <div v-if="errors.login" class="text-danger mb-3">
              {{ errors.login }}
            </div>

            <div class="grid gap-2 d-md-flex justify-content-md-end">
              <button type="button" class="btn btn-outline-secondary" @click="clearForm">
                Clear
              </button>
              <button type="submit" class="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
