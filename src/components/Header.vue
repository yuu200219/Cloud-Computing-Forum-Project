<script setup>
import Menubar from 'primevue/menubar';
import Toolbar from 'primevue/toolbar';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';


import { InputText } from 'primevue';
import { ref } from "vue";
</script>

<template>
    <div class="top-section d-flex justifiy-content-md-start">
        <!-- <Menubar :model="items" class="menu-bar">
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
        </Menubar> -->
        <Toolbar class="menu-bar">
            <template #start>
                <div class="title-img">
                    <span class="text-xl font-semibold">
                        NCU<span class="text-primary">Forum</span>
                         /  {{ currentSubdirectory }}
                    </span>
                </div>
                
            </template>
            
            <div class="flex items-center gap-2">
                <InputGroup>
                    <InputText placeholder="Search" type="text" class="w-32 sm:w-auto" />
                    <InputGroupAddon>
                        <Button icon="pi pi-search" severity="secondary" variant="text" @click="toggle" />
                    </InputGroupAddon>
                </InputGroup>
            </div>
            
            <template #end>
                <!-- <Button label="Post" icon="pi pi-pen-to-square" text plain rounded class="post-icon"/> -->
                <Button label="Notification" icon="pi pi-bell" text plain rounded/>
                <Button label="Settings" icon="pi pi-cog" text plain rounded/>
                <Avatar label="Y" shape="circle" style="background-color: #ece9fc; color: #2a1261"/>
            </template>

        </Toolbar>
        <!-- <div class="profile">
            <Button label="Profile" icon="pi pi-user" />
        </div> -->
    </div>
</template>

<script>
export default {
  computed: {
    CapitalizeFirstLetter() {
        return (str) => {
        if (str.length === 0) return str; // Check for empty string
        return str.charAt(0).toUpperCase() + str.slice(1);
      };
    },
    currentSubdirectory() {
      const path = this.$route.path; // Get the current path
      const segments = path.split('/').filter(Boolean); // Split by '/' and remove empty segments
      return this.CapitalizeFirstLetter(segments[segments.length-1]) || ''; // Return the first segment or an empty string
    }
  }
};
</script>

<style scoped>
.title-img {
    padding-right: 10px;
}
.top-section {
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  top: 0px;
  width: 100%;
  z-index: 1000;
}

.menu-bar {
    flex: 95%;
}

.profile {
    flex: 5%;
}


</style>