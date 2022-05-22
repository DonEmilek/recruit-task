import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adding, removing } from '../saver'
import Book from './Book'
const RenderLoading = () => {
    return (
        <p>Loading...</p>
    )
}

const Home = () => {
    const [intitle, setIntitle] = useState('')
    const [dataArray, setDataArray] = useState([])
    const [canRender, setCanRender] = useState(false)
    const [renderLoading, setRenderLoading] = useState(false);
    const [renderLibrary, setRenderLibrary] = useState(false);
    const [selectLanguage, setSelectLanguage] = useState('en') // en - english ; pl - polish

    const YOUR_API_KEY = 'insert your api key' // API Key from Console Cloud Google
    // first fetch function to get 'selfLink'
    function fetchData(){
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${intitle}&key=${YOUR_API_KEY}`)
        .then(res => { 
            res.data.items.forEach(item => {

                // second fetch function to get: 'picture url', 'book's title', 'year of publication', 'description'
                axios.get(item.selfLink).then(resp => {
                    
                    const data = resp.data
                    const volumeInfo = resp.data.volumeInfo
                    //condition for avoid empty response (description and book photo)
                    if(volumeInfo.imageLinks === null || volumeInfo.description === null){
                        // condition for select language
                        if(volumeInfo.language === selectLanguage){
                            setDataArray(old => 
                                [...old, ])

                        }
                            
                    }else{
                        // condition for select language and push data to array
                        if(volumeInfo.language === selectLanguage){
                            setDataArray(old => 
                                [...old, 
                                    {
                                        
                                        id: data.id,
                                        pictureUrl: volumeInfo.imageLinks?.smallThumbnail,
                                        title: volumeInfo.title,
                                        description: volumeInfo.description,
                                        publishedDate: volumeInfo.publishedDate
                                    }
                                ])
                        }
                        
                    }
                    
                })
            })
            
        })
        // catch error when title does not exist
        .catch(err => {
            alert('No data.. Try again')
        })
    }
    // get value from input 
    function handleChange(ev){
        setIntitle(ev.target.value)
    }
    // function which invoke get request after entered title and confirmed by enter or 'find' button
    function handleFind(){
        setRenderLoading(true); // word 'loading...' activated for info
        setDataArray([]) // set book array to empty for new request
        setTimeout(function(){ 
            setRenderLoading(false) // close 'loading...' word
            fetchData() // fetching data
            setCanRender(true); // activate books field
            setRenderLibrary(true); // acticate library 
        },300)
    }

    // mapping items from api and rendering 
    const renderBooks = dataArray.map(item =>{ 
        let description = item.description
        let year = item.publishedDate
    
        return (
            <Book
            key={item.id}
            imgUrl={item.pictureUrl}
            title={item.title}
            description={description?.length > 200 ? description.substring(0,200).concat('... <i>text abbreviated</i>') : description}
            publishedDate={year?.substring(0,4)}
            isDisabled={false}
            onClickMet={()=>dispatch(adding(item.title))}
            />
        )
    
    
    })
    // redux for add target book to library
    const count = useSelector((state) => state.saver.items)
    const dispatch = useDispatch()

  return (
    <div className='block relative'>
        <h2 className='text-center text-3xl'>Select a language:</h2>
        <div className="flex justify-around m-auto text-xl p-5 w-1/4">
            {/* below buttons to select language for get book in this language (pl / en) */}
            <button className='border-2 p-5 bg-blue-300' onClick={()=>setSelectLanguage('pl')}>Polish</button>
            <button className='border-2 p-5 bg-green-300' onClick={()=>setSelectLanguage('en')}>English</button>
        </div>
            <p className='text-center font-bold text-xl p-10'>Selected: {selectLanguage}</p>
        <div className='text-xl absolute'>
        <details className='block select-none max-w-[400px]'>
              <summary className='cursor-pointer mt-10 text-4xl'>Library: (click to show)</summary>
              <div className="mt-10"> 
              {/* below: render library section */}
                {renderLibrary && count.map((item, key) => {
                    return (
                        <div key={key}>
                            <div className='pt-5'>
                                <p className='italic'>{item}</p>
                                {/* below: button which remove target book from library */}
                                <button 
                                className='cursor-pointer'
                                onClick={()=>{
                                    dispatch(removing(item));
                                    setRenderLibrary(false)
                                    setRenderLibrary(true)
                                }}
                                key={key}>
                                    <p className='font-bold border-2 bg-red-400'>Remove from Library</p>
                                    </button>
                            </div>
                            </div>
                    )
                })}
            </div>
        </details>
      </div>
      {/* below: find section with input and button */}
        <div className='grid w-1/2 m-auto bg-slate-400 text-center'>
            <label htmlFor="textarea" className='text-2xl'>Search book by title:</label>
            <input type="text" className='bg-gray-100 border-2 text-xl text-center' name="textarea"
                    onKeyDown={(e)=>{
                    if(e.key==='Enter') {
                        handleFind()
                    }
                    }} 
                    onClick={(e)=>e.target.value=''}
                onChange={handleChange}/>
            <button onClick={handleFind}>Find</button>
        </div>
        <div className='block w-3/5 m-auto'>
            {/* render books section */}
        {renderLoading && <RenderLoading/>}
        {canRender && renderBooks}
        </div>
        
    </div>
  )
}

export default Home