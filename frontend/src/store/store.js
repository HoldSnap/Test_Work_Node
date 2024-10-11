import { createStore } from 'vuex'
import articles from './articles'
import comments from './comments'

const store = createStore({
  modules: {
    articles,
    comments
  }
})

export default store
