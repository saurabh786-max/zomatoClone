class apiError extends Error{
    constructor(
        message= "something went wrong",
        statusCode ,
        error =[]
    ){
        super(message)
        this.message = message
        this.statusCode = statusCode
        this.success = false,
        this.error = error
    }
}

export {apiError}