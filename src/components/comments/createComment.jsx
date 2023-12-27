import { Button, Input, Textarea } from '@nextui-org/react'
import React from 'react'

export const CreateComment = () => {
    return (
        <div className=' flex items-center gap-12 mb-[120px] mt-[70px]'>
            <Textarea className=' rounded-3xl w-[60%]' variant='bordered' placeholder='Write a comment...' />
            <Button className=' text-white text-2xl font-medium bg-violet px-6 py-[14px]'>
                Submit
            </Button>
        </div>
    )
}
