import React, { Component } from 'react';
import { NewsApiController, NewsDto } from '../controller/newsApiController';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

interface NewsProps {
  pageSize: number;
  country: string;
}

interface NewsState {
  articles: NewsDto[];
  loading: boolean;
  pageNumber: number;
  totalArticles: number;
}

export default class News extends Component<NewsProps, NewsState> {
  constructor(props: NewsProps) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      pageNumber: 1,
      totalArticles: 0,
    };
  }

  async componentDidMount() {
    const { pageSize, country } = this.props;
    await this.fetchNews(pageSize, country, this.state.pageNumber);
  }

  async componentDidUpdate(prevProps: NewsProps, prevState: NewsState) {
    const { pageSize, country } = this.props;

    if (prevState.pageNumber !== this.state.pageNumber) {
      await this.fetchNews(pageSize, country, this.state.pageNumber);
    }
    if (prevProps.country !== country) {
      this.setState({ pageNumber: 1 });
      await this.fetchNews(pageSize, country, 1);
    }
  }

  async fetchNews(pageSize: number, country: string, pageNumber: number) {
    this.setState({loading: true});
    const newsApi = new NewsApiController();
    const response = await newsApi.fetchNewsByCountry(country, pageNumber, pageSize);
    this.setState({
      articles: response[0],
      loading: false,
      totalArticles: response[1],
    });
  }

  handlePreviousClick = () => {
    this.setState((prevState) => ({
      pageNumber: prevState.pageNumber - 1,
    }));
  };

  handleNextClick = () => {
    this.setState((prevState) => ({
      pageNumber: prevState.pageNumber + 1,
    }));
  };

  render() {
    const { articles, loading, pageNumber, totalArticles } = this.state;

    return (
      <div className='container my-3'>
        <h2 className='text-center'>NewsBee - Top Headlines</h2>
        {loading && <Spinner />}
        <div className='row'>
          {!loading && articles.map(article => (
            <div className='col-md-4' key={article.url}>
              <NewsItem
                title={article.title}
                description={article.description}
                imageUrl={article.urlToImage}
                newsUrl={article.url}
              />
            </div>
          ))}
        </div>
        <div className='container d-flex justify-content-between'>
          <button type="button" disabled={pageNumber <= 1} className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
          <span>{`Page ${pageNumber}`}</span>
          <button type="button" disabled={totalArticles<=0} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}
