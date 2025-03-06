'use client'
import { FC } from 'react'
import Image from 'next/image'

const Hero: FC = () => {
  //TODO add hero contentful data

  return (
    <div className=" relative bg-cover bg-center bg-no-repeat h-[400px]">
      <Image
        src="/hero_cover.jpg"
        alt="Stunning hero banner showcasing our photography"
        width={200}
        height={125}
        priority
        loading="eager"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
        className="absolute w-full h-[400px] top-0 left-0 object-cover -z-10 filter brightness-75"
      />
      <div className="flex-grow flex items-center justify-center p-8">
        <div className="max-w-md text-center ">
          <h1 className="text-4xl font-bold  text-secondary-light">
            Capturing authentic moments through photography.
          </h1>
        </div>
      </div>
    </div>
  )
}
export default Hero
