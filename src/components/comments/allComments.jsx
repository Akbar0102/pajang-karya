import { CommentSingle } from "./commentSingle"

export const AllComments = ({ commentsData }) => {

    return (
        <section>
            {commentsData && commentsData.map(({ id, content, user, createdAt })=> {
                return <CommentSingle key={id} id={id} content={content} username={user.username} createdAt={createdAt} />
            })}
        </section>
    )
}