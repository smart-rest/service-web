class ValidationError extends  Error {
    constructor(message) {
        super(message);
        this.isClientError = true;
    }
}

module.exports = ValidationError;