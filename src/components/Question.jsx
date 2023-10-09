import { useEffect } from "react"

export default function Question(props) {
    // console.log(props)

    return (
        <fieldset className="block pb-4 mb-3 border-b border-solid border-[#DBDEF0]">
            <legend className="font-bold inline-block mb-3" dangerouslySetInnerHTML={{ __html: props.question }}></legend>
            <div className="options flex gap-3 flex-wrap relative">
                {props.options.map((option, i) => (
                    <span className="option" key={i}>
                        <input 
                            type="radio" 
                            name={props.question}
                            id={`${option.toLowerCase()}-${i}`} 
                            value={option}
                            checked={props.checked === option}
                            onChange={(event) => props.handleChange(event)}
                            className={(!props.isCorrect && (props.selectedOption === option)) ? 'incorrect peer opacity-0 pointer-events-none absolute bottom-0 left-0' : 'peer opacity-0 pointer-events-none absolute bottom-0 left-0'}
                            disabled={props.isFormSubmitted}
                            required
                        />
                        <label className="text-xs font-medium inline-block px-2 py-1 min-w-[4rem] text-center rounded-lg border border-solid border-[#191B1A] cursor-pointer transition hover:bg-[#D6DBF5] hover:border-[#D6DBF5] peer-checked:bg-[#D6DBF5] peer-checked:border-[#D6DBF5] peer-disabled:opacity-50 peer-disabled:cursor-default peer-disabled:pointer-events-none peer-[.incorrect]:bg-[#F8BCBC] peer-[.incorrect]:border-[#F8BCBC] peer-disabled:peer-checked:bg-[#94D7A2] peer-disabled:peer-checked:border-[#94D7A2] peer-disabled:peer-checked:opacity-100" htmlFor={`${option.toLowerCase()}-${i}`} dangerouslySetInnerHTML={{ __html: option }}></label>
                    </span>
                ))}
            </div>
        </fieldset>
    )
}