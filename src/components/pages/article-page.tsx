import useArticlesService from "@src/hooks/use-articles-service";
import { Article } from "@src/types";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

interface ParamTypes {
    id: string;
}

const ArticlePage = () => {
    const { get } = useArticlesService();
    const { id } = useParams<ParamTypes>();
    const { push } = useHistory();
    const [article, setArticle] = useState<Article>(null);

    // create mount effect that queries the context for articles to find the specified one,
    // if not found redirect to the not found page (or articles page?)
    useEffect(() => {
        if(id) {
            get(id).then(a => {
                if(a) {
                    setArticle(a);
                } else {
                    push("/notfound");
                }
            })
        }
    }, [id]);

    return (
        <div>Article {article?.title}</div>
    );
}

export default ArticlePage;