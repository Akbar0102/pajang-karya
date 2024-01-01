import { CommentSingle } from "./commentSingle"

export const AllComments = ({ commentsData, currentUser }) => {

    return (
        <section>
            {commentsData && commentsData.map(({ id, content, user, createdAt })=> {
                return <CommentSingle key={id} id={id} content={content} username={user.username} userId={user.id} createdAt={createdAt} currentUser={currentUser} />
            })}
        </section>
    )
}