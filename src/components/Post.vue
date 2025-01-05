<script setup>

import Button from 'primevue/button';
import Divider from 'primevue/divider';
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
import Avatar from 'primevue/avatar';

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
      posts: [
        { id: 1,
            username: '阿明',
            avatar: '/src/assets/img/00.jpg',
            content: "長得好看的人才叫暖男，長得醜的叫熾熱哥布林。 長得好看的人才叫高冷，長得醜的叫冰霜哥布林。 長得好看的人才叫瀟灑，長得醜的叫暴風哥布林。 長得好看的人才叫陽光，長得醜的叫烈焰哥布林。 長得好看的人才叫憂鬱，長得醜的叫陰暗哥布林。 長得好看的人才叫多情，長得醜的叫淫邪哥布林。 長得好看的人才叫吃貨，長得醜的叫暴食哥布林。 以上身高超過180的就能脫離哥布林籍加入巨魔籍。", 
            img: "/src/assets/img/00.jpg",
            isExpanded: false,
            isLiked: false,
            likeCount: 0, 
            commentCount: 0,
            isCommentDialogVisible: false,
            newComment: '',
            comments: [],
        },
        { id: 2,
            username: '小美',
            avatar: '/src/assets/img/00.jpg',
            content: "各位哥布林謹記： 1.千萬不要走出森林； 2.你可以信任你的​哥布林兄​弟； 3.若1和2衝突則遵守1； 4.你可以信任的其他種族是地精和巨魔； 5.如果不幸走出森林，請即時返回，遇到危險時可向其他哥布林幹部求救（如：長老哥布林、哥布林祭司、哥布林統帥/大統帥等）； 6.身高高於180的哥布林將會自動分化成巨魔，他們有著高大的身軀，必要時可以向他們求助； 7.身高低於160的哥布林將會自動分化為地精，他們有著敏捷的思維，必要時也可向他們求助； 8.如果有其他哥布林勸你走出森林，一定是有勇者用劍抵住他的頭顱，必要時可不顧其安危，直接逃跑並求助； 9.不要沈溺於夢境，若不慎沈溺其中，哥布林大祭司會嘗試和你的大腦連結並拯救你（注：你必須嘗試清醒，否則我們也無能為力）； 10.不要嘗試襲擊落單的雌性精靈，你會被其他精靈和勇者圍剿，屆時我們都無能為力",
            isExpanded: false,
            isLiked: false,
            likeCount: 0,
            commentCount: 0,
            isCommentDialogVisible: false,
            newComment: '',
            comments: [],
         },
        // Add more posts as needed
      ],
      newPostImage: null,
    };
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

