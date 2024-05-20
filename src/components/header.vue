<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light shadow sticky-top">
  <div class="container-fluid">
    <router-link to="/" class="navbar-brand"><img src="/src/assets/logo.png" height="40" alt=""></router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Browse</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/favorites" class="nav-link menu-text">Favorites</router-link>
        </li>
      </ul>
      <!--<form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>-->
    </div>
  </div>
</nav>
</template>

