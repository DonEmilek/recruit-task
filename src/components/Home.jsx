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

    // first fetch function to get 'selfLink'
    function fetchData(){
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${intitle}&key=AIzaSyCj0T2KS4Xd-ZvlNPDoktu95JC039naCnU`)
        .then(res => { 
            res.data.items.forEach(item => {

                // second fetch function to get: 'picture url', 'book's title', 'year of publication', 'description'
                axios.get(item.selfLink).then(resp => {
                    
                    const data = resp.data
                    const volumeInfo = resp.data.volumeInfo
                    if(volumeInfo.imageLinks === null || volumeInfo.description === null){
                        if(volumeInfo.language === selectLanguage){
                            setDataArray(old => 
                                [...old, ])
                        }
                            
                    }else{
                        if(volumeInfo.language === selectLanguage){
                            setDataArray(old => 
                                [...old, 
                                    {
                                        
                                        id: data.id,
                                        pictureUrl: volumeInfo.imageLinks?.smallThumbnail || volumeInfo.imageLinks,
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
        .catch(err => {
            alert('No data.. Try again')
        })
    }
    function handleChange(ev){
        setIntitle(ev.target.value)
    }
    function handleFind(){
        setRenderLoading(true);
        setDataArray([])
        setTimeout(function(){
            setRenderLoading(false)
            fetchData()
            setCanRender(true);
            setRenderLibrary(true);
        },300)
    }

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
    const count = useSelector((state) => state.saver.items)
    const dispatch = useDispatch()

  return (
    <div className='block relative'>
        <h2 className='text-center text-3xl'>Select a language:</h2>
        <div className="flex justify-around m-auto text-xl p-5 w-1/4">
            <button className='border-2 p-5 bg-blue-300' onClick={()=>setSelectLanguage('pl')}>Polish</button>
            <button className='border-2 p-5 bg-green-300' onClick={()=>setSelectLanguage('en')}>English</button>
        </div>
            <p className='text-center font-bold text-xl p-10'>Selected: {selectLanguage}</p>
        <div className='text-xl absolute'>
        <details className='block select-none max-w-[400px]'>
              <summary className='cursor-pointer mt-10 text-4xl'>Library: (click to show)</summary>
              <div className="mt-10">
                {renderLibrary && count.map((item, key) => {
                    return (
                        <div key={key}>
                            <div className='pt-5'>
                                <p className='italic'>{item}</p>
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
        {renderLoading && <RenderLoading/>}
        {canRender && renderBooks}
        </div>
        
    </div>
  )
}

export default Home