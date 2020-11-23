import { useContext } from "react";
import ArticlesServiceContext from "../contexts/articles-service-context";

const useArticlesService = () => useContext(ArticlesServiceContext);

export default useArticlesService;