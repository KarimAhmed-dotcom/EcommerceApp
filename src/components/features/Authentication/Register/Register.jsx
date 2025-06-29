import {Form,Link, useNavigate} from 'react-router-dom'
import Button from '../../../ui/Button/Button'
import { useFormik } from 'formik';
// import { useReducer } from 'react'
import * as yup from 'yup'
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { userContext } from '../../../Context/UserContext';
import Spinner from '../../../ui/Spinner/Spinner';
import styles from './Register.module.css'

function Register() {

    const [error,setError]=useState("")
    const [loading,setLoading]=useState(false);
    
    const initialValues={
        name:"",
        email:"",
        phone:"",
        password:"",
        rePassword:""
    }
    async function handleReset(){
        formik.setValues(initialValues)
        formik.setErrors({})
        formik.setTouched({name:false,email:false,phone:false,password:false,rePassword:false})
    }

    async function handleSubmit(values){
        console.log(values)
        try{
            setLoading(true)
            const res=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
            console.log(res)
            toast.success("Register completed 🎉")
            navigate('/login')
        }
        catch(error){
            console.log(error)
            if (error?.response?.data?.errors?.msg){
                setError(error.response.data.errors.msg)
                }
            else if (error?.response?.data){
                setError(error.response.data.message)
            }
            else {
                setError(error.message )
            }
        }
        finally{
                setLoading(false)
            }
        
    }

   const validationSchema = yup.object().shape({
  name: yup.string().min(3).max(30).required('Name is required'),
  
  email: yup.string().email('Invalid email').required('Email is required'),

  phone: yup
    .string()
    .matches(/^(?:\+2)?01[0125][0-9]{8}$/, 'Invalid phone number')
    .required('Phone is required'),

  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$#^!%*?&]{8,}$/,
      'Password must be at least 8 characters, include letters and numbers'
    )
    .required('Password is required'),

  rePassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

    const formik=useFormik({
        initialValues,
        validationSchema,
        onSubmit:handleSubmit,
        onReset:handleReset
    })

    const {user}=useContext(userContext)
    const navigate=useNavigate();
    useEffect(() => {
        if(user){
            navigate('/')
        }
    },[user,navigate])

    return(
        <section className='container mt-4 '>
            {loading && <Spinner />}
            <form className={`${styles.form} d-flex flex-column gap-4`} onSubmit={formik.handleSubmit}> 
            <h2 className='text-center'>Create an account</h2>
                <div >
                    <label htmlFor='name' className='form-label'>Name</label>
                    <input name="name" type='text' className={`form-control ${formik.errors.name && formik.touched.name ? "is-invalid":""}`} id="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                    <p className='invalid-feedback mb-0'>{formik.errors.name}</p>
                </div>
                <div >
                    <label htmlFor='email' className='form-label'>Email</label>
                    <input name="email" type='email' className={`form-control ${formik.errors.email && formik.touched.email ? "is-invalid":""}`} id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                    <p className='invalid-feedback mb-0'>{formik.errors.email}</p>
                </div>
                <div >
                    <label htmlFor='phone' className='form-label'>Phone number</label>
                    <input name="phone" type='tel' className={`form-control ${formik.errors.phone && formik.touched.phone ? "is-invalid":""}`} id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                <p className='invalid-feedback mb-0'>{formik.errors.phone}</p>
                </div>
                <div >
                    <label htmlFor='password' className='form-label'>Password</label>
                    <input name="password" type='password' className={`form-control ${formik.errors.password && formik.touched.password ? "is-invalid":""}`} id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                    <p className='invalid-feedback mb-0'>{formik.errors.password}</p>
                </div>
                <div >
                    <label htmlFor='rePassword' className='form-label'>Password Confirmation</label>
                    <input name="rePassword" type='password' className={`form-control ${formik.errors.rePassword && formik.touched.rePassword ? "is-invalid":""}`} id="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                    <p className='invalid-feedback mb-0'>{formik.errors.rePassword}</p>
                </div>
                {error && <p className='alert alert-danger py-1 text-center mb-0'>{error}</p>}
                
                <div className='d-flex mt-4 mx-auto gap-1'>
                    <Button myClasses='fw-bold  px-4' type='submit' disabled={!formik.isValid || !formik.dirty || loading}/>
                    <Button myClasses='fw-bold  px-4' myStyles={{"--color":"var(--main-color)","--background-color":"#fff"}} handleClick={formik.handleReset}>Reset</Button>
                </div>
                <p className='small text-center mb-0'>Already have an account ? <Link to='/login' style={{color:"var(--main-color)",fontWeight:'500'}}>Login</Link></p>

            </form>
       </section>
    )
}

export default Register