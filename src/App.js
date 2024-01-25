import { Provider } from "react-redux";
import MainPage from "./Components/MainPage";
import appStore from "./utils/appStore";


function App() {
  return (
    <div>
      <Provider store={appStore}>
        <MainPage/>
      </Provider>
    </div>
  );
}

export default App;
