import { useEffect, useState } from "react"
import api from "./api/api"

export default function Home() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      await api.categories()
        .then((res) => {
          var arr = Object.entries(res.data)
          setCategories(arr)
        })
    }
    getCategories()
  }, [])

  return (
    <div className="p-4">
      <div className="flex flex-wrap">
        {categories.map((value, index) => (
          <div className="grow w-64" key={index}>
            <div className="bg-black rounded-lg m-1 drop-shadow-xl cursor-pointer relative grow  hover:font-bold hover:bg-gray-900">
              <img src={`/images/${value[0]}.png`} className="w-full h-48 object-cover opacity-40 rounded-lg drop-shadow-xl" />
              <h1 className="text-2xl absolute bottom-2 left-2 text-white"> {value[0]}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
