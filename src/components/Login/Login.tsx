import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {authTC} from '../../redux/reducers/authReducer';
import {Link, useNavigate} from 'react-router-dom';
import style from '../../style/Login.module.css';
import {rootReducerType} from "../../redux/store/store";
import Button from "../Button/Button";


const Login = () => {
    const auth = useSelector<rootReducerType, boolean>(state => state.auth.isAuth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const redirectOnSingUp = () => {
        navigate('/sing-up')
    }
    if (auth) {
        navigate(`/main/${false}`);
    }

    return (
        <div className={style.loginContainer}>
            <Formik
                initialValues={{email: 'pavel.nagai@mail.ru', password: 'pavelprog20'}}
                validate={values => {
                    const errors: any = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.password) {
                        errors.password = 'Required field';
                    } else if (values.password.length < 7) {
                        errors.password = 'Minimal length is 7';
                    }
                    return errors;
                }}
                onSubmit={(values) => {
                    dispatch(authTC({email: values.email, password: values.password, rememberMe: false}));
                }}>
                {({isSubmitting}) => (
                    <Form>
                        <div className={style.titleContainer}>
                            <h1>it-incubator</h1>
                            <h2>sign in</h2>
                        </div>
                        <div className={style.inputContainer}>
                            <Field className={style.input} type="email" name="email" autoComplete="username"/>
                            <ErrorMessage name="email" component="div"/>
                            <Field className={style.input} type="text" name="password" autoComplete="current-password"/>
                            <ErrorMessage name="password" component="div"/>
                        </div>
                        <div className={style.forgotContainer}>
                            <div>
                                <input type="checkbox"/>
                                remember me
                            </div>
                            <Link to={'/recovery-pass'}>forgot password</Link>
                        </div>
                        <Button type="submit" disabled={isSubmitting} name="Sing In"/>
                        <div className={style.signUpContainer}>
                            <div>Don???t have an account?</div>
                            <Button callback={redirectOnSingUp} name={'Sing Up'}/>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;