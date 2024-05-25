import AreaTableAction from "./AreaTableAction";
import "./AreaTable.scss";

const TABLE_HEADS = ["User ID", "Email", "Name", "Roles", "Status", "Action"];

const TABLE_DATA = [
  {
    id: 100,
    userId: "80965",
    email: "dika@mail.com",
    name: "Dika W",
    roles: "User",
    status: "active",
  },
  {
    id: 101,
    userId: "80965",
    email: "dika@mail.com",
    name: "Dika W",
    roles: "User",
    status: "active",
  },
  {
    id: 102,
    userId: "80965",
    email: "dika@mail.com",
    name: "Dika W",
    roles: "User",
    status: "active",
  },
  {
    id: 103,
    userId: "80965",
    email: "dika@mail.com",
    name: "Dika W",
    roles: "User",
    status: "nonactive",
  },
];

const AreaTable = () => {
  return (
    <section className="content-area-table">
      {/* <div className="data-table-info">
        <h4 className="data-table-title">Latest Users</h4>
      </div> */}
      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS?.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_DATA?.map((dataItem) => {
              return (
                <tr key={dataItem.id}>
                  <td>{dataItem.userId}</td>
                  <td>{dataItem.email}</td>
                  <td>{dataItem.name}</td>
                  <td>{dataItem.roles}</td>
                  <td>
                    <div className="dt-status">
                      <span
                        className={`dt-status-dot dot-${dataItem.status}`}
                      ></span>
                      <span className="dt-status-text">{dataItem.status}</span>
                    </div>
                  </td>
                  <td className="dt-cell-action">
                    <AreaTableAction />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AreaTable;
