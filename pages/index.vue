<template>
  <section class="hero is-success is-fullheight">
    <!-- Hero head: will stick at the top -->
    <!-- <div class="hero-head"> -->
      <!-- <header class="navbar"> -->
        <!-- <div class="container"> -->
          <!-- <div class="navbar-brand"> -->
            <!-- <a class="navbar-item"> -->
              <!-- <span> -->
                <!-- <img src="https://effect.network/img/logo/logo_icon.png" alt="logo" srcset=""> -->
              <!-- </span> -->
              <!-- <span>Effect Network</span> -->
            <!-- </a> -->
            <!-- <span class="navbar-burger" data-target="navbarMenuHeroC"> -->
              <!-- <span /> -->
              <!-- <span /> -->
              <!-- <span /> -->
            <!-- </span> -->
          <!-- </div> -->
          <!-- <div id="navbarMenuHeroC" class="navbar-menu"> -->
            <!-- <div class="navbar-end"> -->
              <!-- <nuxt-link to="/" class="navbar-item"> -->
                <!-- Home -->
              <!-- </nuxt-link> -->
              <!-- <nuxt-link to="/create" class="navbar-item"> -->
                <!-- Start -->
              <!-- </nuxt-link> -->
              <!-- <nuxt-link to="/batch" class="navbar-item"> -->
                <!-- Orders -->
              <!-- </nuxt-link> -->
            <!-- </div> -->
          <!-- </div> -->
        <!-- </div> -->
      <!-- </header> -->
    <!-- </div> -->

    <!-- Hero content: will be in the middle -->
    <div class="hero-body">
      <div class="container has-text-centered">
        <figure class="image mx-auto" style="object-fit: contain; display: block; border-radius: 5px; width: 300px;">
          <img src="./../assets/images/dalle-shiba-picture.png" alt="">
          <!-- <img src="./../assets/images/dalle-shiba-magnifying-glass.png" alt=""> -->
        </figure>
        <br>
        <p class="title">
          NFT Research
        </p>
        <hr>
        <section class="section">
          <p class="subtitle">
            Use the Effect Network Work-Force in order to add labels to your NFT's.
          </p>
          <div class="columns">
            <div class="column box m-2 p-2">
              <div class="mt-3">
                <font-awesome-icon icon="fa-solid fa-arrow-up-from-bracket" class="icon is-large m-1" />
              </div>
              <hr>
              <p>
                Add links to your NFT's
              </p>
            </div>
            <div class="column box m-2 p-2">
              <div class="mt-3">
                <font-awesome-icon icon="fa-solid fa-cart-shopping" class="icon is-large m-1" />
              </div>
              <hr>
              <p>
                Pay with <a href="https://effect.network/token-page" target="_blank" rel="noopener noreferrer" class="is-underlined">EFX</a>
              </p>
            </div>
            <div class="column box m-2 p-2">
              <div class="mt-3">
                <font-awesome-icon icon="fa-solid fa-tags" class="icon is-large m-1" />
              </div>
              <hr>
              <p>
                The Work-Force will label your NFT's
              </p>
            </div>
            <div class="column box m-2 p-2">
              <div class="mt-3">
                <font-awesome-icon icon="fa-solid fa-image" class="icon is-large m-1" />
              </div>
              <hr>
              <p>
                Download your labeled NFT's
              </p>
            </div>
          </div>
        </section>
        <hr>
        <section class="section">
          <p class="subtitle">
            Get started now!
          </p>
          <div class="buttons is-centered">
            <nuxt-link to="/create" class="button is-fullwidth is-primary is-light is-large mx-6">
              <span>
                Start
              </span>
              <span class="icon is-large">
                <font-awesome-icon icon="fa-solid fa-play" />
              </span>
            </nuxt-link>
            <nuxt-link to="/batch" class="button is-fullwidth is-primary is-light is-large mx-6">
              <span>
                Orders
              </span>
              <span class="icon is-large">
                <font-awesome-icon icon="fa-solid fa-list" />
              </span>
            </nuxt-link>
          </div>
        </section>
      </div>
    </div>

    <!-- Hero footer: will stick at the bottom -->
    <!-- <div class="hero-foot"> -->
      <!-- <nav class="tabs is-boxed is-fullwidth"> -->
        <!-- <div class="container"> -->
          <!-- <ul> -->
            <!-- <li><a href="https://effect.network" target="_blank" rel="noopener noreferrer">Effect Network</a></li> -->
            <!-- <li><a href="https://app.effect.network" target="_blank" rel="noopener noreferrer">Effect Force</a></li> -->
            <!-- <li><a href="https://github.com/effectai" target="_blank" rel="noopener noreferrer">Github</a></li> -->
            <!-- <li><a href="https://dicord.gg/effectnetwork" target="_blank" rel="noopener noreferrer">Join our Discord</a></li> -->
          <!-- </ul> -->
        <!-- </div> -->
      <!-- </nav> -->
    <!-- </div> -->
  </section>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
