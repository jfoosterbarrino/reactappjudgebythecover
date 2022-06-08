import React, {useContext} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import EditButton from './Button';
import {BookContext} from '../context/BookContext';
// import useBook from '../hooks/useBook';
// import CircularProgress from '@mui/material/CircularProgress';
// import Error from './Error';
// import Box from '@mui/material/Box';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function BookCard({book}) {
  const [expanded, setExpanded] = React.useState(false); 
  const {addBook, removeBook, readingList} = useContext(BookContext)

  
  // const {error, book} = useBook(21)

  // if(error){
  //   return(
  //     <Box sx={{display:"flex"}}>
  //       <Error>{error}</Error>
  //     </Box>
  //   )
  // }

  // if(!book){
  //   return(
  //     <Box sx={{display:"flex"}}>
  //       <CircularProgress/>
  //     </Box>
  //   )
  // }

  

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      {console.log(book)}
    <Typography color="secondary">
      <CardHeader
        // avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //     R
        //   </Avatar>
        // }
        action={
          <IconButton aria-label="Add to My List" color="success">
            <AddCircleOutlineOutlinedIcon key="add" onClick={()=>{addBook(book)}}/>
          </IconButton>
        }
        title={book?.title}
        subheader={book?.author}
      />
    </Typography>
      <CardMedia
        component="img"
        height="194"
        image={book?.img}
        alt={book?.title}
      />
      <CardContent>
        <Typography  variant="body2" color="secondary">
        {book?.summary}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>            
          <hr/>
            <br/>
          <Typography variant="body2" color="primary" sx={{display:"flex", justifyContent: 'center'}} paragraph>
            ID: {book?.id}
          </Typography>
          <Typography variant="body2" color="primary" sx={{display:"flex", justifyContent: 'center'}} paragraph>
            Pages: {book?.pages}
          </Typography>
          <Typography variant="body2" color="primary" sx={{display:"flex", justifyContent: 'center'}} paragraph>
            Subject: {book?.subject}
          </Typography>
          <Typography sx={{display:"flex", justifyContent: 'center'}} paragraph>
            {readingList.includes(book)?
            <EditButton color="info" key="remove" onClick={()=>{removeBook(book)}}>Remove From List</EditButton>
            :
            <EditButton color="info" key="add2" onClick={()=>{addBook(book)}}>Add To My List</EditButton>
            }
          </Typography>
          
        </CardContent>
      </Collapse>
    </Card>
  );
}
 

