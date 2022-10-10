<template>
  <section class="hero is-success is-fullheight">
    <!-- Hero head: will stick at the top -->
    <div class="hero-head">
      <header class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item">
              <span>
                <img src="https://effect.network/img/logo/logo_icon.png" alt="logo" srcset="">
              </span>
              <span>Effect Network</span>
            </a>
            <span class="navbar-burger" data-target="navbarMenuHeroC">
              <span />
              <span />
              <span />
            </span>
          </div>
          <div id="navbarMenuHeroC" class="navbar-menu">
            <div class="navbar-end">
              <a class="navbar-item">
                Home
              </a>
              <a class="navbar-item">
                Start
              </a>
              <a class="navbar-item">
                Orders
              </a>
              <a class="navbar-item">
                About
              </a>
            </div>
          </div>
        </div>
      </header>
    </div>

    <!-- Hero content: will be in the middle -->
    <div class="hero-body">
      <div class="container has-text-centered">
        <figure class="image mx-auto" style="object-fit: contain; display: block; border-radius: 5px; width: 300px;">
          <img src="./../assets/images/dalle-shiba-picture.png" alt="">
          <!-- <img src="./../assets/images/dalle-shiba-magnifying-glass.png" alt=""> -->
        </figure>
        <br>
        <p class="title">
          Effect Network NFT Labeler
        </p>
        <p class="subtitle">
          Use the Effect Network Work-Force in order to add labels to your NFT's.
        </p>
        <div class="buttons is-centered">
          <nuxt-link to="/create" class="button is-primary is-light is-large">
            <span>
              Start
            </span>
            <span class="icon is-large">
              <font-awesome-icon icon="fa-solid fa-play" />
            </span>
          </nuxt-link>
          <nuxt-link to="/orders" class="button is-primary is-light is-large">
            <span>
              Orders
            </span>
            <span class="icon is-large">
              <font-awesome-icon icon="fa-solid fa-list" />
            </span>
          </nuxt-link>
        </div>
        <hr>
        <section class="section">
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
      </div>
    </div>

    <!-- Hero footer: will stick at the bottom -->
    <div class="hero-foot">
      <nav class="tabs is-boxed is-fullwidth">
        <div class="container">
          <ul>
            <li><a href="https://effect.network" target="_blank" rel="noopener noreferrer">Effect Network</a></li>
            <li><a href="https://app.effect.network" target="_blank" rel="noopener noreferrer">Effect Force</a></li>
            <li><a href="https://github.com/effectai" target="_blank" rel="noopener noreferrer">Github</a></li>
            <li><a href="https://dicord.gg/effectnetwork" target="_blank" rel="noopener noreferrer">Join our Discord</a></li>
          </ul>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>

/**
  <section>
    <div class="banner">
      <section class="section">
        <div class="container is-max-widescreen mt-6">
          <div class="columns is-vcentered">
            <div class="column is-three-fifths">
              <h1 class="title is-1 is-spaced has-background-white-blur">
                Effect Network Image Labeling dApp
              </h1>
              <h1 class="subtitle has-background-white-blur">
                Use the Effect Network Work-Force in order to add labels to your images.
              </h1>
              <p class="has-background-white-blur">
              <div class="buttons">
                <nuxt-link to="/create" class="button is-primary is-large">
                  Start
                </nuxt-link>
              </div>
              <ol>
                <li>Click Start</li>
                <li>Add URL to the form (ex: <a href="https://effect.network/img/logo/logo_icon.png" target="_blank">https://effect.network/img/logo/logo_icon.png</a>)</li>
                <li>Choose the amount of repititions you want for each image.</li>
                <li>Login in with <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">https://metamask.io/</a> or <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">https://metamask.io/</a></li>
                <li>Make sure you have enough EFX to pay for your order, you can buy some <a href="https://effect.network/token" target="_blank" rel="noopener noreferrer">here.</a></li>
                <li>Place your order!</li>
                <li>Your images will be uploaded to the <a href="https://app.effect.network/campaigns/41" target="_blank" rel="noopener noreferrer">Effect Force</a></li>
                <li>Wait for you results to come in.</li>
              </ol>
              </p>
              <hr>

              <p>
                More information:
                <ul>
                  <li><a href="https://effect.network" target="_blank" rel="noopener noreferrer">Effect Network</a></li>
                  <li><a href="https://github.com/effectai" target="_blank" rel="noopener noreferrer">Effect Network Github</a></li>
                  <li><a href="https://app.effect.network" target="_blank" rel="noopener noreferrer">Effect Force Mainnet</a></li>
                  <li><a href="https://dicord.gg/effectnetwork" target="_blank" rel="noopener noreferrer">Join our Discord</a></li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>

 */
