import React from "react";
import { useGetUser } from "../../api/user-api";
import { Input, Space, Spin, Table, Tag, message, Typography } from "antd";
import { tw } from "twind";
import formatDate from "date-fns/format";

type Props = {};

type UserDataSource = {
  key: string;
  username: string;
  name: string;
  email: string;
  gender: string;
  date: string;
};

const columns = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Registered Date",
    dataIndex: "date",
    key: "date",
  },
];

export default function Home({}: Props) {
  const [userResult, setUserResult] = React.useState<UserDataSource[]>([]);
  const {
    status,
    data: user,
    error,
  } = useGetUser({ page: 1, pageSize: 10, results: 10 });

  const onSearch = (value: string) => console.log("value :>> ", value);

  const renderError = () => {
    message.error(error);
    return (
      <Typography.Text>
        Error fetching user. Please try again later.
      </Typography.Text>
    );
  };

  React.useEffect(() => {
    if (user && user.length > 0) {
      console.log("user :>> ", user);
      const results: UserDataSource[] = user.map((u, idx) => {
        return {
          key: String(idx),
          username: u.login.username,
          name: `${u.name.first} ${u.name.last}`,
          email: u.email,
          gender: u.gender,
          date: formatDate(new Date(u.registered.date), "dd-MM-yyyy HH:mm"),
        };
      });
      setUserResult(results);
    }
  }, [user]);

  return (
    <div className={tw`flex flex-col gap-8`}>
      <Input.Search
        placeholder="input search text"
        allowClear
        onSearch={onSearch}
        enterButton
      />
      {status === "loading" ? (
        <Spin spinning size="large" />
      ) : status === "error" ? (
        renderError()
      ) : user && user.length === 0 ? (
        <Typography.Text>No user found</Typography.Text>
      ) : (
        <Table columns={columns} dataSource={userResult} />
      )}
    </div>
  );
}
