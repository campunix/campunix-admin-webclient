export interface Data<T> {
    [key: string]: T;
}

export interface Response<T> {
    status: string;
    message: string;
    data: Data<T>;
}
