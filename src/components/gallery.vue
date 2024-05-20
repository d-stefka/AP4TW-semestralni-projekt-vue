<template>
  <div class="content container">
    <div class="row gallery">
      <div v-for="(photo, index) in photos" :key="index" class="col-xl-3 col-md-4 col-6">
        <div class="post-holder image-container">
          <img :src="photo.thumbnailUrl" :alt="photo.title" @click="openPhoto(photo)" @error="errorLoadingImage">
          <img :src="photo.favorite ? '/src/assets/star.png' : '/src/assets/nostar.png'" class="star-icon" :class="{ 'rotate-star': photo.isAnimated }" alt="Star" @click="toggleFavorite(photo)">
          <p class="title">{{ truncatedTitle(photo.title) }}</p>
        </div>
      </div>
    </div>
    <div class="text-center mt-3">
      <button class="btn btn-success load-more-btn" @click="loadMore" :class="{ 'slide-out': slideOut }">Load More</button>
    </div>
  </div>
</template>

<script>
import { globalMethods } from '@/globalMethods';

export default {
  data() {
    return {
      photos: [],
      favoritePhotos: [],
      notes: [],
      slideOut: false
    };
  },
  async created() {
    this.syncFavorites();
    await this.fetchPhotosBrowse();
  },
  mixins: [globalMethods],
  methods: {
    loadMore() {
      this.slideOut = true;
      setTimeout(() => {
        this.fetchPhotosBrowse();
      }, 200);
      setTimeout(() => {
      this.slideOut = false;
    }, 500);
    }
  }
};
</script>

<style scoped>

.gallery img {
  width: 100%;
  height: auto;
}

.gallery .title {
margin-top: 5px;
text-decoration: none !important;
}

.post-holder {
  position: relative;
  cursor: pointer;
  margin-bottom:60px;
}
.post-holder img {
    display: block;
    transition: transform 0.12s cubic-bezier(0.4, 0.01, 0.165, 0.99);
  }
  
.post-holder:hover img {
   transform: scale(1.05) rotate(2deg);
}

.btn {
  font-size:1.2em;
  margin-bottom:100px;
  padding:15px 50px 15px 50px
}

.load-more-btn {
  transition: transform 0.5s ease;
}

.slide-out {
  transform: translateY(500px);
}

</style>
