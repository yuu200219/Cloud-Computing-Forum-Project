<script setup>

import Button from 'primevue/button';
import Divider from 'primevue/divider';

</script>

<template>
    <div class="content-wrapper">
    <div v-for="post in posts" :key="post.id" class="post">
    <p>
        {{ post.isExpanded ? post.content : (post.content.slice(0, 100) + '...') }}
    </p>
    <Button @click="toggleView(post.id)" variant="text" style="font-size: 15px; color: gray; padding: 0">
        {{ post.isExpanded ? 'View Less' : 'View More...' }}
    </Button>
    <br>
    <br>
    <Button icon="pi pi-heart" rounded variant="text"/>
    <Button icon="pi pi-comment" rounded variant="text"/>
    <Button icon="pi pi-send" rounded variant="text"/>
    <Divider />
    </div>

    
    </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        { id: 1, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque egestas purus sed. tttttttttttttttttttttt", isExpanded: false },
        { id: 2, content: "Proin pharetra orci et eros posuere, a malesuada magna facilisis. Duis euismod, orci.", isExpanded: false },
        // Add more posts as needed
      ],
    };
  },
  methods: {
    toggleView(id) {
      const post = this.posts.find(post => post.id === id);
      if (post) {
        post.isExpanded = !post.isExpanded;
      }
    },
  },
};
</script>

<style scoped>
p {
    word-wrap: break-word;
    overflow-wrap: break-word;
}
.content-wrapper {
    
    max-width: 1000px;
    min-width: 250px;
    align-items: center;
    justify-self: center;
}
</style>

