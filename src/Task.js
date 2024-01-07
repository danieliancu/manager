import React, {useState} from 'react'
import List from './components/List'
import Input from './components/Input'
 

function Task(){
    return (
        <div>
            <Input />
           <List /> 
        </div>
    )
}

export default Task