import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home(props) {
  let [articles, setArticles] = useState([]);
  let [totalResults, setTotalResults] = useState(0);
  let [page, setPage] = useState(1);
  async function getAPIData() {
    var response = "";
    try {
      if (props.search)
        response = await fetch(
          `https://newsapi.org/v2/everything?sortBy=publishedAt&page=1&q=${
            props.search
          }&language=${
            props.language
          }&pageSize=20&from=${new Date()}&sortBy=publishedAt&apiKey=70b7b3349c0748e181b61eb5b45631a8`
        );
      else
        response = await fetch(
          `https://newsapi.org/v2/everything?sortBy=publishedAt&page=1&q=${
            props.q
          }&language=${
            props.language
          }&pageSize=20&from=${new Date()}&sortBy=publishedAt&apiKey=70b7b3349c0748e181b61eb5b45631a8`
        );
      response = await response.json();
      setArticles(response.articles);
      setTotalResults(response.totalResults);
    } catch (error) {
      // alert(error, "Something Went Wrong")
      console.log("error");
    }
  }
  async function fetchMoreData() {
    setPage(page + 1);
    var response = "";
    try {
      if (props.search)
        response = await fetch(
          `https://newsapi.org/v2/everything?sortBy=publishedAt&page=${page}&q=${
            props.search
          }&language=${
            props.language
          }&pageSize=20&from=${new Date()}&sortBy=publishedAt&apiKey=70b7b3349c0748e181b61eb5b45631a8`
        );
      else
        response = await fetch(
          `https://newsapi.org/v2/everything?sortBy=publishedAt&page=${page}&q=${
            props.q
          }&language=${
            props.language
          }&pageSize=20&from=${new Date()}&sortBy=publishedAt&apiKey=70b7b3349c0748e181b61eb5b45631a8`
        );
      response = await response.json();
      if (response.articles) {
        setArticles(articles.concat(response.articles));
      }
    } catch (error) {
      console.log(error, "Something Went Wrong");
    }
  }
  useEffect(() => {
    getAPIData();
    console.log(new Date());
  }, [props]);

  return (
    <div className="container-fluid">
      <h5 className="background text-center mt-2 p-2">
        {props.search ? props.search : props.q} News
      </h5>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length <= totalResults}
        loader={
          <div className="text-center w-100 my-3">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }
      >
        <div className="row w-100">
          {articles.map((item, index) => {
            return (
              <NewsItem
                key={index}
                title={item.title}
                description={item.description}
                pic={item.urlToImage}
                url={item.url}
                source={item.source.name}
                date={item.publishedAt}
              />
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}
