import {React , useState} from "react";
import {Box,TextField,Button,styled,Typography} from '@mui/material';



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



const Login= ()=> {

    const[account , toggleaccount] = useState('login');

    const toggleSignup = () =>{
        account === 'signup'? toggleaccount('login'):toggleaccount('signup');
    }

    const imageURL = "https://images.pexels.com/photos/22689113/pexels-photo-22689113/free-photo-of-a-black-and-white-photograph-of-a-water-lily.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
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
                   <TextField variant="standard" label="Enter Name"/>
                   <TextField variant="standard" label="Enter Username"/>
                   <TextField variant="standard" label="Enter Password"/>
                   <SignupButton variant="contained">Sign Up</SignupButton>
                   <Typography style={{textAlign: 'center'}}>OR</Typography>
                   <LoginButton  onClick={() => toggleSignup()} variant="contained">Already have account</LoginButton>
              </Wrapper>
            }   
            </Box>
        </Component>
    )
}

export default Login;
