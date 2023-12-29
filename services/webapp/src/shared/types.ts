// A task to be done
export interface Todo {
    id: string;
    task: string; // Task details
    done: boolean; // Was this task completed?
    categoryId?: string; // Optional category ID
}

// A task category
export interface Category {
    id: string;
    label: string;
}
