import { useState, useRef } from 'preact/hooks'

interface Image {
  id: string;
  src: string;
  width: number;
  height: number;
  imgAlt: string;
}

export interface SliderImageProps {
  images: Image[];
}

export default function SliderImage({ images = [] }: SliderImageProps) {
  const [slider, setSlider] = useState(images[0]?.id)
  const sliderRef = useRef<HTMLDivElement>(null)

  const updateSlider = (id: string) => {
    setSlider(id)
    const sliderElement = sliderRef.current
    const sliderItem = document.getElementById(id)
    if (sliderElement && sliderItem) {
      sliderElement.scrollTo({
        left: sliderItem.offsetLeft,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div class="slider-wrapper relative mx-auto m-0">
      <div ref={sliderRef} class="slider flex aspect-video overflow-x-hidden snap-x scroll-smooth shadow-lg rounded">
        {
          images.map(({id, src, imgAlt, width, height}) => (
            <img width={width} height={height} alt={imgAlt} loading="lazy" class="snap-start object-cover flex-1" style={{ flex: '0 0 100%' }} id={id} src={src} />
          ))
        }
      </div>
      <div class="slider-nav flex gap-3 absolute bottom-5 left-1/2 -translate-x-1/2 z-10">
        {
          images.map(({id}) => (
            <button class={`size-4 rounded-full hover:opacity-100 hover:scale-125 transition-all ${ id === slider ? 'scale-125 opacity-100 bg-white' : 'scale-100 opacity-75 bg-gray-400' }`} onClick={() => updateSlider(id)} />
          ))
        }
      </div>
    </div>
  )
}