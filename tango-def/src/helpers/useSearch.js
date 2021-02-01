import { useState } from "react";

const useSearch = () => {
  const [searchResult, setSearchResult] = useState("");

  const startSearch = (props) => {
    fetch(`/search/${props}`)
      .then((response) => response.json())
      .then((data) => setSearchResult(data))
      .catch((err) => console.log(err));

    console.log("this search over here:", searchResult);
  };

  return [searchResult, startSearch];
};

export default useSearch;
