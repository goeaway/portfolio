export interface Article {
    id: string;
    title: string;
    desc: string;
    content: string;
    tags: Array<string>;
    techs: Array<Technology>;
    type: ArticleType;
    featured: boolean;
    featuredImage?: string;
    githubLink?: string;
    liveLink?: string;
    enabled?: boolean;
}

export interface Technology {
    name: string;
    icon: string;
}

export enum ArticleType {
    project,
    tutorial
}

export interface Theme {
    background: Range;
    fontLight: Range;
    fontDark: Range;
    heroSrc: string;
    breakpoints: Breakpoints;
}

export interface Range {
    one: string;
    two?: string;
    three?: string;
    four?: string;
    five?: string;
}

export interface Breakpoints {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
}

export interface ArticlesService {
    articles: ReadonlyArray<Article>;
    get?: (id: string) => Promise<Article>;
    query?: (queryOptions: ArticlesServiceQueryOptions) => Promise<Array<Article>>;
}

export type ArticlesServiceQueryOptions = { term?: string } & Pick<Partial<Article>, "type" | "featured">;