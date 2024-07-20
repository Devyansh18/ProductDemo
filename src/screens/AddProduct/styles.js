import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("window")

export default StyleSheet.create({
    mainContainer : {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer1: {
        borderBottomWidth: 1, // You can adjust the width of the border as needed
        borderBottomColor: 'gray', // You can change the color of the border as needed
        marginBottom: 20,
        width: width * 0.8, // Adjust this value to create spacing between input fields
        marginLeft: width * 0.04,
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
     //   backgroundColor: 'blue'
        
    },
    inputStyle : {
        width: width * 0.9,
        fontSize: width * 0.04,
        color: 'black',
        paddingBottom: 5,
        marginLeft: width * 0.03,
    },
    urlText : {
        color: 'black',
        width: width * 0.85,
        marginLeft: width * 0.15,
    },
    imagePickerBox : {
        width: width * 0.7,
        justifyContent: 'center',
        backgroundColor: 'gray',
        alignSelf: 'center',
        borderRadius: 15,
        height: height * 0.07,
        marginTop: width * 0.12,
    },
    imagePickerBox1 : {
        width: width * 0.85,
        justifyContent: 'center',
        backgroundColor: '#3b5998',
        alignSelf: 'center',
        borderRadius: 15,
        height: height * 0.07,
        marginTop: width * 0.12,
    },
    chooseText : {color: 'white', textAlign: 'center'},
    imagepic: {
        borderWidth: 1,
        // borderStyle: "dashed",
        borderColor: 'blue',
        width: width * .9,
        marginTop :height * .03,
        height: height * .05,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        gap: width * .02,
        alignSelf:'center'
    },
    pic: {
        color: 'blue',
        fontSize: width * .04

    },
    upload: {
        color: 'blue',
        fontSize: width * .05
    },
    emailIcon: {
        height: height * 0.03,
        width: width * 0.05,
      },
      inputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginBottom: 20,
        width: width * 0.8,
        marginLeft: width * 0.04,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        //   backgroundColor: 'blue'
      },
      emailInput: {
        width: width * 0.9,
        fontSize: width * 0.04,
        color: 'black',
        paddingBottom: 5,
        marginLeft: width * 0.01,
      },
      shopName: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: width * 0.06,
        // marginLeft: width * 0.05,
        marginVertical: height * 0.04,
        alignSelf: 'center'
      },
})