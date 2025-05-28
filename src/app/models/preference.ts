export interface Preference {
    id: number;
    teacher_id: number;
    teacher_name: string;
    department_id?: number;
    day?: string;
    slot_no?: number;
}
