export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  employment_date: string;
  salary: number;
  job_title: string;
}

interface Props {
  employees: Employee[] | undefined;
  current_department: string;
}

const EmployeeList = ({ employees, current_department }: Props) => {
  return (
    <div className="col-md-9 col-12">
      <div className="p-3 border bg-white">
        <h5>
          {current_department
            ? current_department + " employees"
            : "No department was selected"}
        </h5>
        {current_department && (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>First name</th>
                  <th>Last Name</th>
                  <th>Employment date</th>
                  <th>Salary</th>
                  <th>Position</th>
                </tr>
              </thead>
              <tbody>
                {/* Sample Data */}
                {employees?.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.first_name}</td>
                    <td>{employee.last_name}</td>
                    <td>{employee.employment_date}</td>
                    <td>{employee.salary}</td>
                    <td>{employee.job_title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
