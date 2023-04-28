import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { patientsDelete } from "../../features/patientsSlice";

const Patients = () => {
  const { patients } = useSelector((state) => state.patients);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(patientsDelete(id));
  };

  const rows =
    patients &&
    patients.map((patient) => {
      return {
        id: patient.id,
        firstName: patient.first_name,
        lastName: patient.last_name,
        sex: patient.sex,
        birthDate: patient.birth_date,
        age: patient.age,
      };
    });

  const columns = [
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "birthDate", headerName: "Date of Birth", width: 150 },
    { field: "sex", headerName: "Sex", width: 130 },
    { field: "age", headerName: "Age", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 170,
      renderCell: (params) => {
        return (
          <Actions>
            <ViewButton onClick={() => navigate(`/patients/${params.id}`)}>
              View
            </ViewButton>
            <DeleteButton onClick={() => handleDelete(params.row.id)}>
              Delete
            </DeleteButton>
          </Actions>
        );
      },
    },
  ];

  return (
    <Container>
      <GridContainer style={{ height: 400 }}>
        <DataGrid
          rows={rows}
          getRowId={(row) => row.id}
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

export default Patients;

const Container = styled.div`
  margin-top: 50px;
  min-height: 100vh;
`;

const GridContainer = styled.div`
  margin-left: 240px;
`;

const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ViewButton = styled.button`
  background: #3282b8;
  color: #fff;
  padding: 6px 8px;
  border: none;
  outline: none;
  border-radius: 3px;
  cursor: pointer;
  flex: 1;
  margin-right: 12px;
`;

const DeleteButton = styled.button`
  background: #c70039;
  color: #fff;
  padding: 6px 8px;
  border: none;
  outline: none;
  border-radius: 3px;
  cursor: pointer;
  flex: 1;
`;
