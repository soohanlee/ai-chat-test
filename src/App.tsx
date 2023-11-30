import { ChatWindow } from "@components/ChatWindow"

function App() {
  const InfoCard = <></>

  return (
    <div className="flex h-[100vh] flex-col p-4 md:p-12">
      <ChatWindow
        endpoint={`${import.meta.env.VITE_SERVER_BASE_URL}`}
        emptyStateComponent={InfoCard}
        placeholder={"Send a message"}
      ></ChatWindow>
    </div>
  )
}

export default App
