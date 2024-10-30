import { Module } from '@nestjs/common';
import { CountryModule } from './country/country.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CountryModule,
  ],
})
export class AppModule {}
