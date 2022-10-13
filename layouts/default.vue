<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-head">
      <header class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <nuxt-link to="/" class="navbar-item">
              <span>
                <img src="https://effect.network/img/logo/logo_icon.png" alt="logo" srcset="">
              </span>
              <span>Effect Network</span>
            </nuxt-link>
            <span class="navbar-burger" data-target="navbarMenuHeroC">
              <span />
              <span />
              <span />
            </span>
          </div>
          <div id="navbarMenuHeroC" class="navbar-menu">
            <div class="navbar-end">
              <nuxt-link to="/" class="navbar-item">
                Home
              </nuxt-link>
              <nuxt-link to="/create" class="navbar-item">
                Start
              </nuxt-link>
              <nuxt-link to="/batch" class="navbar-item">
                Orders
              </nuxt-link>
            </div>
          </div>
        </div>
      </header>
    </div>

    <div>
      <Nuxt />
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
  name: 'Navbar',
  data () {
    return {
      active: false
    }
  },
  computed: {},
  methods: {}

}
</script>

<style>

</style>
