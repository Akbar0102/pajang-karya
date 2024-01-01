import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import { DeleteComment } from "./deleteComment";

export const CommentSingle = ({ id, content, username, userId, createdAt, currentUser }) => {
    const formattedDate = formatDate(createdAt);


    return (
        <div>
            <div className=" flex flex-col sm:flex-row items-start gap-4">
                <Link href={`/${username}`}>
                    <p className=" text-[32px] font-normal text-grey hover:text-violet">
                        {username}
                    </p>
                </Link>
                <p className=" text-base font-normal text-grey">
                    {formattedDate}
                </p>
            </div>
            <div className=" border-b-1 border-black-100 py-7 mb-7 flex flex-col gap-y-3">
                <p className=" text-lg font-normal italic">
                    {content}
                </p>
                {currentUser == userId && <DeleteComment id={id} />}
            </div>
        </div>
    )
}