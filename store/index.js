export const state = () => ({
    sidebar: false,
    userFirstName: null,
    userLastName: null,
    auth: null
  })
  
  export const mutations = {
    setSideBar (state, data) {
        state.sidebar = data
    }
  }