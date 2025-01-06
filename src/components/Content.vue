<script setup>
import Upload from './Upload.vue';
// import Post from './Post.vue';

import Menu from 'primevue/menu';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

import Divider from 'primevue/divider';
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';

import Button from 'primevue/button';
import Image from 'primevue/image';

import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { computed } from 'vue';

const toast = useToast();
const visible = ref(false);
const router = useRouter();


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
</script>

<script>
export default {
  components: { Upload },
  data() {
    return {
      posts: [], // 定義響應式數據 posts
    };
  },
  computed: {
    // 计算属性：根据 likeCount 降序排列
    sortedByLikes() {
      return [...this.posts].sort((a, b) => b.likeCount - a.likeCount);
    },

    // 计算属性：根据 timestamp 降序排列
    sortedByTimestamp() {
      return [...this.posts].sort((a, b) => b.timestamp - a.timestamp);
    },
  },
  async mounted() {
        try {
            const response = await fetch('https://zs49un6n95.execute-api.us-east-1.amazonaws.com/get_posts');
            this.posts = await response.json();
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
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
    // sendPostsToParent() {
    //   // 使用 $emit 触发事件，将 posts 数据发送到父组件
    //   console.log("post.vue send event to Content.vue");
    //   this.$emit('updateposts', this.posts);
    // },
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
    //   this.sendPostsToParent();
    },
  },
};
// import code from post.vue
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
        <Upload @update-posts="updatePostsFromChild" />
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
                        <!-- <post @updateposts="handleUpdatedPosts" />     -->
                            <!-- <Post
                                v-for="post in posts"
                                :key="post.id"
                                class="post"
                                :post="post"
                            /> -->
                            <div v-for="post in sortedByLikes" :key="post.id" class="post">
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
                            </div>
                        </div>
                    </TabPanel>
                    
                    <!-- 最新貼文（根據 timestamp 排序） -->
                    <TabPanel value="1">
                        <div class="post-container">
                        <!-- <post @updateposts="handleUpdatedPosts" /> -->
                            <!-- <Post
                                v-for="post in posts"
                                :key="post.id"
                                class="post"
                                :post="post"
                            /> -->
                            <div v-for="post in sortedByTimestamp" :key="post.id" class="post">
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
                            </div>
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
    height: 90%;
    margin: 0 10% 0 10%;
    min-width: 350px;
    max-width: 700px;
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