import colors from './colors'
export default {
  heading: {
    color: colors.black,
    fontSize: 20,
    textAlign: 'center',
  },
  text: {
    color: colors.black,
    fontSize: 17,
    textAlign: 'center',
  },
}

/* to use in screens with spread operator
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  heading: {...palette.heading, ...{
    marginTop: 72
  }}
})*/
