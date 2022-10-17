<template>
  <div class="section">
    <div class="columns pt-6">
      <div class="column is-three-fifths is-offset-one-fifth">
        <h2 class="title">
          Order
        </h2>
        <nav class="breadcrumb">
          <ul>
            <li>
              <nuxt-link to="/">Home</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/batch">Orders</nuxt-link>
            </li>
            <li>
              <nuxt-link to="#" class="is-active">ID</nuxt-link>
            </li>
          </ul>
        </nav>
        <div v-if="loading" class="loading-text">
          Loading
        </div>
        <div v-else>
          <div v-if="batch && campaign">
            <div class="box media p-6">
              <div class="media-content">
                <div class="content">
                  <p class="subtitle has-text-black">
                    <a :href="`https://app.effect.network/campaigns/${batch.campaign_id}`" target="_blank" rel="noopener noreferrer">
                      <span class="icon-text">
                        <span class="is-underlined">{{ campaign.info.title }}</span>
                        &nbsp;
                        <span>
                          <font-awesome-icon class="icon is-small" icon="fa-solid fa-arrow-up-right-from-square" />
                        </span>
                      </span>
                    </a>
                  </p>
                  <hr>

                  <p class="subtitle has-text-black">
                    Details
                  </p>
                  <div class="px-6">
                    <table class="table is-narrow is-centered">
                      <thead />
                      <tbody>
                        <tr>
                          <td>
                            Order-ID
                          </td>
                          <td>
                            <a :href="`https://app.effect.network/${id}`" target="_blank" rel="noopener noreferrer">
                              <span class="is-underlined">{{ id }}</span>
                              <span class="icon">
                                <font-awesome-icon class="icon is-small" icon="fa-solid fa-arrow-up-right-from-square" />
                              </span>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Status
                          </td>
                          <td>
                            {{ batchPercentageDone }}% (complete)
                          </td>
                        </tr>
                        <tr>
                          <td>Tasks</td>
                          <td>{{ batch.num_tasks }}&nbsp;×</td>
                        </tr>
                        <tr>
                          <td>Amount</td>
                          <td>{{ batch.repetitions }}&nbsp;×</td>
                        </tr>
                        <tr>
                          <td>Cost per Task</td>
                          <td><strong>{{ campaign.info.reward }} EFX</strong> </td>
                        </tr>
                      </tbody>

                      <tfoot>
                        <tr>
                          <td>Total Cost</td>
                          <td><strong>{{ batch.balance.quantity }}</strong> </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <hr>

                  <p class="subtitle has-text-black">
                    Results ({{ batch.tasks_done }}/{{ batch.num_tasks * batch.repetitions }})
                  </p>
                  <progress v-show="submissions && submissions.length > 0" class="progress is-medium is-info" :value="batchPercentageDone" max="100">
                    {{ batchPercentageDone }}%
                  </progress>
                  <div v-if="submissions && submissions.length > 0" class="table-container px-6">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Submitted on</th>
                          <th>Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(res) in submissions"
                          :key="res.id"
                        >
                          <td>
                            <a :href="`https://app.effect.network/campaigns/${batch.campaign_id}/${res.batch_id}`" target="_blank" rel="noopener noreferrer">
                              {{ res.id }}
                            </a>
                          </td>
                          <td>{{ res.submitted_on }}</td>
                          <td>
                            <button
                              class="button is-info is-small is-rounded"
                              @click.prevent="viewResult(res.data)"
                            >
                              <span class="">
                                <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="icon is-small" />
                              </span>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div v-else class="has-text-centered">
                    No results yet, please wait while someone starts working on your order.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <p>No batch found</p>
          </div>
        </div>
      </div>

      <div class="modal" :class="{'is-active': resultModal}">
        <div class="modal-background" @click.prevent="resultModal = false">
          <div class="modal-card p-6">
            <header class="modal-card-head">
              <p class="modal-card-title">
                Image Label Results
              </p>
              <button class="delete" aria-label="close" @click.prevent="resultModal = false" />
            </header>
            <section class="modal-card-body">
              <div class="modal-content mx-auto has-text-centered" style="max-width: 80%;">
                <img v-if="imageModal === null || imageModal === undefined" class="mx-auto" src="~assets/images/loading.svg">
                <img v-else class="mx-auto" :src="imageModal" alt="" srcset="">
              </div>
              <hr>
              <div v-if="dataModal === null || dataModal === undefined">
                Loading...
              </div>
              <div v-else>
                <div class="table-container">
                  <table class="table mx-auto">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Label</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="r in dataModal" :key="r.id">
                        <td>
                          <img :src="r.croppedCanvas" style="width: 100px">
                        </td>
                        <td>{{ r.label }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <footer class="modal-card-foot">
              <!-- <button class="button is-success">Save changes</button> -->
              <!-- <button class="button" @click.prevent="resultModal = false">Close</button> -->
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
  </div>
</template>

<script>
import * as effectsdk from '@effectai/effect-js'
export default {
  // props: ['campaign'],
  data () {
    return {
      env: 'mainnet',
      loading: true,
      effectsdk: null,
      id: parseInt(this.$route.params.id),
      tasks: null,
      submissions: null,
      timer: null,
      batch: null,
      batchIpfs: null,
      campaign: null,
      resultModal: false,
      dataModal: null,
      imageModal: 'https://effect.network/img/logo/effect-force.png'
    }
  },
  computed: {
    batchPercentageDone () {
      if (this.batch) {
        return Math.round((this.batch.tasks_done / (this.batch.num_tasks * this.batch.repetitions)) * 100)
      }
      return 0
    }
  },
  mounted () {
    this.effectsdk = new effectsdk.EffectClient(this.env)
    this.getBatch()
    this.getResults()
    this.timer = setInterval(() => {
      this.getResults()
    }, 10e3)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  methods: {
    async getBatch () {
      this.loading = true
      console.log('getBatch', this.id)
      this.batch = await this.effectsdk.force.getBatchById(this.id).catch(console.error)
      console.log('batch', this.batch)
      this.batchIpfs = await this.effectsdk.force.getIpfsContent(this.batch.content.field_1).catch(console.error)
      console.log('batchIpfs', this.batchIpfs)
      this.campaign = await this.effectsdk.force.getCampaign(this.batch.campaign_id).catch(console.error)
      console.log('campaign', this.campaign)
      this.loading = false
      console.log('getBatch', this.batch, this.batchIpfs, this.campaign)
    },
    async getResults () {
      console.log('Retrieving results.')
      let oldResultsLength = 0
      if (this.submissions) {
        oldResultsLength = this.submissions.length
      }
      this.submissions = await this.effectsdk.force.getSubmissionsOfBatch(this.id)
      console.log('results', this.submissions)
      // check if results changed
      if (this.submissions.length !== oldResultsLength) {
        console.log('Retrieving new results.')
        this.getBatch()
      }
    },
    async viewResult (data) {
      this.resultModal = true
      const dataJson = JSON.parse(data)
      const ipfsData = await this.effectsdk.force.getIpfsContent(dataJson?.hash)
      this.dataModal = ipfsData?.data
      this.imageModal = ipfsData?.image_url
    }
  }
}
</script>
