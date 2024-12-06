<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import Button from 'primevue/button';
import LoginForm from './components/LoginForm.vue';
</script>

<template>
  <header>
    <img alt="ncu logo" class="logo" src="./assets/ncu.png" width="130" height="130" />

    <div class="wrapper">
      <HelloWorld msg="NCU Forum" />
      <br>
    </div>
  </header>
  <main>
    <div class="login"> 
        <LoginForm />
    </div>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 1em;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
.login {
  margin: auto;
  width: 60%;
  padding: 10px;
  align-items: center;
}
</style>
