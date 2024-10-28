import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CountryService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getAllCountries(): Promise<any> {
    const borderCountriesUrl = `${this.configService.get<string>('ALL_COUNTRIES')}`;
    try {
      const response = await lastValueFrom(
        this.httpService.get(borderCountriesUrl),
      );
      return response.data || [];
    } catch (error) {
      console.error('Error fetchingcountries:', error.message);
      throw new HttpException(
        'Error fetching countries',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getBorderCountries(countryCode: string): Promise<string[]> {
    const borderCountriesUrl = `${this.configService.get<string>('BORDER_COUNTRIES_API')}/${countryCode}`;
    try {
      const response = await lastValueFrom(
        this.httpService.get(borderCountriesUrl),
      );
      return response.data.borders || [];
    } catch (error) {
      console.error('Error fetching border countries:', error.message);
      throw new HttpException(
        'Error fetching border countries',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getPopulationData(countryName: string): Promise<any[]> {
    const populationDataUrl = this.configService.get<string>(
      'POPULATION_DATA_API',
    );
    try {
      const response = await lastValueFrom(
        this.httpService.post(populationDataUrl, { country: countryName }),
      );
      return response.data.data.populationCounts || [];
    } catch (error) {
      console.error('Error fetching population data:', error.message);
      throw new HttpException(
        'Error fetching population data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getFlag(iso2Code: string): Promise<any> {
    const flagUrl = this.configService.get<string>('FLAG_API');
    try {
      const response = await lastValueFrom(
        this.httpService.post(flagUrl, { iso2: iso2Code }),
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching flag URL:', error.message);
      throw new HttpException('Error fetching flag', HttpStatus.BAD_REQUEST);
    }
  }
}
