<template>
  <div class="section pt-6">
    <div class="columns">
      <div class="column is-three-fifths is-offset-one-fifth">
        <!-- Create your batch of tasks -->
        <div v-if="step === 1" id="step-1">
          <h2 class="title">
            Add tasks
          </h2>
          <div class="field">
            <div class="box">
              <div style="background: #fff; border-radius: 8px" class="p-2">
                <table v-if="campaign && campaign.placeholders" class="table mx-auto">
                  <thead>
                    <tr>
                      <th v-for="placeholder in campaign.placeholders" :key="placeholder" class="task-placeholder-value has-text-left">
                        {{ placeholder }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(task, index) in batch" :key="task.id">
                      <td v-for="placeholder in campaign.placeholders" :key="placeholder" class="task-placeholder-value has-text-left">
                        <span>{{ batch[index] }}</span>
                      </td>
                      <td>
                        <button class="button is-danger is-outlined is-small is-rounded" @click.prevent="batch.splice(index, 1)">
                          X
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td v-for="(placeholder, placeindex) in campaign.placeholders" :key="placeholder" class="task-placeholder-value">
                        <input
                          :ref="`placeholder-${placeindex}`"
                          v-model="newTask[placeholder]"
                          type="url"
                          pattern="https?://.+"
                          class="input is-info task-placeholder-value"
                          :placeholder="placeholder"
                          required
                          @keydown.enter.prevent="createTask"
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="control has-text-centered mt-5">
                <button class="button is-primary is-wide" @click.prevent="createTask">
                  Add Task
                </button>
              </div>
            </div>
            <div class="box is-centered">
              <div v-if="campaign && campaign.info" class=" is-6 py-0 px-2 batch-info">
                <div class="box">
                  <span>
                    Amount:
                  </span>
                  <span>
                    <strong>{{ repetitions }}</strong>
                  </span>
                  <input
                    v-model="repetitions"
                    class="slider is-fullwidth is-info"
                    step="1"
                    min="1"
                    max="20"
                    type="range"
                  >
                  Total Cost
                  <strong>{{ parseFloat(campaign.info.reward * batch.length * repetitions).toFixed(4) }} EFX</strong>
                </div>
              </div>
              <!-- </div> -->
            </div>
          </div>

          <form>
            <div class="field is-grouped is-justify-content-center mt-6">
              <div class="control">
                <button type="submit" :class="{'is-loading': loading}" class="button button is-primary is-wide mr-4" :disabled="!batch.length" @click="nextStep">
                  Next step
                </button>
              </div>
            </div>
          </form>
        </div>

        <!-- Tasks overview & wallet login -->
        <div v-if="step === 2">
          <h2 v-if="!accountConnected" class="title">
            Connect your wallet
          </h2>
          <h2 v-else class="title">
            Submit to Effect Network
          </h2>

          <div v-if="accountConnected" class="box media">
            <figure class="media-left">
              <p class="image is-128x128">
                <img v-if="connectAccount.providerName === 'metamask'" src="@/assets/images/providers/BSC-logo.svg" alt="" srcset="">
                <img v-else src="@/assets/images/providers/EOS-logo.svg" alt="" srcset="">
              </p>
            </figure>

            <div class="media-content">
              <div class="content">
                <p class="subtitle">
                  Connected
                </p>
                <p>
                  <strong>{{ connectResponse.accountName }}</strong>
                </p>
                <hr>
                <p class="subtitle">
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
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          <div v-if="!accountConnected" id="connect-buttons" class="buttons px-6">
            <button id="btn-login" class="button is-large is-fullwidth is-light  px-6 mx-6" @click="login()">
              <span class="icon">
                <img src="@/assets/images/providers/BSC-logo.svg" alt="" srcset="">
              </span>
              <span>Connect with BSC</span>
            </button>
            <button id="btn-login-eos" class="button is-large is-fullwidth is-light  px-6 mx-6" @click="loginEOS()">
              <span class="icon">
                <img src="@/assets/images/providers/EOS-logo.svg" alt="" srcset="">
              </span>
              <span>Connect with EOS</span>
            </button>
          </div>

          <div v-if="accountConnected && !createdBatchId">
            <p v-if="paymentLoading" class="notification is-warning">
              Please be patient when posting...it can take up to a minute for transaction to complete.
              <br>
              Also note that you will need to sign multiple transactions if you are using Metamask.
            </p>
            <form @submit.prevent="uploadBatch">
              <div class="field is-grouped is-justify-content-center mt-6">
                <div class="control">
                  <button class="button is-outlined is-primary is-wide" @click="previousStep">
                    Back
                  </button>
                  <button type="submit" :class="{'is-loading': loading}" class="button button is-primary is-wide mr-4">
                    Post tasks
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div v-if="createdBatchId" class="notification is-success">
            <p class="mx-6 px-6 has-text-centered">
              <strong>Success!</strong><br>
              Your order has been successfuly posted to
              <a v-if="env === 'mainnet'" :href="`https://app.effect.network/campaigns/${campaign.id}/${createdBatchId}`" target="_blank" rel="noopener noreferrer">Effect Force</a>
              <a v-else :href="`https://app.effect.network/campaigns/${campaign.id}/${createdBatchId}`" target="_blank" rel="noopener noreferrer">Effect Force</a>
              <br>
            </p><hr>
            <div class="buttons is-centered">
              <a :href="'/batch/' + createdBatchId" class="mx-6 px-6 button is-centered " target="" rel="noopener noreferrer">
                Go to results
              </a>
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

export default {
  name: 'Create',
  data () {
    return {
      campaignId: 27, // USE OWN CAMPAIGN ID HERE
      env: 'mainnet',
      proxy: null, // optional use proxy
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
      try {
        this.effectsdk = new effectsdk.EffectClient(this.env)
        this.campaign = await this.effectsdk.force.getCampaign(this.campaignId)
        if (this.campaign) {
          this.campaign.placeholders = this.getPlaceholders(this.campaign.info.template)
        }
        console.log('this.campaign', this.campaign)
      } catch (error) {
        this.setErrorMessage(error)
        console.error(error)
      }
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
      this.batch.push(this.newTask)
      // Reset the newTask object
      this.newTask.id = this.tempCounter++
      this.newTask = this.getEmptyTask()
      this.$nextTick(() => {
        this.$refs['placeholder-0'][0].focus()
      })
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
          tasks: this.batch.map(el => ({ place_holder: el.place_holder }))
        }
        await console.log('uploading batch', content)
        const result = await this.client.force
          .createBatch(this.campaign.id, content, Number(this.repetitions), this.proxy ? this.proxy : null)
        console.log('tx result', result)
        this.createdBatchId = await this.client.force.getBatchId(result.id, this.campaign.id)
        console.log('batch created with id', this.createdBatchId)
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
      try {
        this.generateClient()
        await this.connectAnchor()
        await this.connectEffectAccount()
      } catch (error) {
        console.error(error)
        this.setErrorMessage(error)
      }
    },
    /**
    * SDK Client
    * Create a new Effect SDK client.
    */
    generateClient () {
      console.log('Creating SDK...')
      try {
        this.client = new effectsdk.EffectClient(this.env)
        console.log(this.client)
      } catch (error) {
        console.error(error)
        this.setErrorMessage(error)
      }
    },
    /**
    * EOS Anchor Wallet
    */
    async connectAnchor () {
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
        const identity = await alink.login('hackathon-boilerplate')
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
    },
    /**
    * Connect to Effect Account using burnerwallet, metamask or anchor
    */
    async connectEffectAccount () {
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
