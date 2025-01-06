import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Material from '@primevue/themes/material';
import Lara from '@primevue/themes/lara';
import Nora from '@primevue/themes/nora';

import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import { createRouter, createWebHistory } from 'vue-router';

import Login from '@/views/login.vue';
import Home from '@/views/home.vue';
import Goblin from '@/forums/goblin.vue';
import School from '@/forums/school.vue';
import Course from '@/forums/course.vue';
import Club from '@/forums/club.vue';
import Gossip from '@/forums/gossip.vue';
import Meme from '@/forums/meme.vue';
import Intern from '@/forums/intern.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', name: 'LoginPage', component: Login},
    {path: '/home', name: 'Homepage', component: Home},
    {path: '/forum/goblin', name: 'GoblinPage', component: Goblin},
    {path: '/forum/school', name: 'SchoolPage', component: School},
    {path: '/forum/course', name: 'CoursePage', component: Course},
    {path: '/forum/club', name: 'ClubPage', component: Club},
    {path: '/forum/gossip', name: 'GossipPage', component: Gossip},
    {path: '/forum/meme', name: 'MemePage', component: Meme},
    {path: '/forum/intern', name: 'InternPage', component: Intern},
]   
});

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'false',
            cssLayer: false
        }
    }
});
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.mount('#app');