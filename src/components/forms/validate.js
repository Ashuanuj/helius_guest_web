const validate = values => {
    const errors = {}
    if (!values.name) {
      errors.name = 'Required'
    } else if (values.name.length < 3) {
      errors.name = 'Minimum be 3 characters or more'
    }
    if (!values.roomno) {
      errors.roomno = 'Required'
    }
    if (!values.dob) {
      errors.dob = 'Required'
    }
    return errors
}

export default validate;