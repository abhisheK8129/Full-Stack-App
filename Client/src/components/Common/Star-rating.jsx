import React, { Fragment } from 'react'
import { Button } from '../ui/button'
import { StarIcon } from 'lucide-react'

export const StarRatingComponent = ({rating, handleRatingChange}) => {
    const rate = [1,2,3,4,5]
  return (
    <Fragment>
        {
            rate.map((star)=> (
                <Button onClick={handleRatingChange ? ()=> handleRatingChange(star) : null} className={`border-none w-6 h-6 transition-colors rounded-2xl  ${star <= rating ? 'text-yellow-500 ': 'text-black'} `} variant='outline' size='icon'>
                    <StarIcon className={`w-4 h-4   ${star <= rating ? 'fill-yellow-500': 'fill-white text-gray-400'}`}/>
                </Button>
            )) 
        }
    </Fragment>
  )
}
