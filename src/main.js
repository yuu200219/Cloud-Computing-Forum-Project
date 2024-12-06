import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Material from '@primevue/themes/material';
import Lara from '@primevue/themes/lara';
import Nora from '@primevue/themes/nora';
import ToastService from 'primevue/toastservice'

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: true,
            cssLayer: false
        }
    },
    ToastService
});
app.mount('#app')