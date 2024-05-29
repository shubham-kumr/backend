class ApiError extends Error {
    constructor(
        statusCode,
        maessage= "Something went wrong",
        errors = [],
        statck = ""
    ){
        super(meassage)
        this.statusCode = statusCode
        this.data = null,
        this.message = message
        this.success = false;
        this.errors = errors

        if(statck) {
            this.stack = statck;
        } else {
            Error.captureStacktree(this, this.constructor)
        }
    }
}

export {ApiError}