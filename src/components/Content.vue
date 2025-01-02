<script setup>
import Menu from 'primevue/menu';
import Post from './Post.vue';

import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

import Dialog from 'primevue/dialog';
import FileUpload from 'primevue/fileupload';
import Textarea from 'primevue/textarea';

import Button from 'primevue/button';
import Image from 'primevue/image';

import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const fileupload = ref();
const router = useRouter();
const visible = ref(false);

const forum_items = ref([
    {
        label: 'Forums',
        items: [
        {
            label: '社團版',
            command: () => {
                router.push('/forum/club')
            }
        },
        {
            label: '學校事務版',
            command: () => {
                router.push('/forum/school')
            }
        },
        {
            label: '課程版',
            command: () => {
                router.push('/forum/course')
            }
        },
        {
            label: '八卦版',
            command: () => {
                router.push('/forum/gossip')
            }
        },
        {
            label: '迷因版',
            command: () => {
                router.push('/forum/meme')
            }
        },
        {
            label: '哥布林版',
            command: () => {
                router.push('/forum/goblin')
            }
        },
        {
            label: '實習版',
            command: () => {
                router.push('/forum/intern')
            }
        }
        ]
    },
]);

const upload = () => {
    fileupload.value.upload();
};

const onUpload = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000})
};

</script>

<template>
<div class="lower-section">
    <div class="forum-tab">
        <Menu :model="forum_items">
            <template #item="{ item, props, hasSubmenu}">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                        <!-- <span :class="item.icon" /> -->
                        <span class="ml-2">{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                    <span v-if="hasSubmenu" class="pi pi-angle-right ml-auto" />
                </a>
            </template>
        </Menu>
        <Button label="Post" icon="pi pi-pen-to-square" rounded class="post-icon" @click="visible = true"/>
        <Dialog v-model:visible="visible" modal header="新貼文" >
            <!-- <div class="card"> -->
                <Toast />
                <FileUpload name="demo[]" url="/api/upload" @upload="onUpload($event)" :multiple="true" accept="image/*" :maxFileSize="1000000">
                    <template #empty>
                        <span>拖移圖片或是使用"Choose"選擇上傳圖片"</span>
                    </template>
                </FileUpload>
            <!-- </div> -->
            <Textarea v-model="blogContent" rows="10" cols="50" placeholder="什麼新鮮事？"/>
            <template #footer>
                <Button label="Upload" icon="pi pi-upload" @click="saveBlog" />
                <Button label="Cancel" icon="pi pi-times" @click="visible = false" />
            </template>
        </Dialog>
    </div>
    
    <div class="content">
            <Tabs value="0" class="tab">
                <div class="tab-list-container">
                    <TabList>
                        <Tab value="0" class="tab-list" icon="">熱門</Tab>
                        <Tab value="1"class="tab-list">最新</Tab>
                    </TabList>
                </div>
                <TabPanels>
                <TabPanel value="0">
                    <div class="post-container">
                        <Image src="/src/assets/img/00.jpg" alt="Image" width="50%" />
                        <Post class="post" />
                        <Post class="post" />
                        <Image src="/src/assets/img/00.jpg" alt="Image" width="50%" />
                        <Post class="post" />
                        <Post class="post" />
                        <Post class="post" />
                        <Post class="post" />
                    </div>
                </TabPanel>
                <TabPanel value="1">
                    <div class="post-container">
                        <Image src="/src/assets/img/00.jpg" alt="Image" width="50%" />
                        <Post class="post" />
                        
                    </div>
                </TabPanel>
            </TabPanels>
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
  position: fixed;
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
    top: 85px;
    flex: 20%;
    max-width: 250px;
    min-width: 200px;
    left: 10px;
    /* border-style: solid;
    border-color:rgb(223, 223, 223);
    border-width: 0.1rcap; */
    border-radius: 3rem;
}
.content {
    position: fixed;
    flex: 80%;
    display: flex;
    flex-direction: column;
    top: 85px;
    border-style: solid;
    border-color:rgb(223, 223, 223);
    border-width: 0.1rcap;
    border-radius: 2rem;
    overflow: scroll;
    margin-bottom: 10px;
    height: 85%;
    margin: 0 10% 0 10%;
    min-width: 350px;
    max-width: 900px;
}
.tab-list-container {
    position: sticky;
    top: 0px;
    z-index: 10;
}
.post-container {
  /* flex: 80%; */
  /* padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  justify-content: center; */
  /* height: 100vh; */
  flex: 90% !important; /* Takes remaining space below the tabs */
  overflow: scroll !important; /* Enables scrolling within the post container */
  padding: 20px !important; /* Optional: adds spacing around the posts */
  height: 100% !important;
  align-items: center !important;
  justify-content: center !important;
}
.post-icon {
    margin-top: 10px;
}
/* .tab {
    position: sticky;
    top: 90px;
} */
.tab-list {
    align-items: center;
    justify-content: center;
    width: 50%;
    
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