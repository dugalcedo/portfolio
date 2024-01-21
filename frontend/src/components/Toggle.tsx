/*
    Toggle options
    {
        state,
        $state,
        choices: [
            {
                text: 'Celsius',
                value: 'C'
            }
        ]
    }
*/

interface ToggleChoice {
    text: string
    value: string
}

interface ToggleOptions {
    state: any
    $state: (x: any) => {}
    choices: ToggleChoice[]
}

export default function Toggle({options}: {options: ToggleOptions}) {
  return (
    <div className="toggle">
        {options.choices.map((choice: ToggleChoice) => {
            let className = 'choice'
            if (options.state == choice.value) {
                className += ' active'
            }
            return (
                <button 
                    key={choice.value} 
                    className={className}
                    onClick={()=>{
                        options.$state(choice.value)
                    }}
                >
                    {choice.text || choice.value}
                </button>
            )
        })}
    </div>
  )
}