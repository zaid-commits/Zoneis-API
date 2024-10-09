const errorHandler = (err, req, res, next) => {
    console.error(err.stack); 

    // Set the status code and send the error response
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Server Error',
    });
};

module.exports = errorHandler;