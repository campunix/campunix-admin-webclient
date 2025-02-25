export interface Data<T> {
    items: T[];
    current_page: number | null;
    total_pages: number | null;
    page_size: number | null;
    total_items: number | null;
}

export interface Response<T> {
    status: boolean;
    code: number;
    message: string | null;
    errors: string | null;
    data: Data<T>;
}
