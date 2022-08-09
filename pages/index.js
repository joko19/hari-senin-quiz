import Link from "next/link"
import Head from "next/head"

export default function Home({categories}) {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <Head>
        <title>Quiz App</title>
      </Head>
      <section>
        <h1 className="text-2xl md:text-3xl ">Welcome</h1>
        <p>Choose Category to start Quiz</p>
      </section>
      <section>
        <div className="grid md:grid-cols-4 justify-items-stretch ">
          {categories?.map((value, index) => (
            <Link href={`${value[0].split(" ").join("_").replace("&", "and").toLowerCase()}`} key={index}>
              <a>
                <div className="" >
                  <div className="bg-black rounded-lg m-1 drop-shadow-xl cursor-pointer relative hover:font-bold hover:bg-gray-900">
                    <img src={`/images/${value[0]}.png`} className="h-48 w-full object-cover opacity-40 rounded-lg drop-shadow-xl" alt={value[0]} />
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

// This gets called on every request
export async function getServerSideProps() {
  const res = await fetch(`https://the-trivia-api.com/api/categories`)
  const data = await res.json()
  const categories = Object.entries(data)
  return { props: { categories } }
}
