<template>
  <div class="section">
    <div class="columns pt-6">
      <div class="column is-three-fifths is-offset-one-fifth">
        <h2 class="title">
          Orders
        </h2>
        <nav class="breadcrumb">
          <ul>
            <li>
              <nuxt-link to="/">Home</nuxt-link>
            </li>
            <li>
              <nuxt-link to="#" class="is-active">Orders</nuxt-link>
            </li>
          </ul>
        </nav>
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
                  <div class="mx-6 px-6">
                    <table class="table is-narrow is-hoverable">
                      <thead>
                        <tr>
                          <!-- <th>Transaction</th> -->
                          <th />
                          <th>Order-ID</th>
                          <th>Date</th>
                          <th />
                          <!-- <th>Status</th> -->
                        </tr>
                      </thead>
                      <!-- <tfoot></tfoot> -->
                      <tbody>
                        <tr v-for="(tx, indx) in transactions" :key="indx" @click="goToOrder(tx.batchId)">
                          <th>{{ indx }}</th>
                          <td>
                            {{ tx.batchId }}
                          </td>
                          <td>
                            <!-- WTF -->
                            {{ JSON.parse(JSON.stringify(tx)).tx.transaction.processed.block_time }}
                          </td>
                          <td>
                            <button class="button is-info is-small is-rounded">
                              <span class="icon is-medium">
                                <font-awesome-icon icon="fa-solid fa-play" />
                              </span>
                            </button>
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
                  <div class="buttons is-centered p-2">
                    <nuxt-link to="/" class="button is-info is-medium">
                      Home
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p v-show="transactions" class="is-size-7">
          <sup>*</sup> Note that when the localstorage is cleared all orders will be cleared as well.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
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
    ...mapState({
      transactions: state => state.transaction.transactions.list
    }),
    ...mapGetters({
      allTransactions: 'transaction/allTranscations',
      trasactionsIsEmpty: 'transaction/transactionsIsEmpty'
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
    goToOrder (id) {
      this.$router.push(`/batch/${id}`)
    },
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
