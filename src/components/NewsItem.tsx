import { Component } from 'react';


interface NewsItemProps {
  title: string;
  description: string;
  imageUrl: string;
  newsUrl: string;
  publishedAt: string;
}

export default class NewsItem extends Component<NewsItemProps> {

  render() {
    const { title, description, imageUrl, newsUrl, publishedAt } = this.props;

    return (
      <div className='my-3'>
        <div className="card">
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">Reported On: {new Date(publishedAt).toLocaleString()}</small></p>
            <a href={newsUrl} target='_blank' rel='noreferrer' className="btn btn-sm btn-dark">Read More...</a>
          </div>
        </div>
      </div>
    );
  }
}
