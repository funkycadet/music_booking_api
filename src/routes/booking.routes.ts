import { BookingController } from "../controllers";
import { Router } from "express";
import { validateJWT, validateReqBody, checkRole } from "../middlewares";
import { createBookingSchema, updateBookingSchema } from "../validations";

const bookingController = new BookingController();

const bookingRouter = Router();
bookingRouter.use(validateJWT());

bookingRouter.get("/", bookingController.getAll);
bookingRouter.post("/", checkRole("user", "admin"), validateReqBody(createBookingSchema), bookingController.createBooking);
bookingRouter.get("/:id", bookingController.getBookingById);
bookingRouter.patch("/:id", checkRole("user", "admin"), validateReqBody(updateBookingSchema), bookingController.updateBooking);
bookingRouter.delete("/:id", checkRole("user", "admin"), bookingController.deleteBooking);

export default bookingRouter;

