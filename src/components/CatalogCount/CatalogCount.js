import React from 'react';
import './CatalogCount.scss';
import { Get } from './CatalogCountHook';

import { useTable } from "react-table";

// function CatalogCount() {
//   const [ data, loading ] = Get("http://localhost:8888/cc-service/api/v1/catalog-count")
//   const list = data.catalogCountResponseCollection;
//     return (
//       <div>
//         <center><h1>Historial Catalogo de Cuentas</h1></center>
//         { loading ? ("Cargando Lista ... ") : (
//           <table className="table table-hover">
//             <thead className="thead-dark">
//               <tr>
//                 <th width="150">Fecha Registro</th>
//                 <th width="200">Cantidad</th>
//                 <th>Detalles</th>
//                 <th width="150">Saldo</th>
//               </tr>
//             </thead>
//             <tbody>
//               { list.map((cc) => (
//                 <tr key={cc.id}>
//                   <td>{cc.registrationDate}</td>
//                   <td>{cc.amount}</td>
//                   <td>{cc.details}</td>
//                   <td>{cc.total} </td>
//               </tr>
//               )) }
//             </tbody>
//           </table>
//           )
//         }
//       </div>
//     );
//   }

function CatalogCount() {
    // const [ data, loading ] = Get("http://localhost:8888/cc-service/api/v1/catalog-count")
    // const list = data.catalogCountResponseCollection;
    const data = React.useMemo(

      () => [
 
        {
 
          col1: 'Hello',
 
          col2: 'World',
 
        },
 
        {
 
          col1: 'react-table',
 
          col2: 'rocks',
 
        },
 
        {
 
          col1: 'whatever',
 
          col2: 'you want',
 
        },
 
      ],
 
      []
 
    )
 
  
 
    const columns = React.useMemo(
 
      () => [
 
        {
 
          Header: 'Column 1',
 
          accessor: 'col1', // accessor is the "key" in the data
 
        },
 
        {
 
          Header: 'Column 2',
 
          accessor: 'col2',
 
        },
 
      ],
 
      []
 
    )
 
  
 
    const {
 
      getTableProps,
 
      getTableBodyProps,
 
      headerGroups,
 
      rows,
 
      prepareRow,
 
    } = useTable({ columns, data })
 
  
 
    return (
 
      <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
 
        <thead>
 
          {headerGroups.map(headerGroup => (
 
            <tr {...headerGroup.getHeaderGroupProps()}>
 
              {headerGroup.headers.map(column => (
 
                <th
 
                  {...column.getHeaderProps()}
 
                  style={{
 
                    borderBottom: 'solid 3px red',
 
                    background: 'aliceblue',
 
                    color: 'black',
 
                    fontWeight: 'bold',
 
                  }}
 
                >
 
                  {column.render('Header')}
 
                </th>
 
              ))}
 
            </tr>
 
          ))}
 
        </thead>
 
        <tbody {...getTableBodyProps()}>
 
          {rows.map(row => {
 
            prepareRow(row)
 
            return (
 
              <tr {...row.getRowProps()}>
 
                {row.cells.map(cell => {
 
                  return (
 
                    <td
 
                      {...cell.getCellProps()}
 
                      style={{
 
                        padding: '10px',
 
                        border: 'solid 1px gray',
 
                        background: 'papayawhip',
 
                      }}
 
                    >
 
                      {cell.render('Cell')}
 
                    </td>
 
                  )
 
                })}
 
              </tr>
 
            )
 
          })}
 
        </tbody>
 
      </table>
 
    );
}

export default CatalogCount