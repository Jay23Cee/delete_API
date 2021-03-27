import { Layout, Menu, Breadcrumb } from 'antd';
import '../App.css'
import 'antd/dist/antd.css';
import BookTable from './BookTable'
import NewBook, { NewItem, NewMenu } from './NewBook'
import {AppState} from "../store/store";
import { connect, } from 'react-redux';
import {AppAction } from "../store/book/actionType";
import { ThunkDispatch  } from "redux-thunk";
import * as action from "../store/book/bookAction";
import { bindActionCreators } from 'redux';
import BookTableProps from "./BookTable"
import {Book} from "../store/book/Book"


  

interface LinkStateProps {
  originData: Book[];
  }
  
  interface LinkDispatchProps{
    startNewBook: (book : Book) => void;
   
  }
  


const mapDispatchToProps = (
  dispatch : ThunkDispatch<any,any,AppAction>,
  ownProps: typeof BookTableProps
): LinkDispatchProps => ({
  startNewBook: bindActionCreators(action.startNewBook, dispatch),
  
})

const mapStateToProps = (
  state: AppState,
  ownProps: typeof BookTableProps
): LinkStateProps => ({
originData: state.books

});
const HomeItem = () =>{

  return(
    <div>
            <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Library</Breadcrumb.Item>
        <Breadcrumb.Item>Table</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  )
}

const HomeMenu =() =>{
  return(
    <div>
     
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1"><a href="/">Home</a></Menu.Item>
          <Menu.Item key="2"><a href="/new">New</a></Menu.Item>


      </Menu>
      
    </div>
  )
}



const { Header, Content, Footer } = Layout;
const Homepage = () => (
  <div >
   <Layout className="layout">
    <Header>
      <div className="logo" />
  
      <Switch>
        <Route exact path="/" component={HomeMenu}/>
        <Route path="/new" component={NewMenu}/>
      </Switch>
     

    </Header>
    <Content style={{ padding: '0 50px' }}>

      
      <Switch>
        <Route exact path="/" component={HomeItem}/>
        <Route path="/new" component={NewItem}/>
        </Switch>
      

    
      <div className="site-layout-content">
   
      <Switch>
       <Route exact path="/" component={BookTable}/> 
       <Route path="/new" component={NewBook} />
       </Switch>
       
        </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
  </div>
);


export default connect(mapStateToProps, mapDispatchToProps) (BookTable);