import { Header } from "./components/header.js";
import { Search } from "./components/search.js";

const header = new Header()
const search = new Search();

header.activate();
search.searchFilter("[search-input-data]");
search.search("[search-btn]");

