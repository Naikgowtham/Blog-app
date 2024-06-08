import { Box, Typography, styled } from "@mui/material";
import {addElipsis} from '../utils/common-utils.js';

const Container = styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin: 10px;
    height: 400px; 
    display: flex;
    align-items: center;
    flex-direction: column;
    & > p {
        padding: 0 5px 5px 5px;
    }
`;

const Image = styled('img')({
    width: '100%',
    height: '60%', /* Set a max height for the image */
    objectFit: 'fill', /* Ensure the image scales properly */
    borderRadius: '10px 10px 0 0',
});

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`

const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
`

const Details = styled(Typography)`
    font-size: 14px;
    word-break: break-word;
`

const Post = ({ post }) => {

    const url = post.picture ? post.picture : 'https://images.pexels.com/photos/20157706/pexels-photo-20157706/free-photo-of-tram-on-street-by-estrela-basilica-in-lisbon-portugal.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load';
    return (
        <Container>
            <Image src={url} alt="blog" />
            <Text>{post.categories}</Text>
            <Heading>{addElipsis(post.title , 20)}</Heading>
            <Text>{post.username}</Text>
            <Details>{addElipsis(post.description,100)}</Details>
        </Container>
    );
};

export default Post;
