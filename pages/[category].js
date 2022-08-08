import { useEffect, useState } from "react"
import api from "./api/api"
import { useRouter } from "next/router";

export default function Home() {
    const Router = useRouter()
    const { category } = Router.query
    const [activeQuestion, setActiveQuestion] = useState({})
    const [activeNumber, setActiveNumber] = useState(1)
    const [questions, setQuestions] = useState([])
    const [score, setScore] = useState()

    useEffect(() => {
        const getCategories = async () => {
            await api.question(category)
                .then((res) => {
                    setQuestions(res.data)
                    let options = res.data[0].incorrectAnswers
                    options.push(res.data[0].correctAnswer)
                    let dataQuestion = res.data[0]
                    dataQuestion.options = [...new Set(options)]
                    setActiveQuestion(dataQuestion)
                    setActiveNumber(1)
                })
        }
        getCategories()
    }, [])

    const chooseQuestion = (number) => {
        questions.map((value, index) => {
            if (index + 1 === number) {
                let options = value.incorrectAnswers
                options.push(value.correctAnswer)
                let dataQuestion = value
                dataQuestion.options = [...new Set(options)]
                setActiveQuestion(dataQuestion)
                setActiveNumber(number)
            }
        })
    }

    const chooseAnswer = (answer) => {
        questions.map((value, index) => {
            if (index + 1 === activeNumber) {
                let dataQuestion = value
                dataQuestion.answer = answer
            }
        })
        setQuestions([...questions])
    }

    const countScore = () => {
        let totalCorrect = 0
        questions.map((value, index) => {
            if(value.answer === value.correctAnswer){
                totalCorrect = totalCorrect + 1
            }
        })
        setScore(totalCorrect*5)
    }

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <section>
                <h1 className="text-2xl md:text-3xl ">{category?.split("_").join(" ")}</h1>
            </section>
            <section >
                <div className="flex flex-col md:flex-row gap-4 mt-12 ">
                    <div className="md:w-1/3">
                        <div className="flex flex-wrap">
                            {questions.map((value, index) => (
                                <div className={`${index + 1 === activeNumber ? 'bg-blue-500 text-white' : 'bg-gray-200'} ${value.answer && 'bg-green-500 text-white'} rounded p-2 m-1 w-12 h-12 text-center cursor-pointer grow`} key={index} onClick={() => {
                                    chooseQuestion(index + 1)
                                    setActiveNumber(index + 1)
                                }}>
                                    {index + 1}
                                </div>
                            ))}
                        </div>
                        <button className="bg-green-500 text-white font-bold p-2 rounded mt-2 text-center cursor-pointer w-full" onClick={countScore} >
                            Submit
                        </button>
                    </div>
                    <div className="bg-white w-full p-4 ">
                        {activeNumber}.   {activeQuestion.question}
                        <div className="pl-6 mt-2">
                            {activeQuestion?.options?.map((value, index) => {
                                return (
                                    <button className={`${activeQuestion.answer === value ? 'bg-blue-400 text-white' : 'bg-gray-100 hover:bg-gray-300'} text-left p-2 w-full m-1 rounded  cursor-pointer`} key={index} onClick={() => chooseAnswer(value)}>
                                        {value}
                                    </button>
                                )
                            })}
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
