<script setup>
import Menubar from 'primevue/menubar';
import Toolbar from 'primevue/toolbar';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import ChillGuyImage from "@/assets/img/chillguy.jpg";

import { InputText } from 'primevue';
import { ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();
const items_start = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
            router.push('/home')
        },
    },
    // {
    //     label: 'Notification',
    //     icon: 'pi pi-bell',
    // },
    // {
    //     label: 'Settings',
    //     icon: 'pi pi-cog',
    //     items: [
    //         {
    //             label: 'Profile',
    //             icon: 'pi pi-user'
    //         },
    //         {
    //             label: 'Logout',
    //             icon: 'pi pi-sign-out',
    //             command: () => {
    //                 router.push('/')
    //             }
    //         }
    //     ]
    // }
])
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
        <Menubar class="menu-bar" :model="items_start">
            <template #start>
                <div class="title-img">
                    <span class="text-xl font-semibold">
                        NCU<span class="text-primary">Forum</span>
                        / {{ currentSubdirectory }}
                    </span>
                </div>
            </template>
            <template #item="{ item, props, hasSubmenu }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                        <span :class="item.icon" />
                        <span>{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                    <span :class="item.icon" />
                    <span>{{ item.label }}</span>
                    <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
                </a>
            </template>


            <template #end>
                <div class="flex items-center gap-2">
                    <InputGroup>
                        <InputText placeholder="Search" type="text" class="w-32 sm:w-auto" />
                        <InputGroupAddon>
                            <Button icon="pi pi-search" severity="secondary" variant="text" @click="toggleSearch" />
                        </InputGroupAddon>
                    </InputGroup>
                    <Button label="Logout" icon="pi pi-sign-out" text plain @click="toggleLogout" />
                    <img :src=ChillGuyImage alt="User Avatar" class="avatar" />
                </div>

            </template>

        </Menubar>
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
            return this.CapitalizeFirstLetter(segments[segments.length - 1]) || ''; // Return the first segment or an empty string
        }
    },
    methods: {
        toggleSearch() {

        },
        async toggleLogout() {
            window.location.href = 'https://us-east-1benj93hcb.auth.us-east-1.amazoncognito.com/logout?client_id=4jblimljbaluvmaoq74118ehkp&nonce=HYuirS3eyAdMcEZAqLR8&logout_uri=https://zs49un6n95.execute-api.us-east-1.amazonaws.com/logout';
            // const response = await fetch('https://zs49un6n95.execute-api.us-east-1.amazonaws.com/logout', {
            //     method: 'GET',
            //     credentials: 'include',
            //     headers: { 'Content-Type': 'application/json' },
            // });

            // if (!response.ok) {
            //     throw new Error('Failed to logout');
            // }
        },
    }
};
</script>

<style scoped>
.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    object-fit: cover;
}

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

.menu-bar .pi-home {
    border-radius: 50%;
}

.p-avatar img {
    object-fit: cover;
    width: 100%;
    height: 100%;
}
</style>