import { Subscription } from 'rxjs';

export class SubscriptionManager {
  private _subcriptions: Subscription[] = [];

  constructor() {}

  public addSubscription(subscription: Subscription) {
    this._subcriptions.push(subscription);
  }

  public unsubscribeAll() {
    this._subcriptions.forEach((subscription) => subscription.unsubscribe());
    this._subcriptions = [];
  }
}
