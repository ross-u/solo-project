import React, { Component } from 'react';
import { View, StyleSheet, Text, Linking } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';

import HeadersActions from './../components/HeadersActions';

const canOpenURL = (url) => {
  Linking.canOpenURL(url).then(supported => {
    if (!supported) console.log('Can\'t handle url: ' + url);
    else return Linking.openURL(url);
  }).catch(err => console.error('An error occurred', err));
};

const shareProfileToQRC = (contact) => {
  console.log('+++', JSON.stringify(contact));
}

export default class ContactProfileView extends Component {
  static navigationOptions = {
    title: 'Add Contact',
    headerRight: (
      <HeadersActions></HeadersActions>),
  };

  render() {
    const { navigation } = this.props;
    let contact = navigation.getParam('contact');

    const { fName, lName, occupation, currentLocation: loc, email, birthplace  } = contact.personal;
    const { facebook, instagram, twitter, blog } = contact.social;
    const { linkedIn, github, cv, website } = contact.networking;
    const {photo} = contact;
    return (
      
      <View style={styles.container}>
        <View style={styles.contactsWrapper}>
          <Avatar
            xlarge
            rounded
            source={{ uri: photo }}
            onPress={() => console.log("Works!")}
          />
          <Text style={styles.name}> {`${fName} ${lName}`} </Text>
          <Text style={styles.jobtitle}> {`${occupation}`} </Text>
          <Text style={styles.details}>
            Lives in - {`${loc.country}, ${loc.place}`}
          </Text>
          {/* <Text style={styles.details}>from {`${birthplace.country}`} </Text> */}

          <Text 
            style={styles.website}>
            {`${website}`}
          </Text>

          <Icon
            style={{ position: 'absoulute', top: '100'}}
            type='font-awesome'
            name='share-alt'
            size={22}
            raised={true}
            onPress={() => shareProfileToQRC(contact)}
          />

        </View>
        <Text style={styles.category}> Social </Text>
        <View style={styles.iconsContainer}>
          <Icon
            type='entypo'
            name='facebook'
            size={28}
            raised={true}
            onPress={() => canOpenURL(facebook)}
          />

          <Icon style={styles.icons}
            type='font-awesome'
            name='instagram'
            color='#00aced'
            size={28}
            raised={true}
            onPress={() => canOpenURL(instagram)}
          />

          <Icon style={styles.icons}
            type='font-awesome'
            name='twitter'
            color='#517fa4'
            size={28}
            raised={true}
            onPress={() => canOpenURL(twitter)}
          />

          <Icon style={styles.icons}
            type='font-awesome'
            name='meetup'
            color='#517fa4'
            size={28}
            raised={true}
            onPress={() => canOpenURL(blog)}
          />
        </View>

        <Text style={styles.category}> Networking </Text>
        <View style={styles.iconsContainer}>
          <Icon
            type='entypo'
            name='linkedin'
            size={28}
            raised={true}
            onPress={() => canOpenURL(linkedIn)}
          />

          <Icon style={styles.icons}
            type='font-awesome'
            name='github'
            color='#00aced'
            size={28}
            raised={true}
            onPress={() => canOpenURL(github)}
          />

          <Icon style={styles.icons}
            type='font-awesome'
            name='user-circle-o'
            color='#517fa4'
            size={28}
            raised={true}
            onPress={() => canOpenURL(cv)}
          />

          <Icon style={styles.icons}
            name='mail-outline'
            color='#0984e3'
            size={28}
            raised={true}
            onPress={() => canOpenURL(email)}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contactsWrapper: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  name: {
    fontSize: 30
  },
  jobtitle: {
    fontSize: 20,
    marginBottom: 10
  },
  details: {
    fontSize: 16,
  },
  category: {
    fontSize: 14,
    margin: 10,
    alignItems: 'center'
  },
  website: {
    fontSize: 14,
    alignItems: 'center'
  }
})