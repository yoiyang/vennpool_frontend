// First landing page upon opening app
import React, {Component} from 'react';
import { Alert, StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView, Dimensions, Animated  } from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import { Button, ThemeProvider } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../styles/ProfileStyles.js';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import {signOut,updateUserOnDatabase} from "../actions/auth_actions";

// Required: name
// Optional: picture
// Optional: carColor
// Optional: carMake
// Optional: carModel
// Optional: phone 

class ProfileScreen extends Component{

  onSignOutSuccess(){
    Actions.Welcome();
  }
  onError(message){
    console.log(`Error: ${message}`);
    Alert.alert('Error.');
  }
  onSignOut = () => {
    console.log("Trying to log out.")
    this.props.signOut(
        this.props.db_token,
        this.props.user['fb_id'],
        this.onSignOutSuccess,
        this.onError
    );
  }
  onUpdateSuccess(){
    console.log("Update success");
    Alert.alert('updated!');
    Actions.Home();
  }
  onUpdateProfile = () => {
    console.log("Updating profile");
    // reorganize the data to to fit the database model
    const user_data = {
      id: this.props.user['id'],
      phone: this.state.phone,
      name : this.state.name,
      fb_id : this.props.user['fb_id'],
      fbtoken : this.props.user['fbtoken'],
      car_info : this.state.carMake + '|' + this.state.carModel + '|' + this.state.carColor,
    };
    console.log(`submiting: ${JSON.stringify(user_data)}`);
    // create user on redux and gepu db
    this.props.updateUserOnDatabase(this.props.db_token, user_data, this.onUpdateSuccess, this.onError);
  }

  static navigationOptions = {
    title: 'Profile',
    headerStyle: {
      height: 75,
      backgroundColor: '#FAEBD7',
    },
    headerTintColor: 'black',
    headerTitleStyle:{
      fontSize: 30,
      fontWeight: 'normal'
    }
  };

  constructor(props){
    super(props);
    // name: this.props.user['name'], //'' or user_data.name(?)
    const car_info = this.props.user.car_info.split('|');
    
    const phone = (this.props.user.phone != null) ? this.props.user.phone : "";

    this.state = {
      ...this.props.user,
      carMake: car_info[0],       //''
      carModel: car_info[1],       //''
      carColor: car_info[2],       //''
      phone: phone,    //''
      clicked: false
    }
    if (this.state.fb_id)
      this.state.photoSource = {uri: `https://graph.facebook.com/${this.state.fb_id}/picture?type=large`};
    else
      this.state.photoSource = require('../../assets/profile.png');
  }

  render() {
    // async onSubmit(){
    //  Manage input entry validation and authentication
    //}
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <Image style={styles.img} source={this.state.photoSource}/>
          </View>
                
          <View style={styles.container}> 
            <Text style={styles.txtTitle}>Profile Info</Text>
            <TextInput
              style={styles.txt}
              onChangeText={(name) => this.setState({name})}
              keyboardType='default'
              value={this.state.name}
              placeholder={"First Name Last Name"}
              placeholderTextColor='gray'
              borderBottomColor='gray'
              borderBottomWidth={1}
            />
            <Text style={styles.txtExtra}>(Only shared to people in the same ride)</Text>
            <TextInput
              style={styles.txt}
              onChangeText={(phone) => this.setState({phone})}
              keyboardType={"number-pad"}
              value={this.state.phone}
              placeholder={"Enter your Phone Number"}
              placeholderTextColor='gray'
              borderBottomColor='gray'
              borderBottomWidth={1}
            />        
          </View>

          <View style={styles.container}>
            <Text style={styles.txtTitle}>Car Info</Text>
            <TextInput
              style={styles.txt}
              onChangeText={(carMake) => this.setState({carMake})}
              keyboardType='default'
              value={this.state.carMake}
              placeholder={"Enter your Car Make (i.e. Honda)"}
              placeholderTextColor='gray'
              borderBottomColor='gray'
              borderBottomWidth={1}
            />  
            <TextInput
              style={styles.txt}
              onChangeText={(carModel) => this.setState({carModel})}
              keyboardType='default'
              value={this.state.carModel}
              placeholder={"Enter your Car Model (i.e. Civic)"}
              placeholderTextColor='gray'
              borderBottomColor='gray'
              borderBottomWidth={1}
            />              
            <TextInput
              style={styles.txt}
              onChangeText={(carColor) => this.setState({carColor})}
              keyboardType='default'
              value={this.state.carColor}
              placeholder={"Enter your Car Color (i.e. Silver)"}
              placeholderTextColor='gray'
              borderBottomColor='gray'
              borderBottomWidth={1}
            />   
          </View>

          <View style={styles.container}>
            <TouchableOpacity 
              style={styles.signoutBtn} 
              onPress={this.onSignOut}>
                <Text style={styles.txtBtn}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <TouchableOpacity 
              style={styles.signoutBtn} 
              onPress={this.onUpdateProfile}>
                <Text style={styles.txtBtn}>Update</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  } // end of render
} // end of class

// give db token from redux to the component
function mapStateToProps(state) {
  // const { db_token,user } = state;
  return { db_token: state['auth']['db_token'], user: state['auth']['user'] }
}

export default connect(mapStateToProps, {signOut, updateUserOnDatabase })(ProfileScreen);
