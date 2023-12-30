import { formatDate } from "@/utils/formatDate";

export const CommentSingle = ({ id, content, username, createdAt }) => {
   

    const formattedDate = formatDate(createdAt);
    return (
        <div>
            <div className=" flex items-center gap-4">
                <p className=" text-[32px] font-normal text-grey">
                    {username}
                </p>
                <p className=" text-base font-normal text-grey">
                    {formattedDate}
                </p>
            </div>
            <div className=" border-b-1 border-black-100 py-7 mb-7">
                <p className=" text-lg font-normal italic">
                    {content}
                </p>
            </div>
        </div>
    )
}