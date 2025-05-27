import {Teacher} from "./teacher";

export interface TeacherCourseIn {
    course_id: number;
    teacher_ids: number[];
}

export interface TeacherCourses {
    id: number;
    course: CourseDetails;
}

export interface CourseDetails {
    id: number;
    title: string;
    code: string;
    course_teachers: Teacher[]
}
