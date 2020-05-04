import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingCounter = 0;

  public shouldShowLoading() {
    return this.loadingCounter > 0;
  }

  public wrapWithLoading<T>(promise: Promise<T>) {
    this.loadingCounter++;
    promise.then(() => {
      this.loadingCounter--;
    });
    return promise;
  }
  public setLoading() {
    this.loadingCounter++;
    return this.unsetLoading.bind(this);
  }
  private unsetLoading() {
    this.loadingCounter--;
  }
}