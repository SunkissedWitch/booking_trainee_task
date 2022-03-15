import { Alert, Snackbar } from '@mui/material';


export function ErrorAlert(props) {
  const { errors, open } = props;


  if (errors.length > 0) {
    const rooms = errors.map((item) => {
      const ID = item.id + 1;
      return ID;
    }).join(", ");
    
    return (
      <Snackbar open={open} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        {
            rooms.length < 2 
          ? <Alert severity="error">The room {rooms} is canceled</Alert> 
          : <Alert severity="error">The rooms {rooms} are canceled</Alert>   
        }
      </Snackbar>
    )
  }

  return ;
}