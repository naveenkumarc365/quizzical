import { useState, useEffect } from 'react'
import Question from './components/Question'
import { InfinitySpin } from  'react-loader-spinner'

function App() {
  const [formData, setFormData] = useState({})
  const [count, setCount] = useState(0)
  const [start, setStart] = useState(false)
  const [resetForm, setResetForm] = useState(false)

  useEffect(() => {
    setFormData({})
    setCount(0)
    fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple')
      .then(res => res.json())
      .then(data => {
        data.results.forEach((res,i) => {
          setFormData(prevState => {
            return {
              ...prevState,
              [data.results[i].question]: {
                answer: data.results[i].correct_answer,
                options: [...data.results[i].incorrect_answers, data.results[i].correct_answer].sort(() => Math.random() - 0.5)
              }
            }
          })
        })
      })
  }, [resetForm])

  const handleChange = (event) => {
    setFormData(prevState => {
      return {
        ...prevState,
        [event.target.name]: {
          ...prevState[event.target.name],
          checked: event.target.value
        }
      }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Read the form data
    const form = event.target;
    const formDatas = new FormData(form);
    const formJson = Object.fromEntries(formDatas.entries());

    Object.keys(formJson).forEach((key,i) => {
      (formJson[key] === formData[key].answer) && setCount(count => count+=1)
      setFormData(prevState => {
        return {
          ...prevState,
          [key]: {
            ...prevState[key],
            selectedOption: prevState[key].checked,
            checked: prevState[key].answer,
            isCorrect: prevState[key].answer === formJson[key],
            formSubmitted: true
          }
        }
      })
    })
  }
  

  return (
    <main>
      {/* <div className='flex items-center justify-center min-h-screen'>
        <InfinitySpin 
          width='200'
          color="#94D7A2"
        />
      </div> */}
      {
        start ?
        <form onSubmit={handleSubmit} className='mt-10'>
        {Object.keys(formData).map((key, i) => (
          <Question 
            key={i}
            question={key}
            options={formData[key].options}
            checked={formData[key]?.checked}
            isCorrect={formData[key]?.isCorrect}
            selectedOption={formData[key]?.selectedOption}
            isFormSubmitted={Object.values(formData)[0]?.formSubmitted}
            handleChange={handleChange}
          />
        ))}

        {Object.values(formData)[0]?.formSubmitted ? 
        <div className='flex items-center justify-evenly'>
          <p className='font-bold text-center'>You scored {count}/{Object.keys(formData).length} correct answers</p>
          <button type='reset' onClick={() => setResetForm(!resetForm)}  className='block my-3 bg-[#4D5B9E] whitespace-nowrap'>Play again</button>
        </div> :
        <button className='block mx-auto my-5'>Check answers</button>}
        
        </form> :
        <div className='flex flex-col items-center justify-center min-h-screen'>
          <h1 className='text-3xl font-bold'>Quizzical</h1>
          <p className='mt-2 mb-7 text-center'>A straightforward quiz application for testing knowledge and learning.</p>
          <button onClick={() => setStart(true)}>Start quiz</button>
        </div>
      }
    </main>
  )
}

export default App
