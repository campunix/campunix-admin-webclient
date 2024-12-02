export interface Data<T> {
    [key: string]: T;
}

export interface Response<T> {
    status: boolean;
    code: number;
    message: string | null;
    errors: string | null;
    data: Data<T>;
}
