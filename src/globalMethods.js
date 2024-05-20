export const globalMethods = {
    methods: {
        async fetchPhotosBrowse() {
            const currentLength = this.photos.length;
            const limit = 48;
            const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_start=${currentLength}`);
            const data = await response.json();
            const newPhotos = this.getPhotosFromData(data);
            this.photos = [...this.photos, ...newPhotos];
        },
        async fetchPhotosFavorite() {
            const response = await fetch(`https://jsonplaceholder.typicode.com/photos`);
            const data = await response.json();
            const favs = data.filter(photo => this.checkIfFavorite(photo));
            this.photos = this.getPhotosFromData(favs);
        },/*
        async fetchPhotosSearch(searchText) {
            const response = await fetch(`https://jsonplaceholder.typicode.com/photos`);
            const data = await response.json();
            const search = data.filter(photo => this.matchesSearch(photo, searchText)).slice(0, 96);
            this.photos = this.getPhotosFromData(search);
        },*/
        getPhotosFromData(data) {
            let notes = JSON.parse(localStorage.getItem('notes')) || [];
            console.log("Retrieved notes from localStorage:", notes);
            
            return data.map(photo => {
                const matchedNote = notes.find(note => note && note.id === photo.id);
                //console.log("Matched note for photo with id", photo.id, ":", matchedNote);
                return {
                    id: photo.id,
                    thumbnailUrl: photo.thumbnailUrl,
                    url: photo.url,
                    title: photo.title,
                    album: photo.albumId,
                    notes: matchedNote ? matchedNote.notes : "",
                    favorite: this.checkIfFavorite(photo),
                    isAnimated: false
                };
            });
        },
        matchesSearch(photo, searchText){
            return photo.title.toLowerCase().includes(searchText);
        },
        truncatedTitle(title) {
            return title.length > 60 ? title.substring(0, 57) + '...' : title;
        },
        toggleFavorite(photo) {
            photo.favorite = !photo.favorite;
            this.saveFavoriteStatus(photo);
            
            photo.isAnimated = true;
            setTimeout(() => {
            photo.isAnimated = false;
            }, 400);
        },
        openPhoto(photo) {
            window.open(photo.url, '_blank');
        },
        saveFavoriteStatus(photo) {
            let favoriteArray = this.favoritePhotos.slice();
            if (photo.favorite){
                const photoCopy = { ...photo };
                favoriteArray.push(photoCopy.id);
            }
            else{
                const index = favoriteArray.indexOf(photo.id);
                if (index !== -1) {
                    favoriteArray.splice(index, 1);
                }
            }
            localStorage.setItem('favorites', JSON.stringify(favoriteArray));
            this.syncFavorites();
            console.log('Current list of favorites:', favoriteArray);
        },
        syncFavorites() { //this list is prob gonna be wrong most of the time cause its never updated. should not affect anything right
            //doing it like this is probably gonna be faster than constantly calling json parse each time i want a single item
            this.favoritePhotos = JSON.parse(localStorage.getItem('favorites')) || [];
        },
        checkIfFavorite(photo) {
            return this.favoritePhotos.includes(photo.id);
        },
        errorLoadingImage(event) {
            event.target.src = '/src/assets/cantload.png'
        }
    }
}