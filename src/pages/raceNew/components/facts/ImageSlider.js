import React, {useState} from 'react'
import { SliderData } from './SliderData'
import { FaArrowAltCircleRight } from 'react-icons/fa'
import { FaArrowAltCircleLeft } from 'react-icons/fa'
import "./slider.css"

const ImageSlider = ( {slides} ) => {
  const [current, setCurrent] = useState(0)
  const length = slides.length

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? length -1 : current -1)
  }

  if (!Array.isArray(slides) || slides.legnth <= 0) {
    return null;
  }
  return (
   
      
     
        
          <section className="slider" >
            <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
            <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
             {SliderData.map((slide, index) => {
               return (
               <div className={index === current ? 'slide active' : 'slide'} key={index}>
                 {index === current && (
                 
                 <img src={slide.image} alt="sdsdsdsdsd" className='image'/>
                 
                 )}

               
            
               </div>
               
               )
               
              })}
          </section>
        
    
    
  )
}



export default ImageSlider