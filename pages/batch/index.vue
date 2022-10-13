<template>
  <div class="section">
    <div class="columns pt-6">
      <div class="column is-three-fifths is-offset-one-fifth">
        <h2 class="title">
          Orders
        </h2>
        <div v-if="Loading" class="loading-text">
          Loading
        </div>
        <div v-else>
          <div v-if="transactions">
            <div class="box media p-6">
              <div class="media-content">
                <div class="content">
                  <p class="subtitle has-text-black">
                    Recent Orders <sup>*</sup>
                  </p>
                  <hr>
                  <div class="px-6">
                    <table class="table is-narrow">
                      <thead>
                        <tr>
                          <!-- <th>Transaction</th> -->
                          <th />
                          <th>Order-ID</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <!-- <tfoot></tfoot> -->
                      <tbody>
                        <tr v-for="(tx, indx) in transactions" :key="indx">
                          <th>{{ indx }}</th>
                          <td>
                            {{ tx.tx.id }}
                          </td>
                          <td>
                            {{ tx.batchId }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="box media p-6">
              <div class="media-content">
                <div class="content">
                  <p class="subtitle has-text-black has-text-centered">
                    No orders found.
                  </p>
                  <p class="has-text-centered">
                    Place an order to see it here.
                  </p>
                  <div class="buttons is-centered p-2">
                    <nuxt-link to="/" class="button is-link is-medium">
                      Home
                    </nuxt-link>
                    <nuxt-link to="/create" class="button is-link is-medium">
                      Start
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p v-show="transactions" class="is-size-7">
          * Note that when the localstorage is cleared all transactions will be cleared as well.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import * as effectsdk from '@effectai/effect-js'

export default {
  name: 'Orders',
  data () {
    return {
      loading: true,
      list: [],
      effectsdk: null
    }
  },
  computed: {
    // ...mapState({
    //   transactions: state => state.transaction.transactions.list
    // }),
    ...mapGetters({
      transactions: 'transaction/transactions'
    })
  },
  created () {
    this.effectsdk = new effectsdk.EffectClient('mainnet')
    this.list = this.transactions
  },
  methods: {
    ...mapActions({
      removeTransaction: 'transactions/removeTransaction'
    }),
    async fetchBatch () {
      this.list = []
      for (const batch of this.transactions) {
        const batchInfo = await this.effectsdk.getBatch(batch.batchId)
        //  const batchIpfs = await this.effecstsdk.getBatchIpfs(batch.batchId)
        this.list.push(batchInfo)
      }
    }
  }
}
</script>
