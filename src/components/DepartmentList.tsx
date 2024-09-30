import { useState } from "react";

export interface Departments {
  id: number;
  name: string;
  sub_departments: Departments[];
}

interface Props {
  departmentlar: Departments[] | undefined;
  onDepartmentClick: (id: number, name: string) => void;
}

const DepartmentList = ({ departmentlar, onDepartmentClick }: Props) => {
  return (
    <ul className="list-group">
      {departmentlar?.map((department) => (
        <DepartmentItem
          key={department.id}
          department={department}
          onDepartmentClick={onDepartmentClick}
        />
      ))}
    </ul>
  );
};

interface DepartmentItemProps {
  department: Departments;
  onDepartmentClick: (id: number, name: string) => void;
}

const DepartmentItem = ({
  department,
  onDepartmentClick,
}: DepartmentItemProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleClick = () => {
    onDepartmentClick(department.id, department.name);
  };

  return (
    <li className="list-group-item">
      <div className="d-flex align-items-center">
        {department.sub_departments && (
          <button
            className="btn btn-link p-0 me-2"
            type="button"
            onClick={toggleCollapse}
            aria-expanded={!isCollapsed}
          >
            <i
              className={`bi ${
                isCollapsed ? "bi-chevron-right" : "bi-chevron-down"
              }`}
            ></i>
          </button>
        )}
        <span
          onClick={handleClick}
          style={{ cursor: "pointer", textDecoration: "underline" }}
        >
          {department.name}
        </span>
      </div>
      {department.sub_departments && (
        <div className={`collapse ${!isCollapsed ? "show" : ""}`}>
          <DepartmentList
            departmentlar={department.sub_departments}
            onDepartmentClick={onDepartmentClick}
          />
        </div>
      )}
    </li>
  );
};

export default DepartmentList;
