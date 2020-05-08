import Vue from 'vue'
import VueRouter from 'vue-router'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'
import App from './App.vue'
import { routes } from './routes'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueApollo)

const apolloClient = new ApolloClient({
    // You should use an absolute URL here
    uri: 'http://localhost:8000/graphql',
})

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})

const router = new VueRouter({
    routes,
})

new Vue({
    render: (h) => h(App),
    router,
    apolloProvider,
}).$mount('#app')
