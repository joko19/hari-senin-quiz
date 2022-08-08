import instance from './instance'

const categories = () => instance.get('/categories')
const question = (category) => instance.get(`/questions?categories=${category}&limit=20`)

const api = {
  categories,
  question
}

export default api