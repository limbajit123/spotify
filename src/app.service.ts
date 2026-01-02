import { Inject, Injectable } from '@nestjs/common';
import { DevConfigService } from './common/providers/DevConfigService';

@Injectable()
export class AppService {
  // constructor(@Inject('CONFIG') private config: { port: number }) {
  //   console.log(config);
  // }
  // getHello(): string {
  //   return `Hello i am learing nestjs fundamentals ${this.devConfigService.getDBHOST()}`;
  // }
}
