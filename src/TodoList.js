import React, { useReducer } from 'react'
import { Button, Card, CardBody, CardHeader, Col, FormGroup, Input, Label, Row } from 'reactstrap'

const getInitialState = () => {
    const initialState = {
        todoDetails: '',
        todoList: [],
        isShow: false,
    }
    return initialState;
}

const stateRender = (state, action) => {
    switch (action.type) {
        case 'add': {
            return {
                ...state,
                ...action.payload,
            }
        }
        case 'inital': {
            return getInitialState();
        }
        default:
            return state;
    }
}

const TodoList = () => {

    const [initialState, dispatch] = useReducer(stateRender, getInitialState())

    const updateState = (filedName, filedValue) => {
        dispatch({
            type: 'add',
            payload: {
                [filedName]: filedValue,
            }
        })
    }

    const handleSumbit = () => {
        const todoArrays = {
            id: Date.now(),
            userTodo: initialState.todoDetails,
        }
        const details = [...initialState.todoList]
        details.push(todoArrays);
        dispatch({
            type: 'add',
            payload: {
                todoList: details,
                todoDetails: '',
                isShow: true
            }
        })
    }

    // const handleUpdate = (key, user) => {
    //     const updateRow = initialState.todoList.map(item => item.id === key ? { ...item, userTodo: user } : item)
    //     dispatch({
    //         type: 'add',
    //         payload: {
    //             todoList: updateRow
    //         }
    //     })
    // }

    const handleUpdate = (key, updatedTodo) => {
        const updatedList = initialState.todoList.map((item) =>
            item.id === key ? { ...item, userTodo: updatedTodo } : item
        );
        dispatch({
            type: 'add',
            payload: { todoList: updatedList },
        });
    };


    const handleDelete = (key) => {
        const list = [...initialState.todoList]
        const deleteList = list.filter(item => item.id !== key)
        dispatch({
            type: 'add',
            payload: {
                todoList: deleteList
            }
        })
    }

    return (
        <div>
            <Card className='container d-flex justify-content-center  align-items-center '>
                <CardHeader style={{ width: 'auto', height: 'auto' }}>
                    <FormGroup>
                        <Row>
                            <Col md='8'>
                                <Label> Add</Label>
                                <Input
                                    type='text'
                                    id='todoDetails'
                                    value={initialState.todoDetails}
                                    onChange={(e) => updateState('todoDetails', e.target.value)}
                                />
                            </Col>
                            <Col md='4'>
                                <Button
                                    type='sumbit'
                                    color='primary'
                                    className='mt-4'
                                    onClick={handleSumbit}
                                >
                                    Add
                                </Button>
                            </Col>
                        </Row>
                    </FormGroup>
                </CardHeader>
                <CardBody>
                    <FormGroup>
                        {!!initialState.isShow && (
                            <>
                                {initialState.todoList.map((item, index) => (
                                    <Row md='10'>
                                        <Col>
                                            <div key={index}>
                                                <Input
                                                    type='text'
                                                    value={item.userTodo}
                                                    // readOnly
                                                    onChange={(e) => handleUpdate(item.id, e.target.value)}

                                                    // onChange={(e) => updateState(item.id, e.target.value)}
                                                />
                                            </div>
                                        </Col>
                                        <Col>
                                            {/* <Button type="update" onClick={() => handleUpdate(item.id, item.userTodo)}>
                                                update
                                            </Button> */}
                                            <Button type="delete" onClick={() => handleDelete(item.id)}>
                                                delete
                                            </Button>
                                        </Col>
                                    </Row>
                                ))}
                            </>
                        )}
                    </FormGroup>
                </CardBody>
            </Card>
        </div>
    )
}

export default TodoList