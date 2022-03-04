import Home from "./component/page/home";
import { tw } from "twind";
import { Typography } from "antd";

function App() {
  return (
    <main className={tw`flex flex-col w-full p-8 text-white min-h-screen`}>
      <Typography.Title>Example With Search and Filter</Typography.Title>
      <Home />
    </main>
  );
}

export default App;
