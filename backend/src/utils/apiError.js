class apiError extends Error{
    constructor(
        message= "something went wrong",
        statusCode ,
        errors =[]
    ){
        super(message)
        this.message = message
        this.statusCode = statusCode
        this.success = false,
        this.errors = errors
    }
}

export {apiError}