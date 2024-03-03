import React from "react";

export default function NewsItem(props) {
  return (
    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 my-2">
      <div className="card">
        {props.pic ? (
          <img
            src={props.pic}
            height="200px"
            className="card-img-top"
            alt="..."
          />
        ) : (
          <img
            src="/images/images.png"
            height="200px"
            className="card-img-top"
            alt="..."
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{props.title.slice(0, 50) + "..."}</h5>
          <h6 className="source">{props.source}</h6>
          <h6 className="date">{`${new Date(props.date).getDate()}/${new Date(
            props.date
          ).getMonth()}/${new Date(props.date).getFullYear()}`}</h6>
          <hr />
          <p className="card-text description">{props.description}</p>
          <a
            href={props.url}
            target="_blank"
            rel="noreferrer"
            className="btn background w-100 btn-sm mt-2"
          >
            Read Full Article
          </a>
        </div>
      </div>
    </div>
  );
}
