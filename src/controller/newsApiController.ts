import { Utils } from './utils';

export interface NewsDto {
  title: string;
  description: string;
  urlToImage: string;
  url: string;
  content: string;
  publishedAt: string;
}

export class NewsApiController {
  // private readonly API_KEY: string = 'f00e1267d5c84b0aaede71a080e66960';
  private readonly API_KEY: string = 'ead67462039d490a91838c297c9f0822';
  // private readonly API_KEY: string = '46ac411b05264e71a0e2b557c33036da';
  private readonly BASE_URL: string = 'https://newsapi.org/v2';

  public async fetchNewsByCountry(country: string, pageNo: number, pageSize: number, category?: string, sortBy: string = 'popularity'): Promise<[NewsDto[], number]> {
    let query = `top-headlines?country=${country}`;
    console.log('query: ', query);
    query = Utils.isEmpty(category) ? query : `${query}&category=${category}`;
    query = `${query}&sortBy=${sortBy}&page=${pageNo}&pageSize=${pageSize}`;

    const url = `${this.BASE_URL}/${query}&apiKey=${this.API_KEY}`;
    return await this.getNewsApiResponse(url);
  }

  public async fetchNewsBySource(source: string, pageNo: number, pageSize: number, category?: string, sortBy: string = 'popularity'): Promise<[NewsDto[], number]> {
    let query = `top-headlines?sources=${source}`;
    query = Utils.isEmpty(category) ? query : `${query}&category=${category}`;
    query = `${query}&sortBy=${sortBy}&page=${pageNo}&pageSize=${pageSize}`;

    const url = `${this.BASE_URL}/${query}&apiKey=${this.API_KEY}`;
    return await this.getNewsApiResponse(url);
  }

  public async fetchNewsByCategory(topic: string | undefined, pageNo: number, pageSize: number, fromDate?: string, toDate?: string, sortBy: string = 'publishedAt'): Promise<[NewsDto[], number]> {
    let query = `everything?q=${topic}`;
    query = Utils.isEmpty(fromDate) ? query : `${query}&from=${fromDate}`;
    query = Utils.isEmpty(toDate) ? query : `${query}&to=${toDate}`;
    query = `${query}&sortBy=${sortBy}&page=${pageNo}&pageSize=${pageSize}`;

    const url = `${this.BASE_URL}/${query}&apiKey=${this.API_KEY}`;
    return await this.getNewsApiResponse(url);
  }

  public async fetchNewsByDomain(domain: string, pageNo: number, pageSize: number, category?: string, sortBy: string = 'popularity'): Promise<[NewsDto[], number]> {
    let query = `everything?domains=${domain}`;
    query = Utils.isEmpty(category) ? query : `${query}&category=${category}`;
    query = `${query}&sortBy=${sortBy}&page=${pageNo}&pageSize=${pageSize}`;

    const url = `${this.BASE_URL}/${query}&apiKey=${this.API_KEY}`;
    return await this.getNewsApiResponse(url);
  }

  private async getNewsApiResponse(url: string): Promise<[NewsDto[], number]> {
    let data: NewsDto[] = [];
    let totalArticles = 0;
    console.log('url: ', url);
    try {
      const response: any = await fetch(url, { method: 'GET' });
      if (response.ok && response.status === 200) {
        const jsonResponse: any = await response.json();
        totalArticles = jsonResponse.totalResults;
        const allArticles = jsonResponse.articles;
        data = allArticles.filter((a: NewsDto) => !Utils.isEmpty(a.url));
      }
    } catch (err) {
      console.log('Error Occurred.', err);
      throw err;
    }

    return [data, totalArticles];
  }
}