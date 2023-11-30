import React from "react"
import { observer } from "mobx-react-lite"
import { useStore } from "@/store"

interface IProps {
  // props를 정의하세요
}

const AboutPage: React.FC<IProps> = () => {
  const {
    /* store를 사용하세요 */
    aboutStore,
  } = useStore()

  return <div>{/* 코드를 여기에 작성하세요 */ aboutStore.name}</div>
}

export default observer(AboutPage)
