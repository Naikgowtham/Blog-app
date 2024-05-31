import {React , useState} from "react";
import {Box,TextField,Button,styled,Typography} from '@mui/material';

import { API } from "../service/api";



const Component = styled(Box)`
    width:400px;
    margin:auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`
const Image = styled('img')({
    width:100,
    margin:'auto',
    display:'flex',
    padding: '50px 0 0' 

})

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1; 
    flex-direction: column;
    & > div,& > button, & > p{
        margin-top: 20px;
    }
`

const LoginButton = styled(Button)`
   text-transform: none;
   background: grey;
   color:white;
   hieght: 35px;
   border-radius: 3px;
`

const SignupButton = styled(Button)`
   text-transform: none;
   background: white;
   color:grey;
   hieght: 35px;
   border-radius: 3px;
`

const Error = styled(Typography)`
   font-size:10px;
   color:#ff6161;
   line-hieght:0;
   margin-top:10px;
   font-wieght:400;
`
const signupInitialValues = {
    name:'',
    username:'',
    password: ''
}


const Login= ()=> {

    const[account , toggleaccount] = useState('login');
    const[signup, setSignup] = useState(signupInitialValues);
    const[error ,setError] = useState('');

    const toggleSignup = () =>{
        account === 'signup'? toggleaccount('login'):toggleaccount('signup');
    }


    const onInputChange= (e) => {
        setSignup({...signup, [e.target.name] : e.target.value});
    } 

    const imageURL = "https://images.pexels.com/photos/22689113/pexels-photo-22689113/free-photo-of-a-black-and-white-photograph-of-a-water-lily.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

    const signupUser = async () => {
        
        let response = await API.userSignup(signup);
        if(response.isSuccess){
            setError('');
            setSignup(signupInitialValues);
            toggleSignup('login');
        } else {
            setError('Something wenr wrong! Please try again later');
        }
        
    }
    
    
    
    return(
        <Component>
            <Box>
             <Image src={imageURL} alt="login"/>
            {
              account === 'login' ?
              <Wrapper>
                   <TextField variant="standard" label="Enter Username"/>
                   <TextField variant="standard" label="Enter Password"  />
                   <LoginButton variant="contained">Login</LoginButton>
                   <Typography style={{textAlign: 'center'}}>OR</Typography>
                   <SignupButton onClick={() => toggleSignup()}>Sign up</SignupButton>
              </Wrapper>
             :
              <Wrapper>
                   <TextField variant="standard" name="name" onChange={(e) => onInputChange(e)} label="Enter Name"/>
                   <TextField variant="standard" name="username" onChange={(e) => onInputChange(e)} label="Enter Username"/>
                   <TextField variant="standard" name="password" onChange={(e) => onInputChange(e)} label="Enter Password"/>

                   {error && <Error>{error}</Error>}
                   <SignupButton variant="contained" onClick={() => signupUser()}>Sign Up</SignupButton>
                   <Typography style={{textAlign: 'center'}}>OR</Typography>
                   <LoginButton  onClick={() => toggleSignup()} variant="contained">Already have account</LoginButton>
              </Wrapper>
            }   
            </Box>
        </Component>
    )
}

export default Login;
