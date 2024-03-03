import React, {Component} from 'react'
import NewsItem from './NewsItem'
import InfiniteScroll from "react-infinite-scroll-component";

export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            articles: [],
            totalResults: 0,
            page: 1
        }
    }
    getInputData = async () => {
        var response = ""
        try {
            if(this.props.search)
                response = await fetch(`https://newsapi.org/v2/everything?sortBy=publishedAt&page=1&q=${this.props.search}&language=${this.props.language}&pageSize=20&from=2023-05-30&sortBy=publishedAt&apiKey=70b7b3349c0748e181b61eb5b45631a8`)

            else
                response = await fetch(`https://newsapi.org/v2/everything?sortBy=publishedAt&page=1&q=${this.props.q}&language=${this.props.language}&pageSize=20&from=2023-05-30&sortBy=publishedAt&apiKey=70b7b3349c0748e181b61eb5b45631a8`)
            response = await response.json()
            this.setState({
                articles: response.articles,
                totalResults: response.totalResults

            })
        }

        catch(error) {
            // alert(error, "Something Went Wrong")
        }
    }
    fetchMoreData = async () => {
        this.setState({page: this.state.page + 1})
        var response = ""
        try {
            if(this.props.search)
                response = await fetch(`https://newsapi.org/v2/everything?sortBy=publishedAt&page=${this.state.page}&q=${this.props.search}&language=${this.props.language}&pageSize=20&from=2023-05-30&sortBy=publishedAt&apiKey=70b7b3349c0748e181b61eb5b45631a8`)

            else
                response = await fetch(`https://newsapi.org/v2/everything?sortBy=publishedAt&page=${this.state.page}&q=${this.props.q}&language=${this.props.language}&pageSize=20&from=2023-05-30&sortBy=publishedAt&apiKey=70b7b3349c0748e181b61eb5b45631a8`)
            response = await response.json()
            this.setState({
                articles: this.state.articles.concat(response.articles)

            })
        }

        catch(error) {
            // alert(error, "Something Went Wrong")
        }
    }
    componentDidMount() {
        this.getInputData()
    }
    componentDidUpdate(old) {
        if(this.props !== old)
            this.getInputData()
    }
    render() {
        return (
            <div className='container-fluid'>
                <h5 className='background text-center mt-2 p-2'>{this.props.search ? this.props.search : this.props.q} News</h5>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length < this.state.totalResults}
                    loader={<div className='text-center w-100 my-3'>
                        <div className="spinner-border text-info" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>}>
                    <div className='row' >
                        {
                            this.state.articles.map((item, index) => {
                                return <NewsItem
                                    key={index}
                                    title={item.title}
                                    description={item.description}
                                    pic={item.urlToImage}
                                    url={item.url}
                                    source={item.source.name}
                                    date={item.publishedAt}
                                />
                            })
                        }
                    </div>
                </InfiniteScroll>
            </div>
        )
    }
}
