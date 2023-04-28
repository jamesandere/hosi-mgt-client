import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

const Doctors = () => {
  const { doctors } = useSelector((state) => state.doctors);
  const navigate = useNavigate();

  const rows =
    doctors &&
    doctors.map((doctor) => {
      return {
        id: doctor.id,
        firstName: doctor.first_name,
        lastName: doctor.last_name,
      };
    });

  const columns = [
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 170,
      renderCell: (params) => {
        return (
          <ViewButton onClick={() => navigate(`/doctors/${params.id}`)}>
            View
          </ViewButton>
        );
      },
    },
  ];

  return (
    <Container>
      <GridContainer style={{ height: 400 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </GridContainer>
    </Container>
  );
};

export default Doctors;

const Container = styled.div`
  margin-top: 50px;
  min-height: 100vh;
`;

const GridContainer = styled.div`
  margin-left: 240px;
`;

const ViewButton = styled.button`
  background: #519872;
  color: #fff;
  padding: 6px 8px;
  border: none;
  outline: none;
  border-radius: 3px;
  cursor: pointer;
`;
