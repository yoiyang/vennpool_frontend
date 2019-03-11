import { StyleSheet, View, Text, Image, ScrollView, Dimensions, Animated  } from 'react-native';

const styles = StyleSheet.create({


  // Used for input box styling
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAEBD7',
    flex: 1
  },
  containerTop:{
    flex:2
  },
  containerBottom:{
    flex: 3
  },
  inputRow:{
    flexDirection: 'row',
    justifyContent:'space-evenly',
    alignItems: 'center',
  },
  txtInput: {
    width: 200,
    height:30,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
    backgroundColor: 'white'
  },
  inputTitle:{
    textAlign: 'left',
    fontSize: 15,
    width:50
  },
  spacer:{
    flex:0.05
  },
  img:{
    height: 150,
    width: 150,
    margin: 20
  },
  // For input styling (
  btn: {
    height: 30,
    width: 200,
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: 'orange'
  },
  txtBtn:{
    textAlign: 'center',
    fontSize: 20
  }
});

export default styles;