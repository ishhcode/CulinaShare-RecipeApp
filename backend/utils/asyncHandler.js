const asyncHandler = (requestHandler) =>
    {return(req, res, next) => {
        // Promise.resolve() is used to convert non-Promise values to Promises
        // This allows the requestHandler to be both synchronous and asynchronous

        // Execute the requestHandler function and handle any errors
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }};

export { asyncHandler }