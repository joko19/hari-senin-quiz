import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import Link from "next/link";
import data from './api/score.json'
import CountdownTimer from "../components/Timer/countDownTimer";
import Head from "next/head";

export default function Home({dataQuestions}) {
    const Router = useRouter()
    const { category } = Router.query
    const [activeQuestion, setActiveQuestion] = useState({})
    const [activeNumber, setActiveNumber] = useState(1)
    const [questions, setQuestions] = useState([])
    const [confirmation, setConfirmation] = useState(false)
    const [resultModal, setResultModal] = useState(false)
    const [listScore, setListScore] = useState([])

    const five_minutes = 5 * 60 * 1000;
    const now = new Date().getTime();
    const deadline = now + five_minutes;

    useEffect(() => {
        setQuestions(dataQuestions)
        let options = dataQuestions[0].incorrectAnswers
        options.push(dataQuestions[0].correctAnswer)
        let dataQuestion = dataQuestions[0]
        dataQuestion.options = [...new Set(options)]
        setActiveQuestion(dataQuestion)
        setActiveNumber(1)
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

    const submit = () => {
        let totalCorrect = 0
        questions.map((value, index) => {
            if (value.answer === value.correctAnswer) {
                totalCorrect = totalCorrect + 1
            }
        })
        setConfirmation(false)
        setResultModal(true)
        let rank = []
        rank.push(...data.score)
        rank.push({ name: 'User', score: totalCorrect * 5 })
        rank.sort((a, b) => parseFloat(b.score) - parseFloat(a.score))
        setListScore(rank)
    }

    const handleOnBackDropClick = (e) => {
        if (e.target.id === "backdrop") setConfirmation(false);
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <Head>
                <title>{category?.split("_").join(" ")}</title>
            </Head>
            <section>
                <h1 className="text-2xl md:text-3xl ">{category?.split("_").join(" ")}</h1>
            </section>
            <section >
                <div className="flex flex-col md:flex-row gap-4 md:mt-12 ">
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
                        <CountdownTimer deadline={deadline} expired={submit} />
                        <button className="bg-green-500 text-white font-bold p-2 rounded mt-2 text-center cursor-pointer w-full" onClick={() => setConfirmation(true)} >
                            Submit
                        </button>
                    </div>
                    <div className="bg-white w-full p-4">
                        {activeNumber}.   {activeQuestion.question}
                        <div className="pl-4 mt-2">
                            {activeQuestion?.options?.map((value, index) => {
                                const abcd = ['A', 'B', 'C', 'D']
                                return (
                                    <button className={`${activeQuestion.answer === value ? 'bg-blue-400 text-white' : 'bg-gray-100 hover:bg-gray-300'} text-left p-2 w-full m-1 rounded  cursor-pointer`} key={index} onClick={() => chooseAnswer(value)}>
                                        {abcd[index]}.   {value}
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

            {confirmation && (
                <div
                    id="backdrop"
                    onClick={handleOnBackDropClick}
                    className="bg-black bg-opacity-50  fixed inset-0 flex items-center justify-center"
                >
                    <div className="bg-white w-96 p-5 rounded">
                        <h1 className="font-bold text-2xl text-blue-500">
                            Confirmation
                        </h1>
                        <p className="my-4 text-gray-700">Are you sure to Submit your Quiz?</p>
                        <div className='flex flex-row-reverse gap-4 mt-4'>
                            <button className='bg-blue-500 p-2 text-white rounded cursor-pointer hover:bg-blue-600' onClick={submit}>
                                Submit
                            </button>
                            <div className='p-2 rounded cursor-pointer text-gray-700 bg-gray-200 hover:bg-gray-300' onClick={() => setConfirmation(false)}>
                                Cancel
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {resultModal && (
                <div
                    id="backdropResult"
                    className="bg-black bg-opacity-50  fixed inset-0 flex items-center justify-center"
                >
                    <div className="bg-white w-96 p-5 rounded">
                        <h1 className="font-bold text-2xl text-blue-500">
                            Result
                        </h1>
                        <div className='overflow-auto'>
                            <table className="table md:min-w-full overflow-auto divide-y divide-gray-200 text-sm">
                                <thead className="text-gray-500" >

                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {listScore.map((item, index) => (
                                        <tr key={index} className="h-12 hover:bg-gray-100">
                                            <td className="px-4 h-12 whitespace-nowrap text-center">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 h-12 whitespace-nowrap text-center">
                                                {item.name}
                                            </td>
                                            <td className="px-4 h-12 whitespace-nowrap text-center">
                                                {item.score}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table >
                        </div>
                        <div className='flex flex-row-reverse gap-4 mt-4'>
                            <Link href="/">
                                <a className="bg-blue-500 p-2 text-white rounded cursor-pointer hover:bg-blue-600">
                                    Back to Home
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

        </div >
    )
}

// This gets called on every request
export async function getServerSideProps(context) {
    const category = context.params.category
    const res = await fetch(`https://the-trivia-api.com/api//questions?categories=${category}&limit=20`)
    const dataQuestions = await res.json()
    return { props: { dataQuestions } }
  }
  