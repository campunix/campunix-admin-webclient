export interface SyllabusData {
    department_id: number;
    title: string;
    description: string;
    is_active: null;
    syllabus: Syllabus;
}

export interface Syllabus
{
    department_code: string;
    department_name: string;
    semesters: SyllabusSemester[];
}

export interface SyllabusSemester
{
    year: number;
    number: number;
    courses: SyllabusCourse[];
}

export interface SyllabusCourse
{
    course_code: string;
    title: string;
    credit: number;
    prerequisite: string;
    type: string;
    contact_hours: number;
    rationale: string;
    course_objectives: string[];
    outcomes: string[];
    course_description: SyllabusCourseDescription[];
    recommended_books: SyllabusRecommendedBook[];
    hardware_software_requirements: SyllabusCourseHardwareSoftwareRequirement;
}

export interface SyllabusCourseDescription
{
    module: string;
    content: string;
}

export interface SyllabusRecommendedBook
{
    title: string;
    author: string;
    publisher: string;
    year: string;
}

export interface SyllabusCourseHardwareSoftwareRequirement
{
    HW: string;
    SW: string;
}