import { Component } from 'react';
import { NewsApiController, NewsDto } from '../controller/newsApiController';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

interface NewsProps {
  pageSize: number;
}

interface NewsState {
  articles: NewsDto[];
  loading: boolean;
  pageNo: number;
  totalArticles: number;
}

export default class News extends Component<NewsProps, NewsState> {

  constructor(props: NewsProps) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      pageNo: 1,
      totalArticles: 0
    };
  }

  async componentDidMount() {
    const { pageSize } = this.props;
    this.setState({ loading: true });
    const newsApi = new NewsApiController();
    const response = await newsApi.fetchNewsByCountry('IN', this.state.pageNo, pageSize);   // IN: India, US: United States
    
    this.setState({
      articles: response[0],
      totalArticles: response[1],
      loading: false
    });
  }

  handlePreviousClick = async () => {
    const { pageSize } = this.props;
    this.setState({ loading: true });
    const newsApi = new NewsApiController();
    let response = await newsApi.fetchNewsByCountry('IN', this.state.pageNo - 1, pageSize);   // IN: India, US: United States

    this.setState({
      articles: response[0],
      pageNo: this.state.pageNo - 1,
      totalArticles: response[1],
      loading: false
    });
  };

  handleNextClick = async () => {
    const { pageSize } = this.props;
    this.setState({ loading: true });
    const newsApi = new NewsApiController();
    const response = await newsApi.fetchNewsByCountry('IN', this.state.pageNo + 1, pageSize);   // IN: India, US: United States

    this.setState({
      articles: response[0],
      pageNo: this.state.pageNo + 1,
      totalArticles: response[1],
      loading: false
    });
  }

  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center'>NewsBee - Top Headlines</h2>
        {this.state.loading && <Spinner />}
        <div className='row'>
          {!this.state.loading && this.state.articles.map(article => (
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
          <button type="button" disabled={this.state.pageNo <= 1} className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
          <button type="button" disabled={this.state.totalArticles <= 0} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}
