"use client"
import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { apiUrl } from '@/config/apiUrl';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const DeleteComment = ({ id }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function deleteComment(id) {
        try {
            setLoading(true)
            const res = await fetch(`${apiUrl}/comments/${id}`, { method: "DELETE" });
            const { message, errorMessage } = await res.json();
            if (errorMessage) {
                toast.error(errorMessage)
                setLoading(false)
                return;
            }

            if (res.ok) {
                toast.success(message);
                setLoading(false);
                onOpenChange(false)
                router.refresh();
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <div>
            <Button onPress={onOpen} className="w-fit bg-violet text-white" >Delete</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Confirm</ModalHeader>
                            <ModalBody>
                                <p>
                                    Are you sure to delete this comment?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button className='bg-violet text-white' onPress={(e) => deleteComment(id)} isLoading={loading}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}
