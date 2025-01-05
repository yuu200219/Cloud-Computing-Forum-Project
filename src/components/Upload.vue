<script setup>
import Dialog from 'primevue/dialog';
import FileUpload from 'primevue/fileupload';
import Textarea from 'primevue/textarea';
import ProgressBar from 'primevue/progressbar';

import { useConfirm } from "primevue/useconfirm";
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';

import Button from 'primevue/button';


const fileupload = ref();
const visible = ref(false);
const blogContent = ref('');

</script>

<template>
<Button label="Post" icon="pi pi-pen-to-square" rounded class="post-icon" @click="visible = true "/>
<Dialog v-model:visible="visible" modal header="新貼文" >
    <!-- <div class="card"> -->
        <Toast />
        <!-- <FileUpload ref="fileupload" name="demo[]" url="/api/upload" accept="image/*" :multiple="true" :maxFileSize="1000000" @upload="onUpload" /> -->
    <!-- </div> -->
        <Textarea v-model="blogContent" rows="10" cols="50" placeholder="什麼新鮮事？"/>
        <p>您輸入的內容：{{ blogContent }}</p>
        <template #footer>
            <Button label="Upload" icon="pi pi-upload" @click="handlePost" />
            <Button label="Cancel" icon="pi pi-times" @click="visible = false" />
        </template>
</Dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      blogContent: '',
    };
  },
  methods: {
    async handlePost() {
        try {
        // Simulate saving blog content
        console.log(this.blogContent);
        const response = await fetch('https://zs49un6n95.execute-api.us-east-1.amazonaws.com/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: this.blogContent }),
        });

        if (response.ok) {
          this.$refs.toast.add({ severity: 'success', summary: 'Success', detail: 'Post uploaded successfully' });
          this.clearBlogContent();
        } else {
          throw new Error('Failed to upload post');
        }

        // Trigger file upload
        this.$refs.fileupload.upload();
        this.visible = false;
      } catch (error) {
        this.$refs.toast.add({ severity: 'error', summary: 'Error', detail: error.message });
      }
    },
    clearBlogContent() {
      this.blogContent = '';
    },
    onUpload(event) {
      this.$refs.toast.add({ severity: 'info', summary: 'File Uploaded', detail: `${event.files.length} files uploaded.` });
    },
  },
};
</script>

<style scoped>
.post-icon {
    margin-top: 10px;
}
</style>