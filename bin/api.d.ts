export declare type Book = {
    title?: string;
    subtitle?: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    industryIdentifiers?: [{
        type?: string;
        identifier?: string;
    }];
    pageCount?: number;
    categories?: string[];
    language?: string;
};
export declare const testISBN: (isbn: string) => boolean;
export declare const search: (isbn: string) => Promise<Book>;
