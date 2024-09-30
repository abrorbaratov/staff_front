// import axios from "axios";
// import baseURL from "../services/baseUrl";
// import { useQuery } from "@tanstack/react-query";
// import { Employee } from "../components/EmployeeList";

// interface paginatedEmployeeList {
//     count: number;
//     next: string;
//     previous: string;
//     results: Employee[];
// }


// const useEmployees = (id: number) => {
//   const fetchEmployees = () => 
//     axios.get<paginatedEmployeeList>(`${baseURL}/employees?dep=${id}`).then((res) => res.data);

//   return useQuery<paginatedEmployeeList, Error>(['employees', id], fetchEmployees, {
//     enabled: id !== -1
//   });
// };

// export default useEmployees;



import axios from "axios";
import baseURL from "../services/baseUrl";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Employee } from "../components/EmployeeList";

interface PaginatedEmployeeList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Employee[];
}

const useEmployees = (id: number) => {
  const fetchEmployees = ({ pageParam = 1 }) => 
    axios
      .get<PaginatedEmployeeList>(`${baseURL}/employees?dep=${id}&page=${pageParam}`)
      .then((res) => res.data);

  return useInfiniteQuery<PaginatedEmployeeList, Error>(
    ['employees', id],
    fetchEmployees,
    {
      enabled: id !== -1,
      getNextPageParam: (lastPage) => {
        const url = lastPage.next;
        if (!url) return undefined;
        
        const params = new URLSearchParams(url.split('?')[1]);
        return params.get('page') ? Number(params.get('page')) : undefined;
      },
    }
  );
};

export default useEmployees;
