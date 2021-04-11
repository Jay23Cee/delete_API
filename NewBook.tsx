import { Form, Input, Menu, Breadcrumb, Button, Modal } from "antd";
import { FC , useState} from "react";

import { Book } from "../store/book/Book";
import { AppState } from "../store/store";
import { connect } from "react-redux";
import { AppAction } from "../store/book/actionType";
import { ThunkDispatch } from "redux-thunk";
import * as action from "../store/book/bookAction";
import { bindActionCreators } from "redux";

import { Link } from "react-router-dom";
import { ConfirmModal } from "./ConfirmModal";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export interface BookTableProps {
  title: string;
  author: string;
  date: string;
  key: string;
}

export const NewItem = () => {
  return (
    <div>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>New</Breadcrumb.Item>
        <Breadcrumb.Item>Library</Breadcrumb.Item>
        <Breadcrumb.Item>Book</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export const NewMenu = () => {
  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
      <Menu.Item key="1">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/new">New</Link>
      </Menu.Item>
    </Menu>
  );
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

type Props = BookTableProps & LinkStateProps & LinkDispatchProps;

interface LinkStateProps {
  originData: Book[];
}

interface LinkDispatchProps {
  startNewBook: (book: Book) => void;
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppAction>,
  ownProps: BookTableProps
): LinkDispatchProps => ({
  startNewBook: bindActionCreators(action.startNewBook, dispatch),
});

const mapStateToProps = (
  state: AppState,
  ownProps: BookTableProps
): LinkStateProps => ({ originData: state.books });

const NewBook: FC<Props> = (props: Props) => {
  {
    //form 
    const [form] = Form.useForm();
   
    
    // MODAL VISIBLE
  const [isModalVisible, setIsModalVisible] =  useState(false);
    // MODAL Being  Display
  const showModal = () => {
    setIsModalVisible(true);
  };
  // Modal Ok Button Click
  const handleOk = () => {
    setIsModalVisible(false);
  };

    const onFinish = (values: Book) => {
     console.log( values );
    form.resetFields();
     
      props.startNewBook(values);
      showModal();
    
      
    };
    return (
      <div>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>New</Breadcrumb.Item>
          <Breadcrumb.Item>Book</Breadcrumb.Item>
        </Breadcrumb>

        <Form
          {...layout}
          form= {form}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["title"]}
            label="Title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["author"]}
            label="Author"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>

            <Modal title="Success"  cancelButtonProps={{ style: { display: 'none' } }} closable={false} visible={isModalVisible} onOk={handleOk}>
              <p>A new book has successfully been created</p>
            </Modal>
          </Form.Item>
        </Form>

       
      </div>
    );
  }
}; // end of Class NewBook

export default connect(mapStateToProps, mapDispatchToProps)(NewBook);
