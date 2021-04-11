import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import history from "./store/history";
import "./App.css";
import HomeBooks from "./components/HomeBooks";
import NewBook from "./components/NewBook";
import { Layout } from "antd";
import "antd/dist/antd.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

// import {IRootState} from './store/store';

const { Content } = Layout;

const App = () => {
  // const bookState = useSelector((state:RootStore) => state.books);
  // console.log(bookState.map)
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Router history={history}>
          <Layout className="layout">
            {/* Header Placeholder */}
            <Header />
            <Content style={{ padding: "0 50px" }}>
              <Switch>
                <Route path="/" exact component={HomeBooks} />
                <Route path="/new" exact component={NewBook} />
              </Switch>
            </Content>

            {/* Footer Placeholder */}
            <Footer />
          </Layout>
        </Router>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
