import {Department} from "./department";

export interface Teacher {
    id: number;
    full_name: string;
    email: string;
    designation: string;
    status: string;
    department: Department;
}
