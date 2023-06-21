export const state = () => ({
    disciplinas: [
        {name: 'D. Constitucional', sigla: 'DC'},
        {name: 'D. Tributário', sigla: 'DT'},
        {name: 'D. Administrativo', sigla: 'DA'},
        {name: 'D. Previdenciário', sigla: 'PREV'},
        {name: 'D. Empresarial', sigla: 'DE'},
        {name: 'D. Civil', sigla: 'CC'},
        {name: 'D. Penal', sigla: 'DP'},
      ],
})

export const getters = {
    readDisciplinas(state){
        return state.disciplinas
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