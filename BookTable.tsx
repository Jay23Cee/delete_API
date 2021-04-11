import React, { useState, useEffect, FC } from "react";
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from "antd";

import { Book } from "../store/book/Book";

import { AppState } from "../store/store";
import { connect } from "react-redux";
import { AppAction } from "../store/book/actionType";
import { ThunkDispatch } from "redux-thunk";
import * as action from "../store/book/bookAction";
import { bindActionCreators } from "redux";

export type Props = LinkStateProps & LinkDispatchProps;

/***Book Table* */
const BookTable: FC<Props> = (props: Props) => {
  const [form] = Form.useForm();  
  const [editingKey, setEditingKey] = useState<string | undefined>("");

  const isEditing = (record: Book) => record.id === editingKey;
  const isDeleting = (record: Book) => record.id === editingKey;

  const onEdit = (record: Book) => {
    form.setFieldsValue({ ...record });
    console.log("ID:", record.id);
    setEditingKey(record.id);
  };

  const onDelete = (record: Book) => {
    props.startDeleteBook(record); 
  };

  const cancel = () => {
    setEditingKey("");
  };

  useEffect(() => {
    props.startFetchBook();
  }, []);

  const save = async (record: Book) => {
    try {
      const row = (await form.validateFields()) as Book;
      props.startEditBook({
        ...record,
        ...row,
      });
      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  /***Table Columns ***/
  const columns = [
    {
      title: "title",
      dataIndex: "title",
      width: "45%",
      editable: true,
    },
    {
      title: "author",
      dataIndex: "author",
      width: "25%",
      editable: true,
    },
    {
      title: "date",
      dataIndex: "time",
      width: "15%",
      editable: false,
    },
    {
      title: "action",
      dataIndex: "action",
      render: (_: any, record: Book) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a onClick={() => save(record)} style={{ marginRight: 8 }}>
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => onEdit(record)}
            >
              Edit
            </Typography.Link>
            <br></br>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => onDelete(record)}
            >
              Delete
            </Typography.Link>
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Book) => ({
        record,
        inputType: col.dataIndex === "Time" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        deleting: isDeleting(record),
      }),
    };
  });

  return (
    <>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={props.originData}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </>
  );
};

/**Table Cell */

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  deleting: boolean;
  dataIndex: string;
  title: string;
  author: string;
  inputType: "number" | "text";
  record: Book;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  deleting,
  dataIndex,
  title,
  author,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <>
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    </>
  );
};

export interface LinkStateProps {
  originData: Book[];
}

export interface LinkDispatchProps {
  startEditBook: (book: Book) => void;
  startDeleteBook: (book: Partial<Book>) => void;
  startNewBook: (book: Book) => void;
  startFetchBook: () => void;
}

export const mapStateToProps = (state: AppState): LinkStateProps => ({
  originData: state.books,
});

export const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppAction>
): LinkDispatchProps => ({
  startEditBook: bindActionCreators(action.startEditBook, dispatch),
  startDeleteBook: bindActionCreators(action.startDeleteBook, dispatch),
  startNewBook: bindActionCreators(action.startNewBook, dispatch),
  startFetchBook: bindActionCreators(action.startFetchBook, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookTable);
