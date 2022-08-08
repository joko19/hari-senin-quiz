import instance from './instance'

const categories = () => instance.get('/categories')

const api = {
  categories
}

export default api