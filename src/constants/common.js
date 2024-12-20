import { Dimensions } from "react-native";


export const supabaseUrl= 'https://fayfjbbiyanfviwnhkch.supabase.co';
export const supabaseAnonKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZheWZqYmJpeWFuZnZpd25oa2NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY1NTAyOTYsImV4cCI6MjA0MjEyNjI5Nn0.DB_IK0OG0aLNmBjkwsAI3URLmNRJQ2P_VnJ0zdBv3Yg'


const {width:deviceWidth, height:deviceHeight} = Dimensions.get('window');

export const hp = percentage =>{
  return (percentage *deviceHeight)/100;
}

export const wp = percentage =>{
    return (percentage *deviceWidth)/100;
  }


  export const getRoomId = (userId1, userId2)=>{
    const sortedIds = [userId1, userId2].sort();
    const roomId = sortedIds.join('-')
    return roomId;
}

export const formatDate =date=>{
    var day = date.getDate();
    var monthNames = ['Jan','Feb','Mar', 'Apr','May','June', 'July', 'Aug', 'Sept','Oct', 'Nov', 'Dec'];
    var month = monthNames[date.getMonth()];

    var formattedDate = day + ' '+ month;
    return formattedDate;

}

export const stripHtmlTags =(html)=>{
  return html.replace(/<[^>]*>?/gm,'');
}

