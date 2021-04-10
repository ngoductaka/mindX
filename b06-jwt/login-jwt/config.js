const errorMessage = (err) => ({
    "errors": {
        "body": err
    }
})

module.exports = {errorMessage}