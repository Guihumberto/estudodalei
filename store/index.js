export const strict = false

export const state = () => ({
    lawsList: [],
    textLaw: [],
    otherTextLaw: [],
    nameLaw: [],
    nameOtherLaw: [],
    sumulas: []
})

export const getters = {
    readLawsList(state){
        return state.lawsList
    },
    readTextLaw(state){
        return state.textLaw
    },
    readOtherTextLaw(state){
        return state.otherTextLaw
    },
    readNameLaw(state){
        return state.nameLaw
    },
    readNameOtherLaw(state){
        return state.nameOtherLaw
    },
    readSumulas(state){
        return state.sumulas
    },
}

export const mutations = {
    setCreateLaw(state, payload) {
        state.lawsList.push(payload)
    },
    setCreateTextLaw(state, payload) {
        state.textLaw.push(payload)
    },
    setLawsList(state, payload){
        state.lawsList = payload
    },
    setNameLaw (state, payload){
        state.nameLaw = payload
    },
    setNameOtherLaw (state, payload){
        state.nameOtherLaw = payload
    },
    setTextLaw(state, payload){
        let newText = []
        const text = Array.from(payload)
         text.forEach(i =>{
            i.show = false
            newText.push(i)
        })
        state.textLaw = newText
    },
    setOtherTextLaw(state, payload){
        state.otherTextLaw = payload
    },
    setSumulas(state, payload){
        state.sumulas = payload
    },
}

export const actions = {
    async cargaAPI({ commit }){
        if (localStorage.getItem('usuario')) {
            commit('setUser', JSON.parse(localStorage.getItem('usuario')))
          } else {
            commit('setUser', null)
          }
        try {
            const res = await fetch('https://cotec-api-default-rtdb.firebaseio.com/projects.json')
            const dataDB = await res.json()
            const arrayProjects = []

            for (let id in dataDB){
                arrayProjects.push(dataDB[id])
            }
            commit('load', arrayProjects)     
        } catch (error) {
            console.log(error)
        }
    },
    async cargaLawList({ commit }){
        try {
            const res = await fetch('https://leges-estudo-default-rtdb.firebaseio.com/laws.json')
            const dataDB = await res.json()
            const lawsList = []

            for (let id in dataDB){
                lawsList.push(dataDB[id])
            }
            commit('setLawsList', lawsList)     
        } catch (error) {
            console.log(error)
        }
    },
    async setLaw({ commit }, law) {
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/laws/${law.id}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(law)
            })

            const dataDB = await res.json()
            commit('setCreateLaw', law)
        } catch(error){
            console.log(error)
        } 
    },
    async setTextLaw({ commit }, lawText) {
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/textLaws/${lawText[0]}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(lawText[1])
            })

            const dataDB = await res.json()
            // commit('setCreateTextLaw', lawText[1])
        } catch(error){
            console.log(error)
        } 
    },
    async cargaNameLaw({ commit }, id){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/laws/${id}.json`)
            const dataDB = await res.json()
            const textLaw = []

            for (let id in dataDB){
                textLaw.push(dataDB[id])
            }
            commit('setNameLaw', textLaw)     
        } catch (error) {
            console.log(error)
        }
    },
    async cargaNameOtherLaw({ commit }, id){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/laws/${id}.json`)
            const dataDB = await res.json()
            const textLaw = []

            for (let id in dataDB){
                textLaw.push(dataDB[id])
            }
            commit('setNameOtherLaw', textLaw)    
        } catch (error) {
            console.log(error)
        }
    },
    async cargaTextLaw({ commit }, id){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/textLaws/${id}.json`)
            const dataDB = await res.json()
            const textLaw = []

            for (let id in dataDB){
                textLaw.push(dataDB[id])
            }
            commit('setTextLaw', textLaw)     
        } catch (error) {
            console.log(error)
        }
    },
    async cargaOtherTextLaw({ commit }, id){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/textLaws/${id}.json`)
            const dataDB = await res.json()
            const textLaw = []

            for (let id in dataDB){
                textLaw.push(dataDB[id])
            }
            commit('setOtherTextLaw', textLaw)     
        } catch (error) {
            console.log(error)
        }
    },
    async setSumula({ commit }, sumulas){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/sumulas/${sumulas.id}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sumulas)
            })

            const dataDB = await res.json()
            // commit('setCreateTextLaw', lawText[1])
        } catch(error){
            console.log(error)
        } 
    },
    async cargaSumula({ commit }){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/sumulas.json`)
            const dataDB = await res.json()
            const sumulas = []

            for (let id in dataDB){
                sumulas.push(dataDB[id])
            }
            commit('setSumulas', sumulas)     
        } catch (error) {
            console.log(error)
        }
    },
    async saveSumulaDispositivo({ commit }, dipositivo){
   
        console.log(`https://leges-estudo-default-rtdb.firebaseio.com/textLaws/${dipositivo[0]}/${dipositivo[1]}.json`);
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/textLaws/${dipositivo[0]}/${dipositivo[1]}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dipositivo[2])
            })

            const dataDB = await res.json()
        } catch(error){
            console.log(error)
        } 
    },
    async sendMsgFB({ commit }, mail){
        try {
            const res = await fetch(`https://leges-estudo-default-rtdb.firebaseio.com/msg/${mail.id}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(mail)
            })

            const dataDB = await res.json()
            // commit('setCreateTextLaw', lawText[1])
        } catch(error){
            console.log(error)
        } 
    },
}