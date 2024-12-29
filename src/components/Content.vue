<script setup>
import Menu from 'primevue/menu';
import Post from './Post.vue';

import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

import Button from 'primevue/button';

import { ref } from 'vue';
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
const forum_items = ref([
    {
        label: 'Forums',
        items: [
        {
            label: '社團版'
        },
        {
            label: '學校事務版'
        },
        {
            label: '選課版'
        },
        {
            label: '八卦版'
        },
        {
            label: '迷因版'
        },
        {
            label: '遊戲版'
        },
        {
            label: '實習版'
        }
        ]
    },
]);
</script>

<template>
<div class="lower-section">
    <div class="forum-tab">
        <Menu :model="forum_items" />
        <div class="post-icon">
            <Button label="Post" icon="pi pi-pen-to-square" rounded aria-label="filter"/>
        </div>
    </div>
    
    <div class="content">
        <Tabs value="0" class="tab">
            <TabList>
                <Tab value="0">熱門</Tab>
                <Tab value="1">追蹤</Tab>
                <Tab value="2">推薦</Tab>
            </TabList>
            <div class="post-container">
                <Post class="post" />
                <Post class="post" />
            </div>
            
        </Tabs>
    </div>
    
</div>

</template>

<style scoped>
.lower-section {
  /* display: flex;
  flex-direction: row;
  position: absolute;
  top: 85px; */

  display: flex;
  flex-direction: row;
  position: absolute;
  /* align-items: center; */
  justify-content: center;
  width: 100%;
  top: 85px;
  padding-right: 10px;
  padding-left: 10px;
  /* left: 10px; */
}
.forum-tab {
  position: fixed;
  flex: 10%;
  max-width: 250px;
  left: 10px;
}
.post-container {
  /* flex: 80%; */
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  justify-content: center;
  /* height: 100vh; */
}
.post-icon {
    padding-top: 10px;
}
.tab {
    /* align-items: center;
    justify-self: center; */ 
}
/* @media(max-width: 1000) {
    .post-container {
        position: static;
        align-items: center;
        justify-self: center;
        width: 100%;
        
    }
} */
</style>