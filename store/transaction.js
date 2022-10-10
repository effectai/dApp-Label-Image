export default {
  namespaced: true,
  modules: {},
  mutations: {
    ADD_TRANSACTION (state, transaction) {
      if (state.transactions.list === null || state.transactions.list === undefined) {
        state.transactions = {}
        state.transactions.list = []
      }
      if (transaction) {
        state.transactions.list.push(transaction)
      }
    },
    REMOVE_TRANSACTION (state, transaction) {
      if (state.transactions.list) {
        state.transactions.list.splice(state.transactions.list.indexOf(transaction), 1)
      }
    }
  },
  getters: {
    transactionById (state) {
      return id => state.transactions ? state.transactions.find(c => c.id === id) : null
    },
    allTransactions (state) {
      return state.transactions ? state.transactions.list : []
    },
    transactionsIsEmpty (state) {
      return state.transactions?.list ? state.transactions?.list.length === 0 : true
    }

  },
  actions: {
    addTransaction ({ commit }, transaction) {
      if (transaction) {
        commit('ADD_TRANSACTION', transaction)
      }
    },
    removeTransaction ({ commit }, transaction) {
      if (transaction) {
        commit('REMOVE_TRANSACTION', transaction)
      }
    }
  },
  state: () => {
    return {
      transactions: {}
    }
  }
}
