import React from "react";
import { GetUserParams, useGetUser } from "../../api/user-api";
import {
  Input,
  Space,
  Spin,
  Table,
  message,
  Typography,
  Select,
  Form,
  Button,
  TablePaginationConfig,
} from "antd";
import { tw } from "twind";
import formatDate from "date-fns/format";
import { ColumnsType } from "antd/lib/table";
import { User } from "../../types/user";
import { FilterValue, SorterResult } from "antd/lib/table/interface";
import produce from "immer";
import { PAGE_SIZE, RESET_VALUE, UPDATE_VALUE } from "../../constants";

const columns: ColumnsType<User> = [
  {
    title: "Username",
    dataIndex: "login",
    key: "username",
    render: (login) => login.username,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name) => `${name.first} ${name.last}`,
    sorter: true,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    sorter: true,
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    sorter: true,
  },
  {
    title: "Registered Date",
    dataIndex: "registered",
    key: "date",
    render: (registered) =>
      formatDate(new Date(registered.date), "dd-MM-yyyy HH:mm"),
    sorter: true,
  },
];

export type ActionType = {
  type: typeof UPDATE_VALUE | typeof RESET_VALUE;
  payload?: GetUserParams;
};

const initialParams: GetUserParams = {
  gender: "all",
  keyword: "",
  sortBy: "",
  sortOrder: "",
  page: 1,
  pageSize: PAGE_SIZE,
  results: 24,
};

function reducer(state: GetUserParams, action: ActionType) {
  switch (action.type) {
    case UPDATE_VALUE:
      return produce(state, (newState) => {
        return {
          ...newState,
          ...action.payload,
        };
      });
    case RESET_VALUE:
      return initialParams;
    default:
      throw new Error("Type is not define.");
  }
}

export default function Home() {
  const [form] = Form.useForm();
  const [params, dispatch] = React.useReducer(reducer, initialParams);

  const { status, data: user, error } = useGetUser(params);

  const onSearchKeyword = (keyword: string) =>
    dispatch({
      type: UPDATE_VALUE,
      payload: {
        keyword,
      },
    });

  const renderError = () => {
    message.error(error);
    return (
      <Typography.Text>
        Error fetching user. Please try again later.
      </Typography.Text>
    );
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<User> | SorterResult<User>[]
  ) => {
    console.log("tableChange :>> ", pagination, sorter);
    let field = "";
    let order = "";
    if (!Array.isArray(sorter)) {
      field = sorter.field as string;
      order = sorter.order as string;
    }

    dispatch({
      type: UPDATE_VALUE,
      payload: {
        page: pagination.current,
        pageSize: pagination.pageSize,
        sortBy: field ?? "",
        sortOrder: order ?? "",
      },
    });
  };

  return (
    <div className={tw`flex flex-col gap-8`}>
      <Form
        form={form}
        layout="vertical"
        className={tw`flex gap-4 items-center flex-wrap`}
        initialValues={{ gender: "all" }}
      >
        <Form.Item label="Search" name="search">
          <Input.Search
            placeholder="input search text"
            allowClear
            onSearch={onSearchKeyword}
            enterButton
          />
        </Form.Item>
        <div className={tw`w-40`}>
          <Form.Item label="Gender" name="gender">
            <Select
              onChange={(gender) =>
                dispatch({
                  type: UPDATE_VALUE,
                  payload: {
                    gender,
                  },
                })
              }
            >
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="male">Male</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <Button
          type="default"
          onClick={() => {
            form.resetFields();
            dispatch({
              type: RESET_VALUE,
            });
          }}
          className={tw`mt-1`}
        >
          Reset Filter
        </Button>
      </Form>

      {status === "loading" ? (
        <Spin spinning size="large" />
      ) : status === "error" ? (
        renderError()
      ) : user && user.length === 0 ? (
        <Typography.Text>No user found</Typography.Text>
      ) : (
        <Table<User>
          columns={columns}
          dataSource={user}
          pagination={{
            defaultPageSize: params.pageSize,
            current: params.page,
          }}
          onChange={handleTableChange}
          rowKey={(data) => data.login.uuid}
        />
      )}
    </div>
  );
}
