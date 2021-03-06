import React, { Component } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { connect } from "react-redux";
import {
  storeContacts,
  storeMyId,
  storeMyProfile
} from "../redux/actions/actions";

import HeadersActions from "../components/HeadersActions";
import ContactsScrollPanel from "../components/ContactsScrollPanel";
import DashboardActions from "../components/buttons/DashboardActions";

import { backgroundColor, headerColor, accentColor } from "../utils/style";
import { API_URL } from "../config";

const BASE_URL = `${API_URL}/user-friends`;

class Dashboard extends Component {
  state = {
    noContactsToShow: false
  };

  static navigationOptions = {
    headerLeft: null,
    headerBackgroundTransitionPreset: "toggle",
    title: "Dashboard",
    headerRight: <HeadersActions />,
    headerStyle: { backgroundColor: headerColor },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  getMyContacts = async () => {
    await fetch(`${BASE_URL}/${this.props.myID}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(rawData => rawData.json())
      .then(contacts => {
        let myProfile = contacts.splice(contacts.length - 1, 1);
        this.props.storeMyProfile(myProfile[0]);
        this.props.storeContacts(contacts);
      })
      .catch(err => {
        setTimeout(() => {
          this.setState({ noContactsToShow: true });
          console.error("getMyContactsError", err);
        }, 1000);
      });
  };

  componentDidMount() {
    setTimeout(() => {
      this.getMyContacts();
    }, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.noContactsToShow ? (
          <View style={styles.container}>
            <View style={styles.noContactsMessageWrapper}>
              <View style={{ paddingBottom: 149, alignItems: "center" }}>
                <Image
                  source={require("./../assets/addapp_logo_square_transparent.png")}
                  style={{ width: 150, height: 150 }}
                />

                <Text
                  style={{
                    paddingBottom: 10,
                    color: accentColor,
                    fontWeight: "600"
                  }}
                >
                  NO CONTACTS TO SHOW
                </Text>
                <Text
                  style={{
                    color: accentColor,
                    textDecorationLine: "underline"
                  }}
                >
                  Add contacts
                </Text>
              </View>

              <View style={styles.actionsWrapper}>
                <DashboardActions />
              </View>
            </View>
          </View>
        ) : (
            <View style={styles.container}>
              <View style={styles.scrollWrapper}>
                <ContactsScrollPanel />
              </View>

              <View style={styles.actionsWrapper}>
                <DashboardActions />
              </View>
            </View>
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor
  },
  scrollWrapper: {
    flex: 1,
    paddingTop: 10,
    alignItems: "center"
  },
  noContactsMessageWrapper: {
    flex: 1,
    height: 400,
    paddingTop: 120,
    justifyContent: "center",
    alignContent: "center"
  },
  actionsWrapper: {
    height: 120,

    borderColor: "#252427",
    borderTopWidth: 3,
    borderRadius: 2,
    shadowColor: headerColor
  }
});

const mapStateToProps = state => ({
  contacts: state.contacts,
  me: state.myProfile,
  myID: state.myID
});

const mapActionToProps = dispatch => ({
  storeContacts: contacts => dispatch(storeContacts(contacts)),
  storeMyId: id => dispatch(storeMyId(id)),
  storeMyProfile: myProfile => dispatch(storeMyProfile(myProfile))
});

export default connect(
  mapStateToProps,
  mapActionToProps
)(Dashboard);
