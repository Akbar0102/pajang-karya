import { Avatar, user } from '@nextui-org/react'
import Link from 'next/link';
import React from 'react';

export const Profile = ({ profileData }) => {
    const { username, project, firstName, lastName, about } = profileData
    return (
        <div className=' mx-[100px] my-48 flex-grow'>
            <section className=' flex flex-col sm:flex-row items-center gap-3'>
                <Avatar name={username} className=' w-32 h-32 text-large' />
                <div className=' flex flex-col gap-y-3'>
                    <h1 className=' font-bold text-[52px] text-black-50 break-all'>{username}</h1>
                    <p className=' font-normal text-xl text-black-100 break-all'>{`${firstName} ${lastName}`}</p>
                </div>
            </section>

            <section className=' mt-24'>
                <h2 className=' text-4xl font-semibold text-black-50'>About</h2>
                <p className=' text-xl font-medium text-black-100 mt-6'>{about}</p>
            </section>

            <section className=' mt-24'>
                <h2 className=' text-4xl font-semibold text-black-50 mb-20'>My Project</h2>

                {project && project.map(({ id, name, tech, slug }) => {
                    return (
                        <div key={id} className=' flex flex-col gap-3 mb-12 border-b-1 pb-6 border-black-100'>
                            <Link href={`/${username}/${slug}`}>
                                <h3 className=' text-[32px] font-normal text-grey hover:text-violet'>{name}</h3>
                            </Link>
                            <p className=' text-xl font-normal text-grey'>{tech}</p>
                        </div>
                    )
                })}
            </section>
        </div>
    )
}
