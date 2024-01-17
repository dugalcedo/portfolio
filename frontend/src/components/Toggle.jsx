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

export default function Toggle({options}) {
  return (
    <div className="toggle">
        {options.choices.map((choice) => {
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