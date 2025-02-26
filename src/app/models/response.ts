export interface Response<T> {
    status: boolean;
    code: number;
    message: string | null;
    errors: string | null;
    data: T;
}

export interface SingleItemResponse<T> {
    [key: string]: T;
}

export interface ListResponse<T> {
    items: T[];
}

export interface PaginatedResponse<T> extends ListResponse<T> {
    current_page: number;
    total_pages: number;
    page_size: number;
    total_items: number;
}
