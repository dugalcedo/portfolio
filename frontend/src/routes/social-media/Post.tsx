import avatars from "../../lib/avatars.js"
import { FaHeart, FaPencil, FaTrash } from "react-icons/fa6"
import { deletePost, editPost } from "../../lib/backend-api.js"
import { useState } from "react"

export default function Post({post, self}) {

    const [editing, $editing] = useState(false)

    return (
        <div className="post" key={post.id}>
            <div className="head">
                <div className="avatar-author">
                    <div className="avatar">
                        {avatars[post.avatar]}
                    </div>
                    <div className="author">
                        {post.author}
                    </div>
                </div>
                <div className="timestamp">
                    <div className="relative">
                        {post.relativeTime}
                    </div>
                    <div className="actual">
                        ({post.timestamp})
                    </div>
                </div>
                {post.edited && (
                    <div className="timestamp">
                        edited
                    </div>
                )}
            </div>
            <div className="body">
                <div className="content">
                    {!editing ? post.content : (
                        <textarea defaultValue={post.content}
                        onKeyUp={(e) => {
                            if (e.key !== 'Enter') return
                            editPost(post.id, e.target.value)
                        }}
                        >
                        </textarea>
                    )}
                </div>
                <div className="buttons">
                    {!self && (
                        <button>
                            <FaHeart />
                        </button>
                    )}
                    {self && (
                        <>
                            <button onClick={()=>{
                                $editing(!editing)
                            }}>
                                <FaPencil />
                            </button>
                            <button onClick={()=>{
                                deletePost(post.id)
                            }}>
                                <FaTrash />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}