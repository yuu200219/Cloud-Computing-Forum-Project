<script setup>

import Button from 'primevue/button';
import Divider from 'primevue/divider';
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
import Avatar from 'primevue/avatar';

import Upload from './Upload.vue';

</script>

<template>
    <div class="content-wrapper">
    <upload @update-posts="updatePostsFromChild"/>
        <div v-for="post in posts" :key="post.id" class="post">
            <p>
                {{ post.isExpanded ? post.content : (post.content.slice(0, 100) + '...') }}
            </p>
            <Button @click="toggleView(post.id)" variant="text" style="font-size: 15px; color: gray; padding: 0">
                {{ post.isExpanded ? 'View Less' : 'View More...' }}
            </Button>
            <br>
                <img v-if="post.img" :src="post.img" alt="Post Image" class="post-image" />
            <br>
            <br>
            <Button 
                :icon="post.isLiked ? 'pi pi-heart-fill' : 'pi pi-heart'" 
                rounded 
                variant="text"
                @click="toggleLike(post.id)"
                :style="post.isLiked ? 'color: red' : ''"
            />
            <span>{{ post.likeCount }}</span>
            <Button 
                icon="pi pi-comment"
                rounded
                variant="text"
                @click="showCommentDialog(post.id)"
            />
            <!-- <Button icon="pi pi-send" rounded variant="text"/> -->
            <Divider />
            <Dialog 
                v-model:visible="post.isCommentDialogVisible" 
                modal 
                :key="'dialog-' + post.id"
            >
                <template #header>
                    <div class="dialog-header">
                        <!-- <Button label="取消" text plain rounded=""/> -->
                        <span class="reply">回覆</span>
                    </div>
                </template>
                <div class="post-header">
                    <img :src="post.avatar" alt="User Avatar" class="avatar" />
                    <span class="username">{{ post.username }}</span>
                </div>
                <!-- <div class="user-idientity">
                    <Avatar label="Y" shape="circle" style="background-color: #ece9fc; color: #2a1261"/>
                    <p style="font-weight: bold;">
                        {{ post.user }}
                    </p>
                </div> -->
                <div class="comment-content-wrapper">
                    <p>
                        {{ post.content }}
                    </p>
                    <img v-if="post.img" :src="post.img" alt="Post Image" class="post-image" />
                    <Divider/>
                    <div>
                        <div v-for="(comment, index) in post.comments" :key="index">
                            <p class="comment-wrapper">
                            {{ comment }}
                            </p>
                            <Divider/>
                        </div>
                        
                    </div>
                    <div class="textarea-container">
                        <Textarea 
                        v-model="post.newComment" 
                        rows="1" 
                        cols="50" 
                        class="custom-textarea"
                        placeholder="寫下評論..."
                        style="resize: none"
                        auto-resize
                        />
                        <Button 
                        icon="pi pi-send" 
                        @click="addComment(post.id)" 
                        plain text rounded
                        class="send-button"
                        />
                    </div>
                </div>
                
            </Dialog>
        </div>

    
    </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [], // 初始化 posts 为一个空数组
    };
  },
  components: {
    Upload,
  },
  methods: {
    toggleView(id) {
      const post = this.posts.find(post => post.id === id);
      if (post) {
        post.isExpanded = !post.isExpanded;
      }
    },
    toggleLike(postId) {
      const post = this.posts.find((p) => p.id === postId);
      if (post) {
        post.isLiked = !post.isLiked;
        post.likeCount += post.isLiked ? 1 : -1;
      }
    },
    showCommentDialog(postId) {
        const post = this.posts.find((p) => p.id === postId);
        if (post) {
            post.isCommentDialogVisible = true;
        }
    },
    addComment(postId) {
      const post = this.posts.find((p) => p.id === postId);
      if (post && post.newComment.trim()) {
        post.comments.push(post.newComment);
        post.newComment = '';
      }
    },
    sendPostsToParent() {
      // 使用 $emit 触发事件，将 posts 数据发送到父组件
      console.log("post.vue send event to Content.vue");
      this.$emit('updateposts', this.posts);
    },
    updatePostsFromChild(posts) {
      console.log("post.vue's event occur!");
      this.posts = posts.map((post) => ({
        ...post,
        isExpanded: false,
        isLiked: false,
        likeCount: post.likeCount || 0,
        isCommentDialogVisible: false,
        newComment: '',
        comments: post.comments || [],
      }));
      this.sendPostsToParent();
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
    
    /* max-width: 800px;
    min-width: 250px; */
    align-items: center;
    justify-self: center;
}
.comment-content-wrapper {
    align-items: center;
    justify-self: center;
    max-width: 500px;;
}
.dialog-header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.dialog-header p {
  margin: 0; /* Removes default margin */
  padding-left: 220px;
}
.custom-textarea {
    width: 100%;
    margin: 0 auto;
    display: block;
    border-radius: 3rem;
}
.post-image {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
  border-radius: 0.5rem;
  margin-bottom: 10px;
}
.textarea-container {
    display: flex; /* Use flexbox for layout */
    align-items: flex-start; /* Align items to the top */
}
.send-button {
  align-self: flex-start; /* Align the button with the top of the textarea */
}
.comment-wrapper {
    padding: 5px;
    padding-left: 5px;
    margin-bottom: 10px;
}
.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
}
.username {
  font-weight: bold;
  font-size: 16px;
}

</style>

