import React, { useState, useEffect } from 'react'

const UserList = (props) => {
    const [filter,setFilter] = useState(null);

    const getSearch = () => {
      console.log("work")
        if (filter) return filter
        return props.children
    }

    const searchUsers = getSearch()
    console.log(searchUsers)
    
    useEffect(() => {
      setFilter(props.users)
    }, [])

    const onChange = (e) => {
       setFilter(props.children.filter((user)=>
        user.name.toLowerCase().includes(e.target.value.toLowerCase())
          )
        )
    }

    return (
        <>
        {props.search && 
            <form className="col s12">
                <div className="input-field col s12">
                  <i className="material-icons prefix">search</i>
                  <textarea 
                  id="icon_prefix2" 
                  className="materialize-textarea"
                  placeholder="Search"
                  onChange={onChange}></textarea>
              </div>
            </form>
        }
        <table>
        <thead>
          <tr>
              <th>Name</th>
              <th>Phone number</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {searchUsers.map((user)=>
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td><i className="material-icons"
                  onClick={()=>props.removeUser(user.id)}
                >delete</i></td>
                
                </tr>
            )}
        </tbody>
      </table>
      </>
    )
}

export default UserList


