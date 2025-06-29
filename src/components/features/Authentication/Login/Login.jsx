import { Form, useActionData, useNavigation, Link,useNavigate } from 'react-router-dom';
import Button from '../../../ui/Button/Button';
import styles from './Login.module.css'
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from 'axios';
import { useContext,useEffect } from 'react';
import { userContext } from '../../../Context/UserContext';


function Login(){
    const {state}=useNavigation()
    const actionData=useActionData()
    const {user,setUser}=useContext(userContext)
     const navigate=useNavigate();
    console.log("user",user)
    useEffect(() => {
  if (actionData?.status === 'success') {
    setUser(actionData?.data)
    localStorage.setItem('userToken',actionData?.data?.token)
    navigate('/')
  }
}, [actionData])
    return(
        <Form method="POST" className={`container ${styles.form} d-flex flex-column gap-4`}> 
            <div className={`input-group ${styles.inputGroup}`}>
                <label htmlFor='email' className='form-label'><MdOutlineAlternateEmail /></label>
                <input name="email" type='email' id='email' placeholder='Email' className='form-control' aria-label='email'/>
            </div>
            <div className={`input-group ${styles.inputGroup}`}>
                <label htmlFor='password' className='form-label'><RiLockPasswordFill /></label>
                <input name="password" type='password' id='password' placeholder='Password' className='form-control' aria-label='password'/>
            </div>
            {actionData?.error && <small className='alert alert-danger py-2 m-0'>{actionData?.error}</small>}
            <Button type="submit" myClasses={'mx-auto px-3 mt-4'} disabled={state==='submitting'}>
                {state==="submitting" ? "logging in...." :"Login"}
            </Button>
            <p className='small text-center mb-0'>Don't have an account ? <Link to='/register' style={{color:"var(--main-color)",fontWeight:'500'}}>Create an account</Link></p>
       </Form>

    )
}

export async function action({request}){
    const formData= await request.formData()
    const data= Object.fromEntries(formData.entries())
    console.log("login data : ",data)
    try{
        const res=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',data)
        return {status:"success",data:res.data}
    }
    catch(err){
        return {status:"error",error:err?.response?.data?.message }
    }
    
} 


export default Login