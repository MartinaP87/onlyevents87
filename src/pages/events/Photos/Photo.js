import React from 'react'

const Photo = (props) => {
    const {
        owner,
        title,
        created_at,
        image
    } = props
  return (
    <div>Photo di {owner}
    {title}</div>
  )
}

export default Photo