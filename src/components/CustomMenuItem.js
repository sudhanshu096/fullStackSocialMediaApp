import { MenuOption } from 'react-native-popup-menu';
import {View, Text, StyleSheet} from 'react-native'
import { hp } from '../constants/common';
import { theme } from '../constants/theme';



export const MenuItem =({text, action, value, icon}) =>{
  return(
    <MenuOption onSelect={()=>action(value)}>
        <View style={styles.container}>
           <Text style={{fontSize:hp(1.7), color:theme.colors.text}}>
            {text}
           </Text>
           {icon}
        </View>

    </MenuOption>
  )
}
const styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    gap:5
  }
})