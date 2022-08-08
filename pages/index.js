import { useEffect } from "react"
import api from "./api/api"

export default function Home() {
  console.log("hello world")
  useEffect(() => {
    console.log("useeffect")
    const getCategories = async () => {
      await api.categories()
      .then((res) => console.log(res.data))
    }
    getCategories()
  }, [])

  return (
    <h1 className="text-3xl font-bold text-center">
      Hello world!
    </h1>
  )
}
