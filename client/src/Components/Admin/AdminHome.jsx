import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import { useSelector } from "react-redux";

function AdminHome() {
  const data = useSelector((state) => state.user.userInfo);
  const [first, setfirst] = useState();
  useEffect(() => {
    setfirst(data);
  }, [data]);
  return (
    <div>
      <div className="conatiner" style={{ padding: "25px" }}>
        <Table data={first} />
      </div>
    </div>
  );
}

export default AdminHome;
