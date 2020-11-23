import { Article, ArticlesService, ArticlesServiceQueryOptions } from "@src/types";
import { createContext } from "react";

export const Service : ArticlesService = {
    articles: [],
};

const getAll = () : Promise<Array<Article>> => new Promise(async(res, rej) => {
    const response = await fetch("/articles.json");

    if(response.ok) {
        const data = await response.json() as { articles: Array<Article>};
        res(data.articles);
    } else {
        rej(response.statusText);
    }
});

Service.get = (id: string) => {
    // try cache otherwise use fetch request to get articles.json
    return new Promise(async(res, rej) => {
        if(!Service.articles.length) {
            Service.articles = await getAll();
        }

        res(Service.articles.find(a => a.id === id));
    })
};

Service.query = (queryOptions: ArticlesServiceQueryOptions) => {
    return new Promise(async(res, rej) => {
        // if the array is empty we may have not requested data yet, try get data first
        if(!Service.articles.length) {
            Service.articles = await getAll();
        }

        // resolve by filtering the data by the options
        res(Service.articles.filter(a => {
            let result = true;

            if(queryOptions.term) {
                // disqualify by default now
                result = false;
                const primedTerm = queryOptions.term.toLowerCase();
                // if lower title does not include the term
                if(!result && a.title && a.title.toLowerCase().includes(primedTerm)) {
                    result = true;
                }

                // if lower desc does not include the term
                if(!result && a.desc && a.desc.toLowerCase().includes(primedTerm)) {
                    result = true;
                }

                // if zero lower tech names includes term
                if(!result && a.techs && a.techs.length && a.techs.some(t => t.name.toLowerCase().includes(primedTerm))) {
                    result = true;
                }

                // if zero lower tags includes term
                if(!result && a.tags && a.tags.length && a.tags.some(t => t.toLowerCase().includes(primedTerm))) {
                    result = true;
                }
            }

            if(result && queryOptions.featured != null && a.featured !== queryOptions.featured) {
                result = false;
            }

            if(result && queryOptions.type != null && a.type !== queryOptions.type) {
                result = false;
            }

            // nothing disqualifies this item
            return result;
        }));
    });
};

const ArticlesServiceContext = createContext<ArticlesService>(Service);

export default ArticlesServiceContext;