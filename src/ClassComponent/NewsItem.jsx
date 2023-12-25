import React, {Component} from 'react'

export default class NewsItem extends Component {
    render() {
        return (
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
                <div className="card">
                    {
                        this.props.pic ?
                            <img src={this.props.pic} height="200px" className="card-img-top" alt="..." /> :
                            <img src="/images/images.png" height="200px" className="card-img-top" alt="..." />
                    }
                    <div className="card-body">
                        <h5 className="card-title">{this.props.title.slice(0, 50) + "..."}</h5>
                        <h6 className='source'>{this.props.source}</h6>
                        <h6 className='date'>{`${new Date(this.props.date).getDate()}/${new Date(this.props.date).getMonth()}/${new Date(this.props.date).getFullYear()}`}</h6>
                        <hr />
                        <p className="card-text">{this.props.description}</p>
                        <a href={this.props.url} target='_blank' rel="noreferrer" className="btn background w-100 btn-sm">Read Full Article</a>
                    </div>
                </div>
            </div>
        )
    }
}
