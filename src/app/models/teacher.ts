import {Department} from "./department";
import {Course} from "./course";

export interface Teacher {
    id: number;
    full_name: string;
    email: string;
    designation: string;
    status: string;
    department: Department;
    courses: Course[]
}
