import { useEffect, useState } from "react"
import api from "./api/api"
import Link from "next/link"
import Image from "next/image"

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
    <div className="p-4 bg-gray-100 min-h-screen">
      <section>
        <h1 className="text-2xl md:text-3xl ">Welcome</h1>
        <p>Choose Category to start Quiz</p>
      </section>
      <section>
        <div className="flex flex-wrap">
          {categories.map((value, index) => (
            <Link href={`${value[0].split(" ").join("_").replace("&", "and").toLowerCase()}`} key={index}>
              <a>
                <div className="grow w-64" >
                  <div className="bg-black rounded-lg m-1 drop-shadow-xl cursor-pointer relative grow h-48  hover:font-bold hover:bg-gray-900">
                    <Image src={`/images/${value[0]}.png`} layout="fill" className="w-full  object-cover opacity-40 rounded-lg drop-shadow-xl" alt={value[0]} />
                    <h1 className="text-2xl absolute bottom-2 left-2 text-white"> {value[0]}</h1>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
