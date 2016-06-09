
module.exports = require('react-native').StyleSheet.create({
  backgroundImage:{
    flex: 1,
    width: null,
    height: null,
  },
  blank:{
    justifyContent: 'space-around',
    alignItems:'stretch',
    flex:1,
  },
  borderText: {
    borderWidth: 1,
    borderColor: "silver",
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 70,
  },
  button: {
    height: 36,
    backgroundColor: '#6600ff',
    borderColor: '#6600ff',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 20,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: '#3B82FC',
  },
  description: {
    fontSize: 40,
    textAlign: 'center',
    color: 'black',
    marginTop: 50,
  },
  downButton: {
    flex: 1,
  },
  h1: {
    fontSize: 36,
    color: "#005EFB",
    fontWeight: "bold",
    textAlign: "center"
  },
  h2: {
    fontSize: 24,
    fontStyle: "italic",
    textAlign: "center"
  },
  h3: {
    fontSize: 19,
    color: "#FFA64C",
    textAlign: "center"
  },
  h4: {
    fontSize: 16,
    color: "black",
    textAlign: "center"
  },
  h5: {
    fontSize: 14,
    color: "#464646",
    textAlign: "center"
  },
  header: {
    backgroundColor: "lightgray",
    // height: 44,
  },
  headerText: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: 'center',
    paddingTop: 20,
  },
  innerContainer: {
    flex: 1,
    flexDirection:'row',
    alignSelf: 'stretch',
  },
  innerWrapper: {
    flex: 1,
    paddingTop: 43,
    paddingBottom: 43,
    marginTop:6,
    marginBottom: 6,
    backgroundColor: "#e5e5e5",
    marginRight: 12,
    marginLeft: 12,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: {height: 2, width: 2, blur: 5}
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    // color: 'white',
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  noGameText:{
    fontSize:22,
    color:'#136AFF',
    fontWeight: 'bold',
    paddingTop:2,
    textAlign:'center',
    justifyContent: 'center',
    justifyContent: 'space-around'
  },
  p: {
    fontSize: 12,
    color: "black",
    textAlign: "center"
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: "white"
  },
  teamProfileButtons: {
    borderRadius: 0,
    borderColor: "black",
    borderWidth: 1,
  },
  teamProfileBox: {
    flex: 1,
    borderWidth: 2,
    backgroundColor: 'black',
    // backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingTop: 150,
    opacity: 0.8
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    color: 'black'
  },
  textCenter: {
    textAlign: "center"
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})
