import { makeAutoObservable } from "mobx"

export class AboutClass {
  name: string
  constructor() {
    this.name = "example about name"

    makeAutoObservable(this)
    // 모든 getter는 computed로 지정됩니다.
    // 모든 setter는 action으로 지정됩니다.
    // https://ko.mobx.js.org/observable-state.html
  }

  get getName() {
    return this.name
  }

  set setName(name: string) {
    this.name = name
  }
}
