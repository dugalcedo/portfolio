import { Admin } from 'backend'
import { useState, useEffect } from 'react'
import { VarObj } from 'types'
import avatars from 'lib/avatars.tsx'

export default function AdminRoute() {

  const [users, $users] = useState<VarObj>([])

  useEffect(()=>{
    Admin.users()
      .then(result => {
        $users(result)
      })
  },[])

  return (
    <div>
      <div id="admin-users">
        {users.map((u: VarObj) => {

          return (
            <div className="user" key={u.id}>
              <div className="head">
                <div className="username">
                  {u.username}
                </div>
                <div className="avatar">
                  {avatars[u.avatar]}
                </div>
              </div>
              <div className="body">
                <div className="buttons">
                  <button>
                    Del
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}