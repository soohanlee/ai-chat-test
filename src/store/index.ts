import { AboutClass } from "./about/aboutStore"

export const useStore = () => {
  return {
    aboutStore: new AboutClass(),
  }
}
