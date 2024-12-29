

<template>
  
    <main class="app">
      <!-- <div class="content-wrapper"> -->
       <router-view class="content"></router-view>
        <!-- <LoginPage /> -->
      <!-- </div> -->
    </main>
  
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
.app {
  display: flex;          /* Enables Flexbox */
  justify-content: center; /* Horizontally centers content */
  align-items: center;    /* Vertically centers content */
  height: 100%;          /* Full viewport height */
  width: 100%;
  margin: 0;              /* Reset default margins */
}
</style>
