import React from "react"

import DashboardPage from "../components/Dashboard/DashboardPage"
import { isServer } from "../utils/isServer"

const Dashboard = () => {
  if (isServer()) {
    return <>Loading</>
  }

  return <DashboardPage />
}

export default Dashboard
