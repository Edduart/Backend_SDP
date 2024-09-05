import { Router } from "express";
import { CourseController } from "../course/course.controller";
import { CourseDataSourceImpl } from "../../infrastructure";
import { CourseRepositoryImpl } from "../../infrastructure";

const router = Router();
const datasource = new CourseDataSourceImpl();
const courseRepository = new CourseRepositoryImpl(datasource);
const courseController = new CourseController(courseRepository);

//router.post("/", courseController.createCourse);
router.get("/", courseController.getCourses);
router.get("/:id", courseController.getCourseById);
router.put("/:id", courseController.updateCourseById);
//router.delete("/:id", courseController.deleteCourse);
module.exports = router;
