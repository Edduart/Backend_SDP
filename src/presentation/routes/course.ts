import { Router } from "express";
import { CourseController } from "../course/course.controller";
import { CourseDataSourceImpl } from "../../infrastructure";
import { CourseRepositoryImpl } from "../../infrastructure";
import { ValidatorTo } from "../services/TokenValidator";

const router = Router();
const dataSource = new CourseDataSourceImpl();
const courseRepository = new CourseRepositoryImpl(dataSource);
const courseController = new CourseController(courseRepository);

//router.post("/", courseController.createCourse);
router.get("/",     courseController.getCourses);
router.get("/:id",  courseController.getCourseById);
router.put("/:id",  ValidatorTo.ValidarToken, courseController.updateCourseById);
//router.delete("/:id", courseController.deleteCourse);
module.exports = router;
