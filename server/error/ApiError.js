class ApiError extends Error{
    constructor(status, message ) {
        super();
        this.status = status
        this.message = message
    }


    static internal(message) {
        return new ApiError(505, message)
    }

    static forbidden(message) {
        return new ApiError(403, message)
    }
    
}
module.exports = ApiError