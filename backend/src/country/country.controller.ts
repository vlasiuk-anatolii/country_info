import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get('')
  async getAllCountries() {
    const allCountries = await this.countryService.getAllCountries();
    return {
      allCountries,
    };
  }

  @Get('borders/:countryCode')
  async getBorderCountries(@Param('countryCode') countryCode: string) {
    const borders = await this.countryService.getBorderCountries(countryCode);
    return {
      borders,
    };
  }

  @Post('population')
  async getPopulationData(@Body('country') country: string) {
    const populationData = await this.countryService.getPopulationData(country);
    return {
      country,
      populationData,
    };
  }

  @Post('flag')
  async getFlag(@Body('iso2') iso2: string) {
    return this.countryService.getFlag(iso2);
  }
}
