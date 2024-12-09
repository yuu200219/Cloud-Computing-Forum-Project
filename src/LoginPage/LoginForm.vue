<script>
  import InputText from 'primevue/inputtext';
  import Password from 'primevue/password';
  import Button from 'primevue/button';
  import InputGroup from 'primevue/inputgroup';
  import InputGroupAddon from 'primevue/inputgroupaddon';

  export default {
    data() {
      return {
        loginForm: {
          username: '',
          password: '',
          token: '' // Optional, depending on your authentication method
        },
        errorMessage: ''
      };
    },
    components: {
      InputText,
      Password,
      Button,
      InputGroup,
      InputGroupAddon
    },
    methods: {
      handleLogin() {
        // Simple validation
        if (!this.loginForm.username && !this.loginForm.password) {
          this.errorMessage = 'Username and password are required.';
          return;
        }
        else if(!this.loginForm.username) {
          this.errorMessage = 'Username is required.';
          return;
        }
        else if(!this.loginForm.password) {
          this.errorMessage = 'Password is required.';
        }
        else {
          this.errorMessage = '';
        }
  
        // Placeholder for API login logic
        console.log('Login submitted:', this.loginForm);
      }
    }
  };
</script>

<template>
    <div>
      <h2>登入</h2>
      <br>
      <form @submit.prevent="handleLogin" class="flex flex-column row-gap-2">
        <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-user"></i>
            </InputGroupAddon>
            <InputText v-model="loginForm.username" placeholder="使用者" />
        </InputGroup>
        <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-lock"></i>
            </InputGroupAddon>
            <InputText v-model="loginForm.password" type="password" placeholder="密碼" />
        </InputGroup>
        <Button label="登入" icon="pi pi-sign-in" type="submit" />
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
</template>
  
<style scoped>
  h2 {
    text-align: center;
    color: white;
  }
  .error {
    color: red;
    font-size: 0.9em;
  }
</style>
  