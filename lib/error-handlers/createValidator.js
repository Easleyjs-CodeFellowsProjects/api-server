function createValidator(newPlayerObj, path) {
    console.log(path);

    const keys = path === '/player' ? ['name', 'state'] : ['name', 'level'];
    let errors = [];
    keys.forEach(key => {
        if (!newPlayerObj[key]) errors.push(key + " must not be null.")
    });
    if (errors.length !== 0) {
        return {
            code: 500,
            message: errors.join('\n')
        }
    }
}

module.exports = createValidator;