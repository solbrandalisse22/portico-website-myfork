import { useEffect, useState, useRef } from "preact/hooks";
import { type Photo } from "@/types/types";
import Styles from '@/shared/styles/CarouselImages.module.css';
import ActionButtons from "@/shared/components/ActionButtons";

interface CarouselImagesProps {
  images: Photo[];
}

export default function CarouselImages({ images }: CarouselImagesProps) {
  const [firstCardWidth, setFirstCardWidth] = useState(0);
  const [isDragging, setIsDragging] = useState<Boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [startScrollLeft, setStartScrollLeft] = useState<number>(0);
  const carouselRef = useRef<HTMLUListElement>(null);

  const nextButtonClicked = () => {
    const $carousel = carouselRef.current;
    if ($carousel) $carousel.scrollLeft += firstCardWidth;
  }

  const backButtonClicked = () => {
    const $carousel = carouselRef.current;
    if ($carousel) $carousel.scrollLeft -= firstCardWidth;
  }

  const InfiniteScroll = () => {
    const $carousel = carouselRef.current as HTMLUListElement;
    if ($carousel.scrollLeft === 0) {
      $carousel.classList.add(Styles['no-transition']);
      $carousel.scrollLeft = $carousel.scrollWidth - (2 * $carousel.offsetWidth);
      $carousel.classList.remove(Styles['no-transition']);
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil($carousel.scrollLeft) === $carousel.scrollWidth - $carousel.offsetWidth) {
      $carousel.classList.add(Styles['no-transition']);
      $carousel.scrollLeft = $carousel.offsetWidth;
      $carousel.classList.remove(Styles['no-transition']);
    }
  }

  useEffect (() => {
    const $carousel = carouselRef.current as HTMLUListElement;
    if ($carousel) {
      setFirstCardWidth($carousel.getElementsByTagName('li')[0].offsetWidth);
      $carousel.classList.add(Styles['no-transition']);
      $carousel.scrollLeft = $carousel.offsetWidth;
      $carousel.classList.remove(Styles['no-transition']);
    }
    
    $carousel.addEventListener('scroll', InfiniteScroll);
    return () => $carousel.removeEventListener('scroll', InfiniteScroll);
  }, [images]);
  
  const dragStart = (e: MouseEvent) => {
    const $carousel = carouselRef.current;
    if ($carousel) {
      setIsDragging(true);
      $carousel.classList.add(Styles.dragging);
      setStartX(e.pageX);
      setStartScrollLeft($carousel.scrollLeft);
    }
  }

  const dragging = (e: MouseEvent) => {
    const $carousel = carouselRef.current;
    if(!isDragging) return
    if ($carousel) {
      $carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    }
  }

  const dragEnd = () => {
    setIsDragging(false);
    carouselRef.current?.classList.remove(Styles.dragging);
  }

  return (
    <div class="wrapper w-full">
      <ul
        onMouseDown={dragStart}
        onMouseUp={dragEnd}
        onMouseMove={dragging}
        ref={carouselRef}
        class={`${Styles.carousel} list-none`}
      >
        {images.map((image, index) => (
          <li
            class="rounded-xl aspect-video border-primary border overflow-hidden"
            key={index}
          >
            <img
              draggable={false}
              class="carousel-images__img"
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
            />
          </li>
        ))}
        {images.map((image, index) => (
          <li
            class="rounded-xl aspect-video border-primary border overflow-hidden"
            key={index}
          >
            <img
              draggable={false}
              class="carousel-images__img"
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
            />
          </li>
        ))}
        {images.map((image, index) => (
          <li
            class="rounded-xl aspect-video border-primary border overflow-hidden"
            key={index}
          >
            <img
              draggable={false}
              class="carousel-images__img"
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
            />
          </li>
        ))}
      </ul>
      <ActionButtons backButtonClicked={backButtonClicked} nextButtonClicked={nextButtonClicked} />
    </div>
  );
}
