import { useEffect, useState } from "react"
import Link from "next/link"
import api from "./api/api"
import { useRouter } from "next/router";

export default function Home() {
    const Router = useRouter()
    const { category } = Router.query
    const [activeQuestion, setActiveQuestion] = useState({

    })
    const [activeNumber, setActiveNumber] = useState(1)
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        const getCategories = async () => {
            await api.question(category)
                .then((res) => {
                    setQuestions(res.data)
                    setActiveQuestion(res.data[0])
                    console.log(res.data)
                })
        }
        getCategories()
    }, [])

    const chooseQuestion = (number) => {
        console.log(number)
        questions.map((value, index) => {
            if (index + 1 === number) {
                setActiveQuestion(value)
                setActiveNumber(number)
            }
        })
    }

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <section>
                <h1 className="text-2xl md:text-3xl ">{category?.split("_").join(" ")}</h1>
            </section>
            <section >
                <div className="flex flex-col md:flex-row gap-4 mt-12 ">
                    <div className="flex md:w-1/3 flex-wrap">
                        {questions.map((value, index) => (
                            <div className={`${index + 1 === activeNumber ? 'bg-blue-500' : 'bg-gray-200 hover:bg-gray-300'} rounded p-2 m-1 w-12 h-12 text-center cursor-pointer`} key={index} onClick={() => {
                                chooseQuestion(index + 1)
                                setActiveNumber(index + 1)
                            }}>
                                {index + 1}
                            </div>
                        ))}
                    </div>
                    <div className="bg-white w-full p-4 ">
                        {activeQuestion.question}
                        <div>
                            {activeQuestion?.incorrectAnswers?.map((value, index) => {
                                return (
                                    <div className="bg-gray-100 p-2 w-full m-1 rounded hover:bg-gray-300 cursor-pointer" key={index}>
                                        {value}
                                    </div>
                                )
                            })}
                            <div className="bg-gray-100 p-2 w-full m-1 rounded hover:bg-gray-300 cursor-pointer">
                                {activeQuestion?.correctAnswer}
                            </div>
                        </div>
                        <div className="mt-8 flex justify-between">
                            <button className={`${activeNumber === 1 ? 'bg-gray-400 cursor-default' : 'bg-blue-500'} p-2 rounded text-white`} onClick={() => activeNumber !== 1 && chooseQuestion(activeNumber - 1)}>Previous</button>
                            <button className={`${activeNumber === questions.length ? 'bg-gray-400 cursor-default' : 'bg-blue-500'} bg-blue-500 p-2 rounded text-white`} onClick={() => activeNumber !== questions.length && chooseQuestion(activeNumber + 1)}>Next</button>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}
