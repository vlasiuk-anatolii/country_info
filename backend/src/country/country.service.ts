import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { FetchError } from '../exception/error.exception';
import { IPopulationCount } from './interfaces/get-population.interface';
import { ICountry } from './interfaces/country.interface';
import { IBorderCountries } from './interfaces/border-countries.interface';
import { IFlagData } from './interfaces/get-flag.interface';

@Injectable()
export class CountryService {
  private readonly logger = new Logger(CountryService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private async fetchData<T>(
    url: string,
    method: 'GET' | 'POST' = 'GET',
    requestData?: any,
  ): Promise<T> {
    try {
      const response =
        method === 'GET'
          ? await lastValueFrom(this.httpService.get(url))
          : await lastValueFrom(this.httpService.post(url, requestData));
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Unknown error occurred';
      const statusCode =
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;

      this.logger.error(`Error fetching data from ${url}: ${errorMessage}`);
      throw new FetchError(errorMessage, statusCode);
    }
  }

  async getAllCountries(): Promise<ICountry[]> {
    const url = this.configService.get<string>('ALL_COUNTRIES');
    return await this.fetchData<ICountry[]>(url);
  }

  async getBorderCountries(countryCode: string): Promise<IBorderCountries[]> {
    const url = `${this.configService.get<string>('BORDER_COUNTRIES_API')}/${countryCode}`;
    const data = await this.fetchData<{ borders: IBorderCountries[] }>(url);
    return data.borders || [];
  }

  async getPopulationData(countryName: string): Promise<IPopulationCount[]> {
    const url = this.configService.get<string>('POPULATION_DATA_API');
    const data = await this.fetchData<{
      data: { populationCounts: IPopulationCount[] };
    }>(url, 'POST', { country: countryName });
    return data.data.populationCounts || [];
  }

  async getFlag(iso2Code: string): Promise<IFlagData> {
    const url = this.configService.get<string>('FLAG_API');
    const data = await this.fetchData<{ data: IFlagData }>(url, 'POST', {
      iso2: iso2Code,
    });
    return data.data;
  }
}
