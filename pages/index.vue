<template>
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
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
