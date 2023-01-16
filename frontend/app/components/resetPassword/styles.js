import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submit: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    marginHorizontal: 5,
    marginVertical: 30,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    minHeight: 46,
  },
  noteText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    paddingHorizontal: 15,
    marginVertical: 10,
    fontWeight: '500',
  },
  submitText: {
    fontSize: 18,
    fontWeight: '600',
  },
  button: {
    borderRadius: 6,
    overflow: 'hidden',
    width: '100%',
  },
  buttonText: {
    padding: 10,
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  error: {
    marginHorizontal: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  errorText: {
    color: '#f00',
    fontSize: 14,
    fontWeight: 'bold',
  },
  errorIcon: {
    color: '#f00',
    marginRight: 8,
  },
  inputLabel: {
    width: '100%',
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 5,
    marginTop: 15,
  },
  inputWrap: {
    width: '100%',
    marginVertical: 8,
    borderRadius: 8,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  inputIcon: {
    marginRight: 14,
  },
  input: {
    paddingVertical: 13,
    fontSize: 16,
    fontWeight: '600',
    flexGrow: 1,
  },
})

export default styles
