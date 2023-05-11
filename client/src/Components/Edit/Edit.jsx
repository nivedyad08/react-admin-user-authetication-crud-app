import React from 'react'
import Form from '../Form/Form'
import { useSelector } from "react-redux";

function Edit() {
  const userDetails = useSelector((state) => state.user.userInfo);
  return (
    <div>
        <Form/>
    </div>
  )
}

export default Edit