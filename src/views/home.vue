<script setup>

import HelloWorld from '../components/HelloWorld.vue';
import Menubar from 'primevue/menubar';
import Menu from 'primevue/menu';
import PanelMenu from 'primevue/panelmenu';
import Button from 'primevue/button';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';

import Header from '../components/Header.vue';
import Content from '../components/Content.vue';
import { InputText } from 'primevue';
import { ref } from "vue";


</script>

<template>
  <!-- <div class="top-section d-flex justifiy-content-md-start">
    <Menubar :model="items">
      <template #start>
        <div class="title-img">
          <span class="text-xl font-semibold">NCU<span class="text-primary">Forum</span></span>
        </div>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <InputGroup>
            <InputText placeholder="Search" type="text" class="w-32 sm:w-auto" />
            <InputGroupAddon>
                <Button icon="pi pi-search" severity="secondary" variant="text" @click="toggle" />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </template>
    </Menubar>
    <div class="profile">
      <Button label="Profile" icon="pi pi-user" />
    </div>
  </div> -->
  <Header />
  <Content />
  <!-- <div class="lower-section">
    <div class="forum-tab">
      <Menu :model="forum_items" />
    </div>
    <div class="post-container">
      <Post class="post" />
      <Post class="post" />
    </div>
  </div> -->
  
  <main>
    
  </main>
</template>

<script>
export default {
    name: 'HomePage',
    components: {
      Header,Content
    }
}
</script>

<style scoped>


.pi-search {
  padding: 10px;
}
.title-img {
  padding: 5px 5px 5px 5px;
  align-items: center;
}
</style>
