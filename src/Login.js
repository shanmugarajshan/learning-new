import React, { useState } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { loginData } from './api/LoginApi';
import { useNavigate } from 'react-router-dom';

const getInitialState = () => {
    const initialState = {
        buttonType: 'Login',
        userName: '',
        email: '',
        password: '',
        gander: '',
        phoneNum: '',
        selectAGe: {value: '', label: 'select'}
    }
    return initialState;
}

const getInvaildState = () => {
    const invaildFlag = {
        userName: false,
        email: false,
        password: false,
        phoneNum: false
    }
    return invaildFlag;
}

const Login = () => {

    const [state, setState] = useState(getInitialState())
    const history = useNavigate();
    const [invaild, setInvaild] = useState(getInvaildState())

    const handleChange = (e, type) => {
        e.preventDefault()
        setState(prev => ({
            ...prev,
            buttonType: type
        }))
    }

    const updateFiledState = (filed, value) => {
        setState((prev) => ({ ...prev, [filed]: value }))
        setInvaild((prev) => ({ ...prev, [filed]: false }))
    }

    const vaildate = () => {
        let isValid = true;
        const vaildateFeild = { ...invaild };

        if (state.userName === '') {
            vaildateFeild.userName = true;
            isValid = false
        }
        if (state.email === '' && state.buttonType === 'CreateNew') {
            vaildateFeild.email = true;
            isValid = false;
        }
        if (state.phoneNum === '' && state.buttonType === 'CreateNew') {
            vaildateFeild.phoneNum = true;
            isValid = false
        }
        if (state.password === '') {
            vaildateFeild.password = true;
            isValid = false
        }
        setInvaild(vaildateFeild);
        return isValid;
    }

    const handleSumbit = (e, type) => {
        e.preventDefault();
        if (type === 'login') {
            if (vaildate()) {
                const { userName, password } = state;
                const loginDetails = {
                    username: userName,
                    password: password
                }
                const responseData = loginData(loginDetails);
                responseData.then(
                    (data) => {
                        alert('success')
                        history('/dashBoard')
                    }
                )
            }
        } else if (type === 'create') {
            if (vaildate()) {
                const { userName, email, phoneNum, gander, password } = state;
                const createDetails = {
                    userName: userName,
                    email: email,
                    phoneNum: phoneNum,
                    gander: gander,
                    password: password
                }
                localStorage.setItem("create", JSON.stringify(createDetails));
                alert('success')
                history('/dashBoard')
            }
        }
    }

    return (
        <div className='container d-flex justify-content-center  align-items-center vh-100'>
            <div className='card shadow' style={{ width: 'auto', height: 'auto' }}>
                <h2 className='mx-auto pt-2'>{state.buttonType === 'CreateNew' ? 'Create' : 'Login'}</h2>
                <Form className='px-4'>
                    <FormGroup>
                        <Label>User Name</Label>
                        <Input
                            type='name'
                            id='userName'
                            value={state.userName}
                            invalid={invaild.userName}
                            onChange={(e) => updateFiledState('userName', e.target.value)}
                        />
                    </FormGroup>
                    {state.buttonType === 'CreateNew' && (
                        <FormGroup>
                            <Label>email</Label>
                            <Input
                                type='email'
                                id='email'
                                value={state.email}
                                invalid={invaild.email}
                                onChange={(e) => updateFiledState('email', e.target.value)}
                            />
                        </FormGroup>
                    )}
                    <FormGroup>
                        <Label>PassWord</Label>
                        <Input
                            type='password'
                            id='password'
                            value={state.password}
                            invalid={invaild.password}
                            onChange={(e) => updateFiledState('password', e.target.value)}
                        />
                    </FormGroup>
                    {state.buttonType === 'CreateNew' && (
                        <FormGroup>
                            <Label>Gender</Label>
                            <Input
                                type='select'
                                id='gander'
                                value={state.gander}
                                onChange={(e) => updateFiledState('gander', e.target.value)}
                            >
                                <option value=''>Select</option>
                                <option value='Male'>Male</option>
                                <option value='FeMale'>FeMale</option>
                            </Input>
                        </FormGroup>
                    )}
                    {state.buttonType === 'CreateNew' && (
                        <FormGroup>
                            <Label>Moblie</Label>
                            <Input
                                type='number'
                                id='phoneNum'
                                value={state.phoneNum}
                                onChange={(e) => updateFiledState('phoneNum', e.target.value)}
                                valid={invaild.phoneNum}
                            />
                        </FormGroup>
                    )}
                    {state.buttonType === 'Login' ? (
                        <>
                            <Button
                                color='primary'
                                onClick={(e) => handleSumbit(e, 'login')}
                            >
                                Login
                            </Button>
                            <p className='pt-3'>Create a new account? <span onClick={(e) => handleChange(e, 'CreateNew')} style={{ color: 'blue', cursor: 'pointer' }}>Click here </span></p>
                        </>
                    ) : (
                        <>
                            <Button
                                color='primary'
                                onClick={(e) => handleSumbit(e, 'create')}
                            >
                                Create Account
                            </Button>
                            <p className='pt-3'>Already have an account? <span onClick={(e) => handleChange(e, 'Login')} style={{ color: 'blue', cursor: 'pointer' }}>Login here </span></p>
                        </>
                    )}
                </Form>
            </div>

        </div>
    )
}

export default Login