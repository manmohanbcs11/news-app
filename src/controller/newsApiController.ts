import { Utils } from './utils';

export interface NewsDto {
  title: string;
  description: string;
  urlToImage: string;
  url: string;
  content: string;
}

export class NewsApiController {
  // API_KEY = 'f00e1267d5c84b0aaede71a080e66960';
  API_KEY = 'ead67462039d490a91838c297c9f0822';
  BASE_URL = 'https://newsapi.org/v2';
  PAGE_SIZE = 20;

  public async fetchNewsByCountry(country: string, pageNo: number, pageSize: number, category?: string, sortBy: string = 'popularity'): Promise<[NewsDto[], number]> {
    let query = `top-headlines?country=${country}`;
    console.log('query: ', query);
    query = Utils.isEmpty(category) ? query : `${query}&category=${category}`;
    query = `${query}&sortBy=${sortBy}&page=${pageNo}&pageSize=${pageSize}`;

    const url = `${this.BASE_URL}/${query}&apiKey=${this.API_KEY}`;
    return await this.getNewsApiResponse(url, pageNo, pageSize);
  }

  public async fetchNewsBySource(source: string, pageNo: number, pageSize: number, category?: string, sortBy: string = 'popularity'): Promise<[NewsDto[], number]> {
    let query = `top-headlines?sources=${source}`;
    query = Utils.isEmpty(category) ? query : `${query}&category=${category}`;
    query = `${query}&sortBy=${sortBy}&page=${pageNo}&pageSize=${pageSize}`;

    const url = `${this.BASE_URL}/${query}&apiKey=${this.API_KEY}`;
    return await this.getNewsApiResponse(url, pageNo, pageSize);
  }

  public async fetchNewsByTopic(topic: string, pageNo: number, pageSize: number, fromDate?: string, toDate?: string, sortBy: string = 'popularity'): Promise<[NewsDto[], number]> {
    let query = `everything?q=${topic}`;
    query = Utils.isEmpty(fromDate) ? query : `${query}&from=${fromDate}`;
    query = Utils.isEmpty(toDate) ? query : `${query}&to=${toDate}`;
    query = `${query}&sortBy=${sortBy}&page=${pageNo}&pageSize=${pageSize}`;

    const url = `${this.BASE_URL}/${query}&apiKey=${this.API_KEY}`;
    return await this.getNewsApiResponse(url, pageNo, pageSize);
  }

  public async fetchNewsByDomain(domain: string, pageNo: number, pageSize: number, category?: string, sortBy: string = 'popularity'): Promise<[NewsDto[], number]> {
    let query = `everything?domains=${domain}`;
    query = Utils.isEmpty(category) ? query : `${query}&category=${category}`;
    query = `${query}&sortBy=${sortBy}&page=${pageNo}&pageSize=${pageSize}`;

    const url = `${this.BASE_URL}/${query}&apiKey=${this.API_KEY}`;
    return await this.getNewsApiResponse(url, pageNo, pageSize);
  }

  private async getNewsApiResponse(url: string, pageNo: number, pageSize: number): Promise<[NewsDto[], number]> {
    let data: NewsDto[] = [];
    let totalArticles = 0;
    console.log('url: ', url);
    try {
      const response: any = await fetch(url, { method: 'GET' });
      if (response.ok && response.status === 200) {
        const jsonResponse: any = await response.json();
        totalArticles = jsonResponse.totalResults - (pageNo * pageSize);
        const allArticles = jsonResponse.articles;
        data = allArticles.filter((a: NewsDto) =>
          !Utils.isEmpty(a.title) && !Utils.isEmpty(a.description) && !Utils.isEmpty(a.urlToImage) &&
          !Utils.isEmpty(a.url) && !Utils.isEmpty(a.content));
      }
    } catch (err: any) {
      console.log('Error Occurred.', err);
      throw err;
    }

    console.log(`Fetched news count: ${data.length} for page: ${pageNo} and remaining articles: ${totalArticles}`);

    return [data, totalArticles];
  }
}