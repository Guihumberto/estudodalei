export const state = () => ({
    snackbars:[]
})

export const getters = {
    readSnackbars(state){
        return state.snackbars
    }
}

export const mutations = {
    setSnackbars(state, payload){
        state.snackbars = state.snackbars.concat(payload)
    }
}

export const actions = {
    setSnackbars({commit}, payload){
        payload.showing = true
        payload.timeout = payload.timeout || 1500
        payload.color = payload.color || 'info'
        commit('setSnackbars', payload)
    }
}