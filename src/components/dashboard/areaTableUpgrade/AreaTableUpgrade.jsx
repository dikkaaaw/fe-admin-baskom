import { useState, useEffect } from "react";
import axios from "axios";
import AreaTableAction from "./AreaTableAction";
import UpgradeRoleModalAcc from "../upgradeRoleModal/UpgradeRoleModalAcc";
import UpgradeRoleModalReject from "../upgradeRoleModal/UpgradeRoleModalReject";
import ViewDocModal from "../viewDocModal/ViewDocModal";
import PropTypes from "prop-types";
import { FaSync } from "react-icons/fa";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import "./AreaTable.scss";

const TABLE_HEADS_DEFAULT = [
  "User ID",
  "Email",
  "Name",
  "Roles",
  "Action",
  "Document",
  "Upgrade Role",
];

const AreaTable = ({
  title,
  showAction,
  showActionColumn,
  searchQuery,
  upgradeRole,
}) => {
  const [tableData, setTableData] = useState([]);
  const [isModalAccOpen, setModalAccOpen] = useState(false);
  const [isModalRejectOpen, setModalRejectOpen] = useState(false);
  const [filteredTableData, setFilteredTableData] = useState([]);
  const [isDocumentModalOpen, setDocumentModalOpen] = useState(false);
  const [selectedDocumentUrl, setSelectedDocumentUrl] = useState("");
  const [selectedUpgradeRoleId, setSelectedUpgradeRoleId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const openDocumentModal = (documentUrl) => {
    setSelectedDocumentUrl(documentUrl);
    setDocumentModalOpen(true);
  };

  const closeDocumentModal = () => {
    setDocumentModalOpen(false);
  };

  const openModalAcc = (upgradeRoleId) => {
    if (upgradeRoleId !== undefined) {
      setModalAccOpen(true);
      setSelectedUpgradeRoleId(upgradeRoleId);
    } else {
      console.error("upgradeRoleId is undefined");
    }
  };

  const closeModalAcc = () => {
    setModalAccOpen(false);
    setSelectedUpgradeRoleId(null);
  };

  const openModalReject = (upgradeRoleId) => {
    if (upgradeRoleId !== undefined) {
      setModalRejectOpen(true);
      setSelectedUpgradeRoleId(upgradeRoleId);
    } else {
      console.error("upgradeRoleId is undefined");
    }
  };

  const closeModalReject = () => {
    setModalRejectOpen(false);
    setSelectedUpgradeRoleId(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      try {
        const [usersResponse, upgradeRolesResponse] = await Promise.all([
          axios.get("https://baskom-api.up.railway.app/api/v1/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("https://baskom-api.up.railway.app/api/v1/upgrade-roles", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const users = usersResponse.data;
        const upgradeRoles = upgradeRolesResponse.data;

        const waitingUpgradeRoles = upgradeRoles.filter(
          (role) => role.status === "waiting"
        );

        const usersWithWaitingUpgradeRole = users.filter((user) =>
          waitingUpgradeRoles.some((role) => role.user_id === user.id)
        );

        const mergedData = usersWithWaitingUpgradeRole.map((user) => {
          const userUpgradeRole = waitingUpgradeRoles.find(
            (role) => role.user_id === user.id
          );
          return {
            ...user,
            upgradeRoleData: userUpgradeRole || null,
            documentUrl: userUpgradeRole ? userUpgradeRole.documentUrl : null,
          };
        });

        setTableData(mergedData);

        const filteredData = mergedData.filter(
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

    fetchData();
  }, [searchQuery, refreshKey]);

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

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
        <button className="refresh-btn" onClick={handleRefresh}>
          <FaSync size={20} />
        </button>
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
            ) : tableData.length > 0 ? (
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
                  {dataItem.upgradeRoleData && (
                    <td>
                      <button
                        className="btnView"
                        onClick={() => openDocumentModal(dataItem.documentUrl)}
                      >
                        View
                      </button>
                    </td>
                  )}
                  {upgradeRole && dataItem.upgradeRoleData && (
                    <td>
                      <button
                        className="btnAcc"
                        onClick={() =>
                          openModalAcc(dataItem.upgradeRoleData.id)
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="btnReject"
                        onClick={() =>
                          openModalReject(dataItem.upgradeRoleData.id)
                        }
                      >
                        Reject
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={tableHeads.length}>
                  No users requested for role upgrade.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <UpgradeRoleModalAcc
        isOpen={isModalAccOpen}
        onClose={closeModalAcc}
        upgradeRoleId={selectedUpgradeRoleId}
        tableData={tableData}
        setTableData={setTableData}
      />
      <UpgradeRoleModalReject
        isOpen={isModalRejectOpen}
        onClose={closeModalReject}
        upgradeRoleId={selectedUpgradeRoleId}
        tableData={tableData}
        setTableData={setTableData}
      />
      <ViewDocModal
        isOpen={isDocumentModalOpen}
        onClose={closeDocumentModal}
        documentUrl={selectedDocumentUrl}
      />
    </section>
  );
};

AreaTable.propTypes = {
  title: PropTypes.string.isRequired,
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
