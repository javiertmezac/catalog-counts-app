import {Route} from 'react-router-dom'

import { CatalogCountContainer } from "../components/CatalogCount"
import { AttendanceListContainer } from "../components/AttendanceList"

export default [
  <Route key="catalogCount" path="/catalog-counts" component={CatalogCountContainer} />,
  <Route key="attendanceList" path="/attendace-list" component={AttendanceListContainer} />
]