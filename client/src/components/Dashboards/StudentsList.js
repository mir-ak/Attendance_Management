import React from "react";
import Box from "@mui/material/Box";
//import Avatar from "@mui/material/Avatar";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

function StudentsList(props) {
  const columns = [
    {
      field: "picture",
      headerName: " ",
      renderCell: ({ value }) => (
        <div style={{ transform: "translateX(-50%)", paddingLeft: "50%" }}>
          {/* <Avatar sx={{ width: 40, height: 40 }} alt=" " src={value} /> */}
          <img
            style={{
              borderRadius: "50%",
              boxShadow:
                "0 0 0 1px rgb(99, 164, 233), 0 0 0 2px #4fedd2, 0 0 0 0px #6c77f4",
              width: "40px",
              height: "40px",
            }}
            src={value}
            alt=" "
          />
        </div>
      ),
      width: 150,
      editable: false,
    },
    {
      field: "id",
      headerAlign: "center",
      headerName: "Student ID ",
      width: 100,
    },
    {
      field: "fullName",
      headerName: "Full Name",
      width: 180,
      headerAlign: "center",

      editable: true,
    },

    {
      field: "Email",
      headerName: "Email",
      width: 260,
      headerAlign: "center",
      editable: true,
    },
  ];

  return (
    <div className="Students">
      <h3>Student List</h3>
      <br />
      <Box
        sx={{
          height: 455,
          width: "98%",
          paddingLeft: "2%",
        }}>
        <DataGrid
          rows={props.studentsArray}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
          sx={{
            backgroundColor: "white",
            borderRadius: "20px",
            opacity: 0.84,
            justifyContent: "center",
            alignContent: "center",
          }}
          pageSize={6}
          rowsPerPageOptions={[6]}
          rowsPerPage={6}
          count={props.studentsArray.length}
          //checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          //autoPageSize={true}
        />
      </Box>
    </div>
  );
}

export default StudentsList;
