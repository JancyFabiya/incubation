import {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import './Login.css'
import axios from 'axios'
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import MainScreen from '../../components/MainScreen';
const Login = () => {
 const [email,setEmail]=useState('')
 const [password, setPassword] = useState("");
 const [error, setError] = useState(false);
 const [loading, setLoading] = useState(false);
 const navigate = useNavigate();

//  useEffect(()=>{
// const userInfo = localStorage.getItem("userInfo");
// if(userInfo){
//   history.push('/signup');
// }
//  },[history])

 const submitHandler = async (e) =>{
  const userInfo = localStorage.getItem("userInfo");
  e.preventDefault()
  if(userInfo){
  navigate("/logged");
  }else{

  try {
    const config = {
      headers:{
        "Content-type":"application/json"
      }
    }
    setLoading(true)
    const {data}=await axios.post('/api/users/login',{
      email,
      password,
    },config
    );

    console.log(data);
    localStorage.setItem('userInfo',data._id)
    setLoading(false)
  } catch (error) {
    setError(error.response.data.message)
    setLoading(false)    
  }
}
 }
  return (
    <MainScreen title=' LOGIN'>

    <div className='loginPage'>
      <Container>
        {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
      {loading && <Loading />}

        <Row>
        <Card>
      <Card.Body>

    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label >Email address</Form.Label>
        <Form.Control  type="email"
        value={email}
         placeholder="Enter email"
         onChange={(e)=>setEmail(e.target.value)}
          />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"
                value={password}
         placeholder="Password" 
         onChange={(e)=>setPassword(e.target.value)}
         />
      </Form.Group>
     
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <div className="mt-3 ">
            New Customer ?{" "}
            <Link to="/signup" className="decor">
              Register Here
            </Link>
          </div>
    </Card.Body>
    </Card>

        </Row>
      </Container>
    </div>
    </MainScreen>

  );
}

export default Login;
