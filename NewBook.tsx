import { Form, Input, Menu, Breadcrumb, Button } from 'antd';
import React, { useState,  Component } from 'react';
import { timeStamp } from 'node:console';
import { kMaxLength } from 'node:buffer';
import {Book} from '../store/book/Book';
import {AppState} from "../store/store";
import { connect} from 'react-redux';
import {AppAction } from "../store/book/actionType";
import { ThunkDispatch  } from "redux-thunk";
import * as action from "../store/book/bookAction";
import { bindActionCreators } from 'redux';
import { bookReducer } from '../store/book/booksReducer';
import { routerMiddleware } from 'react-router-redux';
import { Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface BookTableProps{
  title: string;
  author: string;
  date: string;
  key: string;
}

export const NewItem = () =>{

  return(
    <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>New</Breadcrumb.Item>
        <Breadcrumb.Item>Library</Breadcrumb.Item>
        <Breadcrumb.Item>Book</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  )
}


export const NewMenu=() =>{

  return(
  <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
  <Menu.Item key="1"><a href="/">Home</a></Menu.Item>
  <Menu.Item key="2"><a href="/new">New</a></Menu.Item>

</Menu>

)
  }

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */


interface BookTableState {}

type Props = BookTableProps & LinkStateProps & LinkDispatchProps;

interface LinkStateProps {
  originData: Book[];
  }
  
  interface LinkDispatchProps{
    startNewBook: (book : Book) => void;
    
  }
  
    const mapDispatchToProps = (
    dispatch : ThunkDispatch<any,any,AppAction>,
    ownProps: BookTableProps
  ): LinkDispatchProps => ({
    startNewBook: bindActionCreators(action.startNewBook, dispatch),
    
  })
  
  const mapStateToProps = (
    state: AppState,
    ownProps: BookTableProps
  ): LinkStateProps => ({
  originData: state.books
  
  });
  
  

class NewBook extends React.Component<Props, BookTableState>{

  render() {
    
      const onFinish = (values: Book) => {
        console.log(values);

        this.props.startNewBook(values)
        
      }
    return (

      <div>
          <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
          <Form.Item name={['book', 'title']} label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['book', 'author']} label="Author" rules={[{ required: true}]}>
            <Input />
          </Form.Item>
          
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  } 
}// end of Class NewBook

export default connect(mapStateToProps, mapDispatchToProps) ( NewBook);

