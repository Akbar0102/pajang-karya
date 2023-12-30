"use client"
import { apiUrl } from '@/config/apiUrl';
import { Button, Textarea } from '@nextui-org/react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export const CreateComment = ({ projectId }) => {
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    async function handleSubmitComment() {

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/comments`, {
                method: "POST",
                body: JSON.stringify({ projectId, content }),
            });

            const { message, errorMessage } = await res.json();
            if (errorMessage) {
                toast.error(errorMessage)
                setLoading(false)
                return;
            }

            if (res.ok) {
                toast.success(message);
                setContent('');
                setLoading(false);
                router.refresh();
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className=' flex items-center gap-12 mb-[120px] mt-[70px]'>
            <Textarea className=' rounded-3xl w-[60%]' variant='bordered' placeholder='Write a comment...' name='content' onChange={e => setContent(e.target.value)} value={content} />
            <Button type='submit' className=' text-white text-2xl font-medium bg-violet px-6 py-[14px]' onClick={handleSubmitComment} isLoading={loading}>
                Submit
            </Button>
        </div>
    )
}
