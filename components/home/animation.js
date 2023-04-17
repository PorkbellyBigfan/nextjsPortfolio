import React from 'react'
import Lottie from 'react-lottie-player'
import LaptopAnimation from '@/public/animation.json'

export default function Animation() {
  return (
    <Lottie
      loop
      animationData={LaptopAnimation}
      play
    />
  )
}