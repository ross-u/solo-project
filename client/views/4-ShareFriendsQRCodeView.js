import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import {  Avatar, Icon } from 'react-native-elements';
import QRCode from 'react-native-qrcode';
import { connect } from 'react-redux';
import { storeFriendsProfileJSONString }  from '../redux/actions/actions';
import { backgroundColor, headerColor, accentColor, accentColorShadow, dimmedAccentColor } from '../utils/style';
import HeadersActions from './../components/HeadersActions';

const { width } = Dimensions.get('window');

class ShareFriendsQRCodeView extends Component {
  static navigationOptions = {
    headerLeft: null,
    headerBackgroundTransitionPreset: 'toggle',
    title: 'Share QR Code',
    headerRight: (
      <HeadersActions></HeadersActions>),
    headerStyle: { backgroundColor: headerColor },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {
    const { navigation } = this.props;
    let contact = navigation.getParam('contact');


    const { fName, lName, occupation, currentLocation: loc, email, birthplace  } = contact.personal;
    const { facebook, instagram, twitter, blog } = contact.social;
    const { linkedIn, github, cv, website } = contact.networking;
    const {photo} = contact;

    const  QRCstring  = this.props.friendsProfileInViewJSONString;
    console.log('QRCstring.length', QRCstring.length);
    console.log('QRCstring ', QRCstring );
    
    return (
      <View style={styles.container}>
        <View style={styles.profileWrapper}>
          <Avatar
            avatarStyle={{ borderWidth: 1, borderColor: accentColorShadow }}
            large
            rounded
            source={{ uri: photo }}
            onPress={() => console.log("Works!")}
          />
          <Text style={styles.name}> {`${fName} ${lName}`} </Text>
          <Text style={styles.jobtitle}> {`${occupation}`} </Text>

          <Text style={styles.addMe}>Scan to add {fName}</Text>

        </View>
        <View style={styles.qrcWrapper}>
          <QRCode
            style={styles.qrc}
            value={QRCstring}
            size={270}
            bgColor='black'
            fgColor='white'
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={styles.buttonText}> Go Back</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor,
    flex: 1,
    alignItems: 'center'
  },
  profileWrapper: {
    alignItems: 'center',
    paddingTop: 10,
  },
  qrcWrapper: {
    backgroundColor: backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: dimmedAccentColor,
    borderWidth: 2,
  },
  name: {
    fontSize: 26,
    color: "white"
  },
  jobtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: "white"
  },
  addMe: {
    fontSize: 18,
    fontWeight: '600',
    color: dimmedAccentColor,
    marginTop: 10,
    marginBottom: 10
  },
  button :{
    width: width - 180,
    padding: 10,
    marginTop: 10,
    backgroundColor: accentColor,
    color: 'black',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderBottomColor: accentColorShadow,
    borderLeftColor: accentColorShadow,
    borderRightColor: accentColorShadow,
    borderBottomWidth: 4,
    borderLeftWidth: 0.3,
    borderRightWidth: 0.3,
  },
  buttonText: {
    fontSize: 20
  },
  qrc: {
    backgroundColor: backgroundColor,
  }
});

const mapStateToProps = (state) => ({
  friendsProfileInViewJSONString: state.friendsProfileInViewJSONString
});

const mapActionToProps = (dispatch) => ({
  storeFriendsProfileJSONString: ((JSONString) => dispatch(storeFriendsProfileJSONString(JSONString)))
});

export default connect(mapStateToProps, mapActionToProps)(ShareFriendsQRCodeView);