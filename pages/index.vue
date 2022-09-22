<template>
  <section>
    <div class="banner">
      <section class="section">
        <div class="container is-max-widescreen mt-6">
          <div class="columns is-vcentered">
            <div class="column is-three-fifths">
              <h1 class="title is-1 is-spaced has-background-white-blur">
                Effect Network dApp
              </h1>
              <h1 class="subtitle has-background-white-blur">
                Boilerplate Nuxt dApp so that you can quickly get connected with Effect Force.
              </h1>
              <p class="has-background-white-blur">
                This is a simple that will help you get started with Effect Network. <br>
                Here at Effect Network we love working with
                <a href="http://vuejs.org" target="_blank" rel="noopener noreferrer">Vue</a> x
                <a href="https://nuxtjs.org/" target="_blank" rel="noopener noreferrer">Nuxt.js</a> x
                <a href="https://bulma.io" target="_blank" rel="noopener noreferrer">Bulma</a>
                Nuxt.js x Bulma. <br>
                Most of our frontend stack is built using these technologies. <br>
                So we have decided to make this first iteration of the boilerplate dApp using what we know best. <br>
                Stay tuned for other boilerplates in the future.
              </p>
              <br>

              <p>
                Other resources that will be invaluable to you:
                <ul>
                  <li><a href="https://effect.network" target="_blank" rel="noopener noreferrer">Effect Network</a></li>
                  <li><a href="https://github.com/effectai" target="_blank" rel="noopener noreferrer">Effect Network Github</a></li>
                  <li><a href="https://developer.effect.network" target="_blank" rel="noopener noreferrer">Developer Effect Network</a></li>
                  <li><a href="https://effectai.github.io/effect-js/" target="_blank" rel="noopener noreferrer">Effect-JS Reference</a></li>
                  <li><a href="https://app.effect.network" target="_blank" rel="noopener noreferrer">Effect Force Mainnet</a></li>
                  <li><a href="https://testnet.effect.network" target="_blank" rel="noopener noreferrer">Effect Force Testnet</a></li>
                  <li><a href="https://dicord.gg/effectnetwork" target="_blank" rel="noopener noreferrer">Join our Discord</a></li>
                </ul>
              </p>

              <br>

              <div class="buttons">
                <nuxt-link to="/create" class="button is-primary is-large">
                  Start
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
