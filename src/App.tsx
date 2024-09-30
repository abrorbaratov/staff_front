import "./App.css";
import DepartmentList from "./components/DepartmentList";
import useDepartments from "./hooks/useDepartments";
import useEmployees from "./hooks/useEmployees";
import EmployeeList from "./components/EmployeeList";
import { useState } from "react";

function App() {
  const [currentDep, setCurrentDep] = useState("");
  const [selectedDepId, setSelectedDepId] = useState(-1);
  const { data: departments, error } = useDepartments();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useEmployees(selectedDepId);

  if (error) return <p>{error.message}</p>;

  const handleDepartmentClick = (id: number, name: string) => {
    setCurrentDep(name);
    setSelectedDepId(id);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-12">
          <div className="p-3 border bg-light">
            <h5>Departments</h5>
            <DepartmentList
              departmentlar={departments}
              onDepartmentClick={handleDepartmentClick}
            />
          </div>
        </div>
        <div className="col-md-9 col-12">
          <EmployeeList
            employees={data ? data.pages.flatMap((page) => page.results) : []}
            current_department={currentDep}
          />

          <div className="text-center mt-3">
            {hasNextPage && (
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="btn btn-primary"
              >
                {isFetchingNextPage ? "Loading more..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
