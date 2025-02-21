import React from 'react'
import CommentInput from './CommentInput'
import ShowComment from './ShowComment'

const Comment = ({id} : {id : string}) => {
  return (
    <div>
         <div className="w-full mt-14 md:mt-20">
            <CommentInput id={id}/>
        </div>
        <div>
          <ShowComment id={id}/>
        </div>
    </div>
  )
}

export default Comment
