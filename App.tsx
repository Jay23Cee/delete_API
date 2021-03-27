import React from 'react';
import './App.css';
import HomeBooks from './components/HomeBooks'
import { Layout, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';

import { Provider } from 'react-redux'

//import {IRootState} from './store/store';



const { Header, Content, Footer } = Layout;

{/* <Router>
      <div className="App">
        <HeaderComponent />
        <Switch>
          <Route path="/:code">
            <div style={style}>
              <CodeNotMatch />
            </div>
          </Route>
          <Route exact path="/">
            <div style={style}>
              <HomePage />
            </div>
          </Route>
        </Switch>
      </div>
    </Router> */}

const App = () =>{
  
        
        return(
            <div>
                <HomeBooks/>
             </div>
                
            
            
        )
}
 

export default App;



