import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  InputAccessoryView,
  Keyboard,
  TextInput,
  ScrollView,
  Button,
  Alert,
} from 'react-native';

class Message extends React.PureComponent {
  render() {
    return (
      <View style={styles.textBubbleBackground}>
        <Text style={styles.text}>Text Message</Text>
      </View>
    );
  }
}

class TextInputBar extends React.PureComponent {
  state = {text: ''};

  render() {
    return (
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={text => {
            this.setState({text});
          }}
          value={this.state.text}
          placeholder={'Type a message...'}
        />
        <Button
          onPress={() => {
            Alert.alert('You tapped the button!');
          }}
          title="Send"
        />
      </View>
    );
  }
}

class InputAccessoryViewExample extends React.Component {

  state = {
    keyboardShown: false,
  };
  
  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  
  _keyboardDidShow = (event) => {
    const { duration } = event;
    if (!duration) {
      return;
    }
    this.setState({ keyboardShown: true });
  }

  _keyboardDidHide = (event) => {
    if (!event) {
      return;
    }
    const { duration } = event;
    if (!duration) {
      return;
    }
    this.setState({ keyboardShown: false });
  }

  render() {
    const inputAccessoryViewStyle = {
      paddingBottom: this.state.keyboardShown ? 0 : 49,
    };
    const messages = Array(15)
      .fill()
      .map((_, i) => <Message key={i} />);
    return (
      <View>
        <ScrollView keyboardDismissMode="interactive">
          {messages}
        </ScrollView>
        <InputAccessoryView
          backgroundColor="#fffffff7"
          style={inputAccessoryViewStyle}
        >
          <TextInputBar />
        </InputAccessoryView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInputContainer: {
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
  },
  text: {
    padding: 10,
    color: 'white',
  },
  textBubbleBackground: {
    backgroundColor: '#2f7bf6',
    borderRadius: 20,
    width: 110,
    margin: 20,
  },
});

export default InputAccessoryViewExample;
