<template>
  <div class="section pt-6">
    <div class="columns">
      <div class="column is-three-fifths is-offset-one-fifth">
        <!-- Create your batch of tasks -->
        <div v-if="step === 1" id="step-1">
          <h2 class="title">
            Add Images
          </h2>
          <div class="field">
            <div class="box">
              <div class="mx-auto" style="max-width: 600px;">
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label is-pulled-left">Image URL:</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <p class="control">
                        <input
                          :ref="`placeholder-${placeindex}`"
                          v-model="newTask.image_url"
                          type="url"
                          pattern="https?://.+"
                          class="input is-info"
                          placeholder="https://effect.network/img/logo/logo.png"
                          required
                          @keydown.enter.prevent="createTask"
                        >
                      </p>
                    </div>
                  </div>
                </div>
                <div class="control">
                  <button
                    class="button is-primary is-fullwidth mx-auto"
                    :class="{'is-loading': loading}"
                    @click.prevent="createTask"
                  >
                    <span>Add</span>
                  &nbsp;
                    <span><font-awesome-icon icon="fa-solid fa-plus" /></span>
                  <!-- <span><font-awesome-icon icon="fa-solid fa-square-plus" /></span> -->
                  </button>
                </div>
                <br>
              </div>
              <div style="background: #fff; border-radius: 8px" class="p-2">
                <div v-if="batch && batch.length >= 1" class="table-container">
                  <table v-if="campaign && campaign.placeholders" class="table mx-auto">
                    <thead>
                      <tr>
                        <!-- <th v-for="placeholder in campaign.placeholders" :key="placeholder" class="task-placeholder-value has-text-left">
                          {{ placeholder }}
                        </th> -->
                        <th>
                          Images
                        </th>
                        <th />
                        <!-- <th>Min. Labels</th> -->
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="campaign.placeholders.length === 0">
                        <th>X</th>
                        <td>
                          hello
                        </td>
                      </tr>
                      <tr v-for="(task, index) in batch" v-else :key="task.id">
                        <th v-for="placeholder in campaign.placeholders" :key="placeholder">
                          <img :src="batch[index].image_url" alt="" srcset="" style="object-fit: contain; height: 100px;">
                        </th>
                        <td v-for="placeholder in campaign.placeholders" :key="placeholder" class="task-placeholder-value has-text-left">
                          <div>
                            <a :href="batch[index].image_url" target="_blank" rel="noopener noreferrer" style="word-break: normal;">
                              {{ batch[index].image_url }}
                            </a>
                          </div>
                        </td>
                        <td>
                          <button class="button is-danger is-outlined is-small is-rounded" @click.prevent="batch.splice(index, 1)">
                            X
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-else>
                  <p class="has-text-centered">
                    No images added yet.
                  </p>
                </div>
              </div>
            </div>
            <div v-if="campaign && campaign.info" class="box has-text-centered">
              <p>
                Workers per image:
                <strong>{{ repetitions }}</strong>
              </p>
              <div class="mx-auto">
                <input
                  v-model="repetitions"
                  class="slider is-fullwidth is-large is-primary"
                  step="1"
                  min="1"
                  max="20"
                  type="range"
                >
              </div>
              <div>
                <table class="table">
                  <thead />
                  <tfoot />
                  <table>
                    <tr />
                  </table>
                </table>
                <hr>
                Subtotal:
                <strong>{{ parseFloat(campaign.info.reward * batch.length * repetitions).toFixed(4) }} EFX</strong>
              </div>
            </div>
          </div>

          <form>
            <div class="field is-grouped is-justify-content-center mt-6">
              <div class="control">
                <button type="submit" :class="{'is-loading': loading}" class="button is-link is-large is-fullwidth mr-4" :disabled="!batch.length" @click="nextStep">
                  Next
                </button>
              </div>
            </div>
          </form>
        </div>

        <!-- Tasks overview & wallet login -->
        <div v-if="step === 2" class="p-1 m-1">
          <h2 v-if="!accountConnected" class="title">
            Connect your wallet
          </h2>
          <h2 v-else class="title">
            Finish Order
          </h2>

          <div v-if="accountConnected" class="box media">
            <figure class="media-left">
              <p class="image is-128x128">
                <img v-if="connectAccount.providerName === 'metamask'" src="@/assets/images/providers/BSC-logo.svg" alt="" srcset="">
                <img v-else src="@/assets/images/providers/EOS-logo.svg" alt="" srcset="">
              </p>
            </figure>

            <div class="media-content">
              <div class="content p-3">
                <p class="subtitle has-text-black">
                  Connected
                </p>
                <p>
                  <strong>{{ connectResponse.accountName }}</strong>
                </p>
                <hr>
                <p class="subtitle has-text-black">
                  Order
                </p>

                <table class="table is-narrow is-centered">
                  <thead />
                  <tbody>
                    <tr>
                      <td>Tasks</td>
                      <td>{{ batch.length }}&nbsp;×</td>
                    </tr>
                    <tr>
                      <td>Amount</td>
                      <td>{{ repetitions }}&nbsp;×</td>
                    </tr>
                    <tr>
                      <td>Cost per Task</td>
                      <td><strong>{{ campaign.info.reward }}</strong> <i>{{ client.config.efxSymbol }}</i></td>
                    </tr>
                  </tbody>

                  <tfoot>
                    <tr>
                      <td>Total Cost</td>
                      <td><strong>{{ batchCost }}</strong> <i>{{ client.config.efxSymbol }}</i></td>
                    </tr>
                    <tr>
                      <td>Network Fee (10%)</td>
                      <td><strong>{{ batchCost * 0.1 }}</strong> <i>{{ client.config.efxSymbol }}</i></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <br>
            </div>
          </div>

          <div v-if="!accountConnected" class="">
            <div class="box buttons p-6">
              <button id="btn-login" :class="{'is-loading': loading}" class="button is-large is-fullwidth is-link px-6 mx-6" @click="login()">
                <span class="icon">
                  <img src="@/assets/images/providers/BSC-logo.svg" alt="" srcset="">
                </span>
                <span>Connect BSC</span>
              </button>
              <button id="btn-login-eos" :class="{'is-loading': loading}" class="button is-large is-fullwidth is-link px-6 mx-6" @click="loginEOS()">
                <span class="icon">
                  <img src="@/assets/images/providers/EOS-logo.svg" alt="" srcset="">
                </span>
                <span>Connect EOS</span>
              </button>
            </div>
            <div class="buttons is-centered mx-auto p-1">
              <button class="button is-link is-outlined is-large" @click="step -= 1">
                Back
              </button>
            </div>
          </div>

          <div v-if="accountConnected && !createdBatchId">
            <p v-if="paymentLoading" class="notification is-warning is-light">
              Please be patient, this may take a few minutes.
              <br>
              If you are using <strong class="is-underlined">Metamask</strong>, you will need to confirm multiple transactions.
            </p>
            <form @submit.prevent="uploadBatch">
              <div class="field is-grouped is-justify-content-center mt-6">
                <div class="control">
                  <button class="button is-link is-outlined is-large is-wide" @click="previousStep">
                    Back
                  </button>
                  <button type="submit" :class="{'is-loading': loading}" class="button is-link is-large is-wide mr-4">
                    <span>Pay</span>
                    &nbsp;
                    <span class="icon">
                      <font-awesome-icon icon="fa-solid fa-coins" class="icon" />
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div v-if="createdBatchId" class="notification is-success">
            <p class="mx-6 px-6 has-text-centered">
              <strong>Success!</strong><br>
              Your order is being processed.
              <a v-if="env === 'mainnet'" :href="`https://app.effect.network/campaigns/${campaign.id}/${createdBatchId}`" target="_blank" rel="noopener noreferrer">Effect Force</a>
              <a v-else :href="`https://testnet.effect.network/campaigns/${campaign.id}/${createdBatchId}`" target="_blank" rel="noopener noreferrer">Effect Force</a>
              <br>
            </p><hr>
            <div class="buttons is-centered">
              <nuxt-link :to="`/batch/${createdBatchId}`" class="mx-6 px-6 button is-centered is-large is-link" target="" rel="noopener noreferrer">
                Go to results
              </nuxt-link>
            </div>
          </div>
        </div>

        <article v-if="errorMessage" class="message is-danger mt-5">
          <div class="message-body">
            {{ errorMessage }}
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
// Import Effect-JS
import * as effectsdk from '@effectai/effect-js'
import Web3 from 'web3'
import AnchorLink from 'anchor-link'
import AnchorLinkBrowserTransport from 'anchor-link-browser-transport'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Create',
  data () {
    return {
      campaignId: 41, // USE OWN CAMPAIGN ID HERE
      env: 'mainnet',
      proxy: 'efxtaskproxy', // optional use proxy
      loading: false,
      batch: [],
      repetitions: 1,
      step: 1,
      account: null,
      effectsdk: null,
      campaign: null,
      errorMessage: null,

      // Form
      tempCounter: 0,
      newTask: {
        id: null,
        link: null
      },

      // login & overview
      createdBatchId: null,
      client: null,
      connectAccount: {
        providerName: null,
        provider: null,
        account: null
      },
      connectResponse: null,
      accountConnected: false,
      paymentLoading: false
    }
  },
  computed: {
    ...mapState({
      campaign: state => state.campaign.campaign
    }),
    batchCost () {
      return (this.batch.length * this.repetitions) * this.campaign.info.reward
    }
  },
  watch: {
    campaign () {
      this.newTask = this.getEmptyTask(this.campaign.placeholders)
    }
  },
  created () {
    // When the component is created we retrieve the campaigns
    this.getCampaign()
    if (this.campaign && this.campaign.placeholders) {
      this.newTask = this.getEmptyTask(this.campaign.placeholders)
    }
  },
  methods: {
    ...mapActions({
      addTransaction: 'transaction/addTransaction'
    }),
    setErrorMessage (msg) {
      this.errorMessage = msg
      setTimeout(() => { this.errorMessage = null }, 5000)
    },
    nextStep () {
      this.errorMessage = null
      this.step += 1
    },
    previousStep () {
      this.errorMessage = null
      this.step -= 1
    },
    /**
     * Get all campaign data from Effect Force
     * First initialize the SDK and then retrieve the campaigns
     */
    async getCampaign () {
      this.loading = true
      try {
        this.effectsdk = new effectsdk.EffectClient('mainnet')
        this.campaign = await this.effectsdk.force.getCampaign(this.campaignId)
        if (this.campaign) {
          this.campaign.placeholders = this.getPlaceholders(this.campaign.info.template)
        }
        console.log('this.campaign', this.campaign)
      } catch (error) {
        this.setErrorMessage(error)
        console.error(error)
      }
      this.loading = false
    },

    getPlaceholders (template) {
      const placeholders = getMatches(
        template,
        /\$\{\s?(\w+)\s?\|?\s?(\w*)\s?\}/g
      )
      return [...new Set(placeholders)]
    },
    /**
     * Set the account to use for ordering
     */
    setAccount (account, sdk) {
      this.effectsdk = sdk
      this.account = account
    },
    /**
     * Push new task in to the tasks array and create a prepare a new task.
     */
    createTask () {
      if (this.newTask.image_url.length === 0) {
        this.setErrorMessage('Please add a valid image url. ex: https://example.com/image.jpg')
        return
      }

      try {
        if (!this.newTask.image_url.includes('http') || !this.newTask.image_url.includes('https')) {
          this.newTask.image_url = `https://${this.newTask.image_url}`
        }
        const url = new URL(this.newTask.image_url)
        console.log('url', url)
      } catch (error) {
        this.setErrorMessage('Please add a valid image url. ex: https://example.com/image.jpg')
        return
      }

      this.batch.push(this.newTask)
      // Reset the newTask object
      this.newTask.id = this.tempCounter++
      this.newTask = this.getEmptyTask()
      // this.$nextTick(() => {
      //   this.$refs['placeholder-0'][0].focus()
      // })
    },
    getEmptyTask () {
      const emptyTask = {}
      this.campaign.placeholders.forEach((placeholder) => {
        emptyTask[placeholder] = ''
      })
      return emptyTask
    },

    async uploadBatch () {
      this.paymentLoading = true
      try {
        this.loading = true

        const content = {
          tasks: this.batch.map(el => ({ image_url: el.image_url }))
        }
        // console.log('uploading batch', content)
        const result = await this.client.force
          .createBatch(this.campaign.id, content, Number(this.repetitions), this.proxy ? this.proxy : null)
        // console.log('tx result', result)
        this.createdBatchId = await this.client.force.getBatchId(result.id, this.campaign.id)
        this.addTransaction({
          tx: result,
          batchId: this.createdBatchId
        })
        // console.log('batch created with id', this.createdBatchId)
      } catch (e) {
        this.setErrorMessage(e)
        console.error(e)
      }
      this.loading = false
      this.paymentLoading = false
    },
    async login () {
      try {
        this.generateClient()
        await this.connectMetamask()
        await this.connectEffectAccount()
      } catch (error) {
        console.error(error)
        this.setErrorMessage(error)
      }
    },
    async loginEOS () {
      this.loading = true
      try {
        this.generateClient()
        await this.connectAnchor()
        await this.connectEffectAccount()
      } catch (error) {
        console.error(error)
        this.setErrorMessage(error)
      }
      this.loading = false
    },
    /**
    * SDK Client
    * Create a new Effect SDK client.
    */
    generateClient () {
      this.loading = true
      console.log('Creating SDK...')
      try {
        this.client = new effectsdk.EffectClient('mainnet')
        console.log(this.client)
      } catch (error) {
        console.error(error)
        this.setErrorMessage(error)
      }
      this.loading = false
    },
    /**
    * EOS Anchor Wallet
    */
    async connectAnchor () {
      this.loading = true
      console.log(this.client.config)
      try {
        const transport = new AnchorLinkBrowserTransport()
        const alink = new AnchorLink({
          transport,
          chains: [
            {
              chainId: this.client.config.eosChainId,
              nodeUrl: this.client.config.eosNodeUrl
            }
          ]
        })
        // Perform the login, which returns the users identity
        const identity = await alink.login('Effect-Network-Image-Labeling')
        const { session } = identity
        const signatureProvider = session.makeSignatureProvider()
        const account = { accountName: session.auth.actor.toString(), permission: session.auth.permission.toString() }
        console.log('Logged in as', account)
        this.connectAccount.provider = signatureProvider
        this.connectAccount.account = account
        this.connectAccount.providerName = 'anchor'
      } catch (error) {
        this.setErrorMessage(error)
        console.error(error)
      }
      this.loading = false
    },
    /**
    * Metamask
    * Generate web3 instance from account with private key.
    * Could also be the web3 object with a metamask connection.
    *
    * Here we will also make a call to make sure we are on the correct chain.
    * Bsc-Mainnet: 0x38 (hex), 56 (decimal)
    * Bsc-Testnet: 0x61 (hex), 97 (decimal)
    */
    async connectMetamask () {
      this.loading = true
      console.log('Connecting to metamask wallet.')
      // @ts-ignore
      if (window.ethereum) {
        try {
          console.log('Connecting to metamask wallet.')
          // @ts-ignore
          // eslint-disable-next-line no-unused-vars
          const ethAccount = await window.ethereum.request({ method: 'eth_requestAccounts' })
          // @ts-ignore
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x38' }] // 0x38 is the chainId of bsc testnet.
          })
          // @ts-ignore
          this.connectAccount.provider = new Web3(window.ethereum)
          this.connectAccount.account = null
          this.connectAccount.providerName = 'metamask'
        } catch (error) {
          this.setErrorMessage(error)
        }
      } else {
        this.setErrorMessage('Metamask not installed')
      }
      this.loading = false
    },
    /**
    * Connect to Effect Account using burnerwallet, metamask or anchor
    */
    async connectEffectAccount () {
      this.loading = true
      console.log('Connecting to account with wallet.')
      try {
        if (this.connectAccount.provider) {
          this.connectResponse = await this.client.connectAccount(this.connectAccount.provider, this.connectAccount.account)
        } else {
          this.setErrorMessage('Login failed, try again')
          return
        }
        this.accountConnected = true
        this.account = this.connectResponse
      } catch (error) {
        this.accountConnected = false
        this.setErrorMessage('Login failed, try again')
        console.error(error)
      }
      this.loading = false
    }
  }
}
function getMatches (string, regex, index) {
  index || (index = 1) // default to the first capturing group
  const matches = []
  let match
  while ((match = regex.exec(string))) {
    matches.push(match[index])
  }
  return matches
}
</script>
