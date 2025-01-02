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
    <img v-if="post.img" :src="post.img" alt="Post Image" class="post-image" />
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
        { id: 1, content: "長得好看的人才叫暖男，長得醜的叫熾熱哥布林。 長得好看的人才叫高冷，長得醜的叫冰霜哥布林。 長得好看的人才叫瀟灑，長得醜的叫暴風哥布林。 長得好看的人才叫陽光，長得醜的叫烈焰哥布林。 長得好看的人才叫憂鬱，長得醜的叫陰暗哥布林。 長得好看的人才叫多情，長得醜的叫淫邪哥布林。 長得好看的人才叫吃貨，長得醜的叫暴食哥布林。 以上身高超過180的就能脫離哥布林籍加入巨魔籍。", isExpanded: false },
        { id: 2, content: "各位哥布林謹記： 1.千萬不要走出森林； 2.你可以信任你的​哥布林兄​弟； 3.若1和2衝突則遵守1； 4.你可以信任的其他種族是地精和巨魔； 5.如果不幸走出森林，請即時返回，遇到危險時可向其他哥布林幹部求救（如：長老哥布林、哥布林祭司、哥布林統帥/大統帥等）； 6.身高高於180的哥布林將會自動分化成巨魔，他們有著高大的身軀，必要時可以向他們求助； 7.身高低於160的哥布林將會自動分化為地精，他們有著敏捷的思維，必要時也可向他們求助； 8.如果有其他哥布林勸你走出森林，一定是有勇者用劍抵住他的頭顱，必要時可不顧其安危，直接逃跑並求助； 9.不要沈溺於夢境，若不慎沈溺其中，哥布林大祭司會嘗試和你的大腦連結並拯救你（注：你必須嘗試清醒，否則我們也無能為力）； 10.不要嘗試襲擊落單的雌性精靈，你會被其他精靈和勇者圍剿，屆時我們都無能為力", isExpanded: false },
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
</style>

