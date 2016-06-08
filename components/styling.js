
module.exports = require('react-native').StyleSheet.create({
  borderText: {
    borderWidth: 1,
    borderColor: "silver",
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
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#3B82FC',
  },
  h1: {
    fontSize: 36,
    color: "#005EFB",
    fontWeight: "bold",
  },
  h2: {
    fontSize: 24,
    fontStyle: "italic",

  },
  h3: {
    fontSize: 19,
    color: "#FFA64C",
  },
  h4: {
    fontSize: 16,
    color: "black",
  },
  h5: {
    fontSize: 14,
    color: "#464646"
  },
  header: {
    backgroundColor: "lightgray",
    height: 44,
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
    marginTop:4,
    marginBottom: 4,

  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  p: {
    fontSize: 12,
    color: "black"
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: "white"
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
