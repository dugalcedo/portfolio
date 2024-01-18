import { createPost, getAllPosts } from "../../lib/backend-api.js"
import Form from "../../components/Form.jsx"
import { useState, useEffect } from "react"



import { useStore } from '../../lib/store.js'
import Post from "./Post.jsx"

export default function SocialMedia() {

    const [posts, $posts] = useState([])
    const {store} = useStore()

    useEffect(()=>{
        getAllPosts()
            .then(result => {
                if (result.msg) return
                $posts(result)
            })
    },[])

    const handleSubmitPost = (form, data) => {
        const result = createPost(data)
        // console.log(result)
    }

  return (
    <div id="social-media" className="container">
        <div id="timeline">
            <h2>Timeline</h2>
            <div className="body">
                <Form 
                    title=""
                    fields={[
                        {
                            label: "what's up?",
                            type: 'textarea',
                            name: 'content'
                        }
                    ]}
                    button="Post"
                    oneLineStyle={true}
                    onSubmit={handleSubmitPost}
                />
                <div id="posts">
                    {posts.map((post, postIndex) => {
                        const self = post.userId === store.user.id
                        return (
                            <Post post={post} self={self} key={post.id}/>
                        )
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}