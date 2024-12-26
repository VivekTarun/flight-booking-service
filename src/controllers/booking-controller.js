const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { BookingService } = require('../services')

async function createBooking(req, res) {
    try {

        // Validate the incoming payload
        if (!req.body.flightId) {
            throw new AppError(
                "Flight ID is required to create a booking",
                StatusCodes.BAD_REQUEST
            );
        }

        // Create booking
        const booking = await BookingService.createBooking({
            flightId: req.body.flightId,
        });

        // Send success response
        SuccessResponse.data = booking;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        // Fallback for errors without a statusCode
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        ErrorResponse.error = {
            message: error.message || "An unexpected error occurred",
            explanation: error.explanation || [],
        };
        return res.status(statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createBooking,
    
};