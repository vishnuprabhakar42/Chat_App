
import {Box} from "@chakra-ui/react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import {   useState} from "react";
// import {useNavigate} from "react-router-dom";
import { ChatState } from "../context/ChatProvider";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";

const ChatPage = () => {
  // const navigate=useNavigate();
    const {user}=ChatState();
    const [fetchAgain,setFetchAgain]=useState(false);

    // useEffect(()=>{
    // const userInfo=JSON.parse(localStorage.getItem("userInfo"));
    
   

    // if(!userInfo){
    //   navigate("/");
    // }

    // },[navigate]);
 
  

  return (
    <div style={{ width: "100%" }}>
    {user && <SideDrawer />}
    <Box display="flex" justifyContent="space-between" width="100%" height="91.5vh" padding="10px">
      {user && <MyChats fetchAgain={fetchAgain} />}
      {user && (
        <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      )}
    </Box>
  </div>
  )
}

export default ChatPage;