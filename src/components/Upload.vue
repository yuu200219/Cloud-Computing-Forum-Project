<script setup>
import Dialog from 'primevue/dialog';
import FileUpload from 'primevue/fileupload';
import Textarea from 'primevue/textarea';
import ProgressBar from 'primevue/progressbar';

import { useConfirm } from "primevue/useconfirm";
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import Toast from 'primevue/toast';

import Button from 'primevue/button';


const fileupload = ref();
const router = useRouter();
//const visible = ref(false);
//const blogContent = ref('');

</script>

<template>
  <Button label="Post" icon="pi pi-pen-to-square" rounded class="post-icon" @click="visible = true" />
  <Dialog v-model:visible="visible" modal header="新貼文">
    <!-- <div class="card"> -->
    <Toast ref="toast" />
    <!-- <FileUpload ref="fileupload" name="demo[]" url="/api/upload" accept="image/*" :multiple="true" :maxFileSize="1000000" @upload="onUpload" /> -->
    <!-- </div> -->
    <Textarea v-model="blogContent" rows="10" cols="50" placeholder="什麼新鮮事？" />
    <template #footer>
      <Button label="Upload" icon="pi pi-upload" :loading="loading" @click="handlePost" />
      <Button label="Cancel" icon="pi pi-times" @click="visible = false" />
    </template>
  </Dialog>
  <slot name="trigger"></slot>
</template>

<script>
export default {
  components: {
    Toast,
    Textarea,
    Button,
    Dialog,
  },
  data() {
    return {
      visible: false,
      blogContent: '',
    };
  },
  methods: {
    currentSubdirectory() {
      const path = this.$route.path; // Get the current path
      const segments = path.split('/').filter(Boolean); // Split by '/' and remove empty segments
      return segments[segments.length - 1] || ''; // Return the first segment or an empty string
    },
    async handlePost() {
      try {
        // Simulate saving blog content
        console.log(JSON.stringify({ content: this.blogContent }))
        if (!this.blogContent || this.blogContent.trim() === '') {
          console.error('Blog content is empty');
          return;
        }
        const response = await fetch('https://zs49un6n95.execute-api.us-east-1.amazonaws.com/posts', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: this.blogContent,
            board: this.currentSubdirectory(),
          }),
        });

        if (response.ok) {
          await this.updatePosts();
          this.$refs.toast.add({ severity: 'success', summary: 'Success', detail: 'Post uploaded successfully' });
          this.clearBlogContent();
        } else {
          throw new Error('Failed to upload post');
        }

        // Trigger file upload
        // this.$refs.fileupload.upload();
        this.visible = false;
      } catch (error) {
        this.$refs.toast.add({ severity: 'error', summary: 'Error', detail: error.message });
      }
    },
    async updatePosts() {
      try {
        const response = await fetch('https://zs49un6n95.execute-api.us-east-1.amazonaws.com/get_posts', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            board: this.currentSubdirectory(),
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const posts = await response.json();
        console.log('Upload.vue :', posts);
        // 触发事件更新 `post.vue` 的数据
        this.$emit('update-posts', posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
    clearBlogContent() {
      this.blogContent = '';
    },
    // onUpload(event) {
    //   this.$refs.toast.add({ severity: 'info', summary: 'File Uploaded', detail: `${event.files.length} files uploaded.` });
    // },
  },
};
</script>

<style scoped>
.post-icon {
  margin-top: 10px;
}
</style>