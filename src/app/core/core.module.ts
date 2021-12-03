import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SafeImageURLPipe } from './services/pipes/safe-image-url.pipe';
import { ConfigService } from './services/config/config.service';
import { environment } from '../../environments/environment';

export const ConfigLoader = (configService: ConfigService) => {return () => configService.load(environment.configFile);};

@NgModule({
  declarations: [
    SafeImageURLPipe,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    
  ],
  exports: [
    SafeImageURLPipe
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigLoader,
      deps: [ConfigService],
      multi: true,
    }
  ]
})
export class CoreModule { }
