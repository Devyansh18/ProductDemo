import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 20,
    width: width * 0.8,
    marginLeft: width * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //   backgroundColor: 'blue'
  },
  loginText: {
    fontSize: width * 0.07,
    marginLeft: width * 0.1,
    marginVertical: height * 0.05,
    color: 'black',
  },
  emailIcon: {
    height: height * 0.03,
    width: width * 0.05,
  },
  emailInput: {
    width: width * 0.9,
    fontSize: width * 0.04,
    color: 'black',
    paddingBottom: 5,
    marginLeft: width * 0.04,
  },
  forgotBox: {
    alignItems: 'flex-end',
    marginTop: height * 0.001,
  },
  forgotText: {
    color: 'blue',
    fontWeight: '600',
    fontSize: width * 0.035,
    marginRight: width * 0.1,
  },
  loginBox: {
    width: width * 0.85,
    justifyContent: 'center',
    backgroundColor: '#3b5998',
    alignSelf: 'center',
    borderRadius: 15,
    height: height * 0.07,
    marginTop: width * 0.12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  login: {
    color: 'white',
    textAlign: 'center',
    width: width * 0.2,
  },
});
