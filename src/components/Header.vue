<script setup>
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';


import { InputText } from 'primevue';
import { ref } from "vue";

// const items = ref([
//     {
//         label: 'Home',
//         icon: 'pi pi-home',
//     },
//     {
//         label: 'Notification',
//         icon: 'pi pi-bell',
//     },
//     {
//         label: 'Message',
//         icon: 'pi pi-send'
//     },
// ]);
</script>

<template>
    <div class="top-section d-flex justifiy-content-md-start">
        <Menubar :model="items" class="menu-bar">
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
    </div>
</template>

<style scoped>

.top-section {
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  gap: 10px;
  top: 10px;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  z-index: 1000;
}

.menu-bar {
    flex: 95%;
}

.profile {
    flex: 5%;
}

</style>