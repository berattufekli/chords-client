import React from 'react'
import ToneValues from './ToneValues';

function Tones({ tone, setTone }) {

  return (
    <div className='flex flex-wrap space-x-1 ml-2'>
      {
        ToneValues.map((item, key) => {
          if (item.key === tone.key) {
            return <button key={key} className="rounded-md w-8 h-8 my-2 bg-indigo-600 transition-all  text-sm font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => setTone(item)}>
              {item.name}
            </button>
          }
          else {
            return <button key={key} className="rounded-md w-8 h-8 my-2 bg-gray-300 transition-all  text-sm font-bold text-gray-600 shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => setTone(item)}>
              {item.name}
            </button>
          }
        })
      }

      {
        tone.key === "Easy_tone" ? <button className="rounded-md my-2 px-1 h-8 bg-indigo-600 transition-all  text-sm font-bold text-white shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => setTone({ name: "Kolay Akor", key: "Easy_tone" })}>
          Kolay Akor
        </button> : <button className="rounded-md my-2 px-1 h-8 bg-gray-300 transition-all  text-sm font-bold text-gray-600 shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => setTone({ name: "Kolay Akor", key: "Easy_tone" })}>
          Kolay Akor
        </button>
      }
    </div >
  )
}

export default Tones