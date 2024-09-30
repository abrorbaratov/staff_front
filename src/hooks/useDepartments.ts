import axios from "axios";
import baseURL from "../services/baseUrl";
import { useQuery } from "@tanstack/react-query";
import { Departments } from "../components/DepartmentList";

const useDepartments = () => {
    const fetchDepartments = () => axios.get<Departments[]>(`${baseURL}/departments`).then((res) => res.data)
    return useQuery<Departments[], Error>({
        queryKey: ['departments'],
        queryFn: fetchDepartments
    })
}
export default useDepartments;