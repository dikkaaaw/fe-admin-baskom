import { useState, useEffect } from "react";
import axios from "axios";
import AreaTableAction from "./AreaTableAction";
import PropTypes from "prop-types";
import "./AreaTable.scss";

const TABLE_HEADS_DEFAULT = ["User ID", "Email", "Name", "Roles", "Action"];

const AreaTable = ({ title, showAction, showActionColumn }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching table data: ", error);
      }
    };

    fetchData();
  }, []);

  const tableHeads = showActionColumn
    ? [...TABLE_HEADS_DEFAULT]
    : TABLE_HEADS_DEFAULT.filter((head) => head !== "Action");

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">{title}</h4>
      </div>
      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              {tableHeads?.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData?.map((dataItem) => {
              return (
                <tr key={dataItem.id}>
                  <td>{dataItem.id}</td>
                  <td>{dataItem.email}</td>
                  <td>{dataItem.name}</td>
                  <td>{dataItem.roles[0].name}</td>
                  {showAction && showActionColumn && (
                    <td className="dt-cell-action">
                      <AreaTableAction userId={dataItem.id} />
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

AreaTable.propTypes = {
  title: PropTypes.string.isRequired,
  showAction: PropTypes.bool,
  showActionColumn: PropTypes.bool,
};

AreaTable.defaultProps = {
  showAction: true,
  showActionColumn: true,
};

export default AreaTable;
