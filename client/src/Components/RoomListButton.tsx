import { createStyles } from "@mantine/core";


interface RoomListButtonProps {
  room: {
    name: string;
    users: string[];
  };
  onClick: () => void;
}


  
  

function RoomListButton({ room, onClick }: RoomListButtonProps) {
  const useStyles = createStyles((theme) => ({
    button1: {
      background: "#54FFF5",
      color: "black",
      fontSize: "1.3rem",
      transition: "all 0.3s ease",
      cursor: "pointer",
      borderRadius: "1rem",
      padding: '10px',
      margin: '5px',
  
      "&:hover": {
        background: "#4dd8cf",
      },
  
      "&:active": {
        transform: "scale(0.95)",
      },
    },
    list: {
      listStyle: "none",
      paddingLeft: 0,
    },    

  }));

  const {classes} = useStyles()

  return (
    <div
      onClick={onClick} className={classes.button1}
    >
      <strong>{room.name}:</strong>
      <ul className={classes.list}>
        {room.users.map((user: string, index: number) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
}

export default RoomListButton;
