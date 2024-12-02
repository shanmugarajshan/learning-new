import React, { useState } from 'react'
import { Button, Card, CardBody, Table } from 'reactstrap'
import TodoList from './TodoList';

const getInitailState = () => {
 const initialState = {
   isOpen: false
 }
 return initialState;
}

const DashBoard = () => {

    const [state, setState] = useState(getInitailState())

    const handleClick = () => {
        setState({
            isOpen: true
        })
    }

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>UserName</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Moblie</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(localStorage).map(item => {
                        const key = JSON.parse(item);
                        return (<tr>
                            <td>{key.userName}</td>
                            <td>{key.email}</td>
                            <td>{key.gander}</td>
                            <td>{key.phoneNum}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Button 
             type='sumbit'
             onClick={handleClick}
            >
                ToDo List
            </Button>
            {!!state.isOpen && (
               <TodoList />
            )}
        </div>
    )
}

export default DashBoard