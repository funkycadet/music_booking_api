import { EventController } from "../controllers";
import { Router } from "express";
import { validateJWT, validateReqBody, checkRole } from "../middlewares";
import { createEventSchema, updateEventSchema } from "../validations";

const eventController = new EventController();

const eventRouter = Router();
eventRouter.use(validateJWT());

eventRouter.get("/", eventController.getAll);
eventRouter.post("/", checkRole("artist", "admin"), validateReqBody(createEventSchema), eventController.createEvent);
eventRouter.get("/:id", eventController.getEventById);
eventRouter.patch("/:id", checkRole("artist", "admin"), validateReqBody(updateEventSchema), eventController.updateEvent);
eventRouter.delete("/:id", checkRole("artist", "admin"), eventController.deleteEvent);

export default eventRouter;

