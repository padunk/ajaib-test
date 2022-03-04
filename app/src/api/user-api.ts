import { useQuery } from "react-query";
import axios from "../axios";
import { User } from "../types/user";

type GetUserParams = {
  page: number;
  pageSize: number;
  results: number;
  gender?: string;
  keyword?: string;
  sortBy?: string;
  sortOrder?: string;
};

export function useGetUser(options: GetUserParams) {
  const queries = [];
  for (const key of Object.keys(options)) {
    const value = options[key as keyof GetUserParams];
    if (value === "") continue;
    queries.push(`${key}=${value}`);
  }

  let queriesString = queries.join("&");

  const fetchAllUsers = async () => {
    try {
      const data = await axios.get(`?${queriesString}`);
      console.log("data", data);
      return data.data.results;
    } catch (error) {
      console.log(error);
    }
  };

  return useQuery<User[], Error, User[], [string, GetUserParams]>(
    ["getUser", options],
    fetchAllUsers,
    {
      onError: (error) => {
        console.log(error);
      },
    }
  );
}
