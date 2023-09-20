function createValidator(newPlayerObj) {
    let errors = [];
    Object.keys(newPlayerObj).forEach(key => {
        if (!newPlayerObj[key]) errors.push(key + " must not be null.")
    });
    return errors
}

module.exports = createValidator;