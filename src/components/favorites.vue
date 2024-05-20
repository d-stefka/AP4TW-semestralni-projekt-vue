<template>
    <div class="content container">
      <div class="row gallery">
        <div v-for="(photo, index) in photos" :key="index" class="container col-12">
          <div class="card shadow border-0">
            <div class="row align-items-center">
                <div class="col-md-5 col-xl-4 col-12">
                    <div class="image-container">
                        <img :src="photo.url" :alt="photo.title" @click="openPhoto(photo)" @error="errorLoadingImage">
                        <img :src="photo.favorite ? '/src/assets/star.png' : '/src/assets/nostar.png'" class="star-icon" :class="{ 'rotate-star': photo.isAnimated }" alt="Star" @click="toggleFavorite(photo)">
                    </div>
                </div>
                <div class="col-md-7 col-xl-8 col-12 fav-text">
                  <h5>{{ photo.title }}</h5>
                  <p>Album: {{ photo.album }}</p>
                  <div class="form-group">
                    <br>
                    <label for="notes">Notes:</label>
                    <textarea class="form-control" id="notes" v-model="photo.notes" @input="saveNotes($event.target.value, photo)"></textarea>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    <div class="text-center mt-3">
      <button class="btn btn-danger" @click="clearLocalStorage">Clear Local Storage</button>
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
        notesArray: [],
        notes: ''
      };
    },
    async created() {
      this.syncFavorites();
      await this.fetchPhotosFavorite();
    },
    mixins: [globalMethods],
    methods: {
      saveNotes(text, photo) {
        const data = {
        notes: text,
        id: photo.id
        };

        const index = this.notesArray.findIndex(item => item.id === photo.id);
        if (index !== -1) {
          this.notesArray.splice(index, 1);
        }
        
        this.notesArray.push(data);

        localStorage.setItem('notes', JSON.stringify(this.notesArray));
        console.log("Data to save:", this.notesArray);
      },
      clearLocalStorage() {
        localStorage.removeItem('notes');
        localStorage.removeItem('favorites');
        window.location.reload();
      }
    }
  };
</script>
  
<style scoped>
  .gallery img {
    width: 100%;
    height: auto;
  }

  .btn {
  font-size:1.2em;
  margin-top:50px;
  margin-bottom:100px;
  padding:15px 50px 15px 50px
}
  .card {
    margin-bottom:30px;
  }

  .fav-text {
    padding:20px 30px 20px 30px;
  }
</style>
