import React from 'react'
import '../App.css'
// book component
const Book = (props) => {
  return (
      <div key={props.id} className="flex m-10 text-3xl">
          <img src={props.imgUrl} className="w-auto h-auto" alt='picnotav'/>
          <div>
          <button onClick={props.onClickMet} className='border-2 p-2'>Add to library</button>
            <div className='flex justify-between min-w-[500px]'>
              <h2 className='text-5xl'>{props.title}</h2>
              <h5>Published: {props.publishedDate}</h5>       
            </div>
              <h3 dangerouslySetInnerHTML={{__html: props.description}}></h3> 
          </div>
      </div>
  )
}
export default Book