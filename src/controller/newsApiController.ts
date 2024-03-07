import { Utils } from './utils';

export interface NewsDto {
  title: string;
  description: string;
  urlToImage: string;
  url: string;
  content: string;
}

export class NewsApiController {
  API_KEY = 'f00e1267d5c84b0aaede71a080e66960';
  BASE_URL = 'https://newsapi.org/v2';

  public async fetchNewsByCountry(country: string, pageNo: number, category?: string, sortBy: string = 'popularity'): Promise<[NewsDto[], number]> {
    let query = `top-headlines?country=${country}`;
    query = Utils.isEmpty(category) ? query : `${query}&category=${category}`;
    query = `${query}&sortBy=${sortBy}&page=${pageNo}`;

    const url = `${this.BASE_URL}/${query}&apiKey=${this.API_KEY}`;
    return await this.getNewsApiResponse(url, pageNo);
  }

  public async fetchNewsBySource(source: string, pageNo: number, category?: string, sortBy: string = 'popularity'): Promise<[NewsDto[], number]> {
    let query = `top-headlines?sources=${source}`;
    query = Utils.isEmpty(category) ? query : `${query}&category=${category}`;
    query = `${query}&sortBy=${sortBy}&page=${pageNo}`;

    const url = `${this.BASE_URL}/${query}&apiKey=${this.API_KEY}`;
    return await this.getNewsApiResponse(url, pageNo);
  }

  public async fetchNewsByTopic(topic: string, pageNo: number, fromDate?: string, toDate?: string, sortBy: string = 'popularity'): Promise<[NewsDto[], number]> {
    let query = `everything?q=${topic}`;
    query = Utils.isEmpty(fromDate) ? query : `${query}&from=${fromDate}`;
    query = Utils.isEmpty(toDate) ? query : `${query}&to=${toDate}`;
    query = `${query}&sortBy=${sortBy}&page=${pageNo}`;

    const url = `${this.BASE_URL}/${query}&apiKey=${this.API_KEY}`;
    return await this.getNewsApiResponse(url, pageNo);
  }

  public async fetchNewsByDomain(domain: string, pageNo: number, category?: string, sortBy: string = 'popularity'): Promise<[NewsDto[], number]> {
    let query = `everything?domains=${domain}`;
    query = Utils.isEmpty(category) ? query : `${query}&category=${category}`;
    query = `${query}&sortBy=${sortBy}&page=${pageNo}`;

    const url = `${this.BASE_URL}/${query}&apiKey=${this.API_KEY}`;
    return await this.getNewsApiResponse(url, pageNo);
  }

  private async getNewsApiResponse(url: string, pageNo: number): Promise<[NewsDto[], number]> {
    let data: NewsDto[] = [];
    let totalArticles = 0;
    const response: any = await fetch(url, { method: 'GET' });

    if (response.ok && response.status === 200) {
      const jsonResponse: any = await response.json();
      totalArticles = jsonResponse.totalResults - (pageNo * 20);
      const allArticles = jsonResponse.articles;
      data = allArticles.filter((a: NewsDto) =>
        !Utils.isEmpty(a.title) && !Utils.isEmpty(a.description) && !Utils.isEmpty(a.urlToImage) &&
        !Utils.isEmpty(a.url) && !Utils.isEmpty(a.content));
    } else {
      console.log('Error occurred while fetching data from News API.', response.status);
      throw new Error('Error Occurred:', response.statusText);
    }

    console.log(`Fetched news count: ${data.length} for page: ${pageNo} and remaining articles: ${totalArticles}`);

    return [data, totalArticles];
  }
}