import { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { NewsApiController, NewsDto } from '../controller/newsApiController';
import { Utils } from '../controller/utils';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import defaultIcon from './default_icon.png';

interface NewsProps {
  pageSize: number;
  country: string;
  category: string;
  searchItem?: string;
  setProgress: (progress: number) => void;
}

interface NewsState {
  articles: NewsDto[];
  loading: boolean;
  pageNumber: number;
  totalArticles: number;
  headlines: string;
}

export default class News extends Component<NewsProps, NewsState> {
  constructor(props: NewsProps) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      pageNumber: 1,
      totalArticles: 0,
      headlines: ''
    };
  }

  async componentDidMount() {
    if (!this.state.articles.length && this.state.pageNumber === 1) {
      this.props.setProgress(0);
      await this.fetchNews();
      this.props.setProgress(100);
    }
  }

  async componentDidUpdate(prevProps: NewsProps) {
    const { pageSize, country, category, searchItem } = this.props;

    if (
      prevProps.category !== category ||
      prevProps.country !== country ||
      prevProps.searchItem !== searchItem
    ) {
      this.props.setProgress(0);
      this.setState(
        {
          articles: [],
          loading: true,
          pageNumber: 1,
          totalArticles: 0,
          headlines: ''
        },
        async () => {
          await this.fetchNews();
        }
      );
      this.props.setProgress(100);
    }
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  fetchNews = async () => {
    const { pageSize, country, category, searchItem } = this.props;
    const { pageNumber, articles } = this.state;
    this.props.setProgress(20);
    const newsApi = new NewsApiController();

    try {
      let response: any[];
      if (searchItem && !Utils.isEmpty(searchItem)) {
        document.title = `${this.capitalizeFirstLetter(searchItem)} - NewsBee`;
        this.setState({
          headlines: `NewsBee - Top ${this.capitalizeFirstLetter(
            searchItem
          )} Headlines`
        });
        this.props.setProgress(40);
        response = await newsApi.fetchNewsByCategory(
          searchItem,
          pageNumber,
          pageSize
        );
      } else if (!Utils.isEmpty(country)) {
        document.title = `${country.toUpperCase()} - NewsBee`;
        this.setState({
          headlines: `NewsBee - Top Headlines in ${country.toUpperCase()}`
        });
        this.props.setProgress(40);
        response = await newsApi.fetchNewsByCountry(
          country,
          pageNumber,
          pageSize
        );
      } else {
        document.title = `${this.capitalizeFirstLetter(category)} - NewsBee`;
        this.setState({
          headlines: `NewsBee - Top ${this.capitalizeFirstLetter(
            category
          )} Headlines`
        });
        this.props.setProgress(40);
        response = await newsApi.fetchNewsByCategory(
          category,
          pageNumber,
          pageSize
        );
      }

      this.props.setProgress(60);
      this.setState((prevState) => ({
        articles: articles.concat(response[0]),
        loading: false,
        totalArticles: response[1],
        pageNumber: prevState.pageNumber + 1
      }));
      this.props.setProgress(100);
    } catch (error: any) {
      this.setState({ loading: false });
      alert('Error fetching news. ' + error.message);
    }
  };

  fetchMoreData = () => {
    if (!this.state.loading) {
      this.fetchNews();
    }
  };

  render() {
    return (
      <>
        <h2 className='text-center'>{this.state.headlines}</h2>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData} // Changed to use wrapper function
          hasMore={this.state.articles.length < this.state.totalArticles}
          loader={<Spinner />}
        >
          <div className='container'>
            <div className='row'>
              {this.state.articles.map((article, index) => (
                <div className='col-md-4' key={index}>
                  <NewsItem
                    title={article.title}
                    description={article.description}
                    imageUrl={
                      Utils.isEmpty(article.urlToImage)
                        ? defaultIcon
                        : article.urlToImage
                    }
                    newsUrl={article.url}
                    publishedAt={article.publishedAt}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}
