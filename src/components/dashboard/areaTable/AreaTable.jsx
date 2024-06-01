import { useState, useEffect } from "react";
import axios from "axios";
import AreaTableAction from "./AreaTableAction";
import AddUserModal from "../addUserModal/AddUserModal";
import UpgradeRoleModalAcc from "../upgradeRoleModal/UpgradeRoleModalAcc";
import UpgradeRoleModalReject from "../upgradeRoleModal/UpgradeRoleModalReject";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import "./AreaTable.scss";

const TABLE_HEADS_DEFAULT = [
  "User ID",
  "Email",
  "Name",
  "Roles",
  "Action",
  "Upgrade Role",
];

const AreaTable = ({
  title,
  buttonTitle,
  showAction,
  showActionColumn,
  searchQuery,
  upgradeRole,
}) => {
  const [tableData, setTableData] = useState([]);
  const [isModalCreateOpen, setModalCreateOpen] = useState(false);
  const [isModalAccOpen, setModalAccOpen] = useState(false);
  const [isModalRejectOpen, setModalRejectOpen] = useState(false);
  const [filteredTableData, setFilteredTableData] = useState([]);
  const [upgradeRoles, setUpgradeRoles] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const openModalCreate = () => {
    setModalCreateOpen(true);
  };
  const closeModalCreate = () => setModalCreateOpen(false);

  const openModalAcc = () => {
    setModalAccOpen(true);
  };
  const closeModalAcc = () => setModalAccOpen(false);

  const openModalReject = () => {
    setModalRejectOpen(true);
  };
  const closeModalReject = () => setModalRejectOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTableData(response.data);

        const filteredData = response.data.filter(
          (dataItem) =>
            dataItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dataItem.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredTableData(filteredData);
      } catch (error) {
        console.error("Error fetching table data: ", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUpgradeRoles = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("/api/upgrade-roles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUpgradeRoles(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching upgrade roles: ", error);
      }
    };

    fetchData();
    fetchUpgradeRoles();
  }, [searchQuery]);

  let tableHeads = [...TABLE_HEADS_DEFAULT];

  if (showActionColumn) {
    if (!tableHeads.includes("Action")) {
      tableHeads.push("Action");
    }
  } else {
    tableHeads = tableHeads.filter((head) => head !== "Action");
  }

  if (upgradeRole) {
    if (!tableHeads.includes("Upgrade Role")) {
      tableHeads.push("Upgrade Role");
    }
  } else {
    tableHeads = tableHeads.filter((head) => head !== "Upgrade Role");
  }

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">{title}</h4>
        {showAction && (
          <button className="create-btn" onClick={() => openModalCreate()}>
            {buttonTitle}
          </button>
        )}
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
            {isLoading ? (
              <tr>
                <td colSpan={tableHeads.length}>
                  <ClipLoader
                    color="#ffffff"
                    loading={isLoading}
                    css={override}
                    size={35}
                  />
                </td>
              </tr>
            ) : (
              (searchQuery ? filteredTableData : tableData).map((dataItem) => (
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
                  {upgradeRoles.some((role) => role.userId === dataItem.id) && (
                    <td>
                      <button className="btnAcc" onClick={openModalAcc}>
                        Accept
                      </button>
                      <button className="btnReject" onClick={openModalReject}>
                        Reject
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <AddUserModal isOpen={isModalCreateOpen} onClose={closeModalCreate} />
      <UpgradeRoleModalAcc isOpen={isModalAccOpen} onClose={closeModalAcc} />
      <UpgradeRoleModalReject
        isOpen={isModalRejectOpen}
        onClose={closeModalReject}
      />
    </section>
  );
};

AreaTable.propTypes = {
  title: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  showAction: PropTypes.bool,
  showActionColumn: PropTypes.bool,
  upgradeRole: PropTypes.bool,
  searchQuery: PropTypes.string.isRequired,
};

AreaTable.defaultProps = {
  showAction: true,
  showActionColumn: true,
};

export default AreaTable;
