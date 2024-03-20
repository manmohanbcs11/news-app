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
    if (!this.state.articles.length) {
      await this.fetchNews();
    }
  }

  async componentDidUpdate(prevProps: NewsProps) {
    const { pageSize, country, category, searchItem } = this.props;

    if (
      prevProps.category !== category ||
      prevProps.country !== country ||
      prevProps.searchItem !== searchItem
    ) {
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
          console.log('componentDidUpdate: ', this.state);
        }
      );
    }
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  fetchNews = async () => {
    const { pageSize, country, category, searchItem } = this.props;
    const { pageNumber, articles } = this.state;
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
        response = await newsApi.fetchNewsByCategory(
          category,
          pageNumber,
          pageSize
        );
      }

      this.setState((prevState) => ({
        articles: [...prevState.articles, ...response[0]],
        loading: false,
        totalArticles: response[1],
        pageNumber: prevState.pageNumber + 1
      }));
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
