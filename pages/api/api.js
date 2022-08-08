import instance from './instance'

const categories = () => instance.get('/categories')
const question = (category, limit, difficult) => instance.get(`/questions?categories=${category}&limit=${limit}&difficulty=${difficult}`)

const api = {
  categories,
  question
}

export default api