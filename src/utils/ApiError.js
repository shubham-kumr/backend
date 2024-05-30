class ApiError extends Error {
    constructor(
        statusCode,
        maessage= "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(meassage)
        this.statusCode = statusCode
        this.data = null,
        this.message = message
        this.success = false;
        this.errors = errors

        if(stack) {
            this.stack = stack;
        } else {
            Error.captureStacktree(this, this.constructor)
        }
    }
}

export {ApiError}