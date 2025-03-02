import {Teacher} from "./teacher";
import {Course} from "./course";

export interface TeacherCourseIn {
    course_id: number;
    teacher_ids: number[];
}

export interface TeacherCourses {
    id: number;
    teacher: Teacher;
    course: Course;
}
