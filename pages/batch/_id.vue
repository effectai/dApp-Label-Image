<template>
  <div class="section pt-6">
    <div class="columns">
      <div class="column is-three-fifths is-offset-one-fifth">
        <h2 class="title">
          Order
        </h2>
        <div v-if="loading" class="loading-text">
          Loading
        </div>
        <div v-else>
          <div v-if="batch && campaign">
            <br>
            <br>
            <div class="box media p-6">
              <div class="media-content">
                <div class="content">
                  <p class="subtitle">
                    <a :href="`https://app.effect.network/campaigns/${batch.campaign_id}`" target="_blank" rel="noopener noreferrer">
                      <span class="icon-text">
                        <span>{{ campaign.info.title }}</span>
                      </span>
                    </a>
                  </p>
                  <hr>

                  <p class="subtitle">
                    Details
                  </p>
                  <div class="px-6">
                    <p>
                      <span>Order ID: <strong>{{ id }}</strong></span>
                      <br>
                      <span>Status: <strong>{{ batchPercentageDone }}%</strong></span>
                    </p>
                    <table class="table is-narrow is-centered">
                      <thead />
                      <tbody>
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

                  <p class="subtitle">
                    Tasks
                  </p>
                  <table class="table is-narrow">
                    <thead />
                    <tbody>
                      <tr v-for="task in batchIpfs.tasks" :key="task.link_id">
                        <td>{{ task.tweet_id }}</td>
                      </tr>
                    </tbody>
                  </table>

                  <!-- <div id="tweet"></div> -->

                  <hr>

                  <p class="subtitle">
                    Results ({{ batch.tasks_done }}/{{ batch.num_tasks * batch.repetitions }})
                  </p>
                  <div v-if="results && results.length > 0">
                    <table class="table" style="width: 100%">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Result</th>
                          <th>Submitted on</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="r in results"
                          :key="r.id"
                        >
                          <td>{{ r.id }}</td>
                          <td>{{ r.data }}</td>
                          <td>{{ r.submitted_on }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div v-else>
                    No results yet, please wait while someone start working on your order.
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
    </div>
  </div>
</template>

<script>
import * as effectsdk from '@effectai/effect-js'
export default {
  data () {
    return {
      env: 'mainnet',
      loading: true,
      effectsdk: null,
      id: parseInt(this.$route.params.id),
      tasks: null,
      results: null,
      timer: null,
      batch: null,
      batchIpfs: null,
      campaign: null
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
    }, 30e3)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  methods: {
    async getBatch () {
      this.loading = true
      this.batch = await this.effectsdk.force.getBatchById(this.id)
      this.batchIpfs = await this.effectsdk.force.getIpfsContent(this.batch.content.field_1)
      this.campaign = await this.effectsdk.force.getCampaign(this.batch.campaign_id)
      this.loading = false
      console.log('getBatch', this.batch, this.batchIpfs, this.campaign)
    },
    async getResults () {
      console.log('getting results...')
      let oldResultsLength = 0
      if (this.results) {
        oldResultsLength = this.results.length
      }
      this.results = await this.effectsdk.force.getSubmissionsOfBatch(this.id)
      console.log('results', this.results)
      // check if results changed
      if (this.results.length !== oldResultsLength) {
        console.log('results changed')
        this.getBatch()
      }
    }
  }
}
</script>
