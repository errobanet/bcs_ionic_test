import { Component } from '@angular/core';
import { BCSSDK, BCSSDKPlugin } from '@erroba/capacitor-bcssdk';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  url: string = 'https://bas.develop.ex-cle.com';
  code: string = '';
  result: string = '-';
  bcsPlugin: BCSSDKPlugin = BCSSDK;

  ngOnInit() {
    this.initializePluginColors();
  }

  async initializePluginColors() {
    const primary = '#6200ee'; // Define tus colores
    const onPrimary = '#ffffff';
    try {
      await this.bcsPlugin.setColors({ primary, onPrimary });
    } catch (err) {
      console.error('Error setting colors:', err);
    }
  }

  async processVerify() {

    try {
      await this.bcsPlugin.setUrlService({ url: this.url });
      const response = await this.bcsPlugin.faceVerify({ code: this.code });
      this.result = response.result;
    } catch (err: any) {
      this.result = 'Error: ' + (err?.message || JSON.stringify(err));
    }
  }

}
