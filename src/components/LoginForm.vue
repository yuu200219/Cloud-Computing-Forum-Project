<script setup> 
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Toast from 'primevue/toast';

function handleLogin(event) {
    alert('Success!')
}

</script>



<template>
    
    <div class="flex flex-column row-gap-2">
        <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-user"></i>
            </InputGroupAddon>
            <InputText  placeholder="Username" />
        </InputGroup>
        <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-lock"></i>
            </InputGroupAddon>
            <InputText type="password" placeholder="Password" />
        </InputGroup>
        <Toast />
        <Button type="primary" @click="handleLogin" label="Login"/>
    </div>
    
</template>



