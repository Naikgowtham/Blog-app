import { Box , Typography , styled } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState , useContext } from "react";
import { API } from "../service/api";
import {Edit , Delete} from '@mui/icons-material';
import {DataContext} from '../context/Dataprovider';


const Container = styled(Box)`
    margin: 50px 100px
`;

const Image = styled('img')({
    width: '100%' , 
    height: '60vh'
    // objectFit: 'cover'
})

const Heading = styled(Typography)`
    font-size: 38px;
    font-weiht: 700;
    text-align: center;
    margin: 50px 0 10px 0;
    word-break:break-word;
`

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`

const Author = styled(Box)`
    color: #878787;
    margin: 20px 0;
    display: flex;
`
const Description = styled(Typography)`
    word-break : break-word;
`


const DetailView = () => {
    const {id} = useParams();
    const [post , setPost] = useState({});
    const url = post.picture ? post.picture : 'https://images.pexels.com/photos/24778713/pexels-photo-24778713/free-photo-of-wooden-houses-in-village-in-mountains.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load';
    const {account} = useContext(DataContext);

    useEffect(() => {
        const fetchData = async() => {
            let response = await API.getPostById(id);
            if(response.isSuccess){
                setPost(response.data);
            }
        }
        fetchData();
    }, [])
    
    return (
        <Container>
            <Image src={url} alt="blog" />

            <Box style={{ float : 'right'}}>
                {   
                    account.username === post.username &&
                    <>
                        <EditIcon color="primary"/>
                        <DeleteIcon color="error"/>
                    </>
                }
            </Box>
            <Heading>{post.title}</Heading>

            <Author>
                <Typography>Author:<Box component='span' style={{fontWeight: 600}}>{post.username}</Box></Typography>
                <Typography style={{ marginLeft: 'auto'}}>{new Date(post.createdDate).toDateString()}</Typography>
            </Author>

            <Description>{post.description}</Description>
        </Container>
    )
}

export default DetailView;