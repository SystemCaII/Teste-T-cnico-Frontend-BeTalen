import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import { formatDate, formatPhone } from '../utils/formatters';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const TableContainer = styled.div`
  margin-top: 20px;
  background-color: #ffff;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  @media (max-width: 768px) {
    display: none; 
  }
`;

const TableHeader = styled.th`
  background-color: #003EFF;
  color: #ffff;
  padding: 16px;
  text-align: left;
  font-weight: normal;
  &:first-child {
    border-top-left-radius: 8px;
  }
  &:last-child {
    border-top-right-radius: 8px;
  }
`;
const MobileTableHeader = styled.div`
  background-color: #003EFF;
  color: #fff;
  padding: 16px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  font-weight: bold;
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
    span:last-child {
    padding-left: 130px;
    flex-grow: 1;
  }
`;

const TableRow = styled.tr`
 font-size: 16px;
  &:nth-child(even) {
    background-color: #fffff;
  }
`;

const TableCell = styled.td`
  padding: 8px;
  border-bottom: 1px solid #ddd;
  font-size : 16px;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #ffff;

  @media (min-width: 769px) {
    display: none; 
  }
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column; 
  align-items: stretch; 
  padding: 16px;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const ListAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 16px;
`;

const ListName = styled.span`
  font-weight: bold;
`;

const ListDetails = styled.div`
  flex-grow: 1;
`;

const ListChevron = styled(FiChevronDown)`
  color: #003EFF;
  font-size: 20px;
`;


const EmployeeContainer = styled.div`
  display: flex;
  align-items: center;
  background-color:rgb(255, 255, 255); 
  border-radius: 8px;
  margin-bottom: 10px;
  width: 100%;
  justify-content: space-between; 
`;

const EmployeeAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const EmployeeName = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const DetailsContainer = styled.div`
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-top: 10px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const DetailLabel = styled.span`
  font-weight: bold;
`;

const DetailValue = styled.span``;

interface Employee {
  id: number;
  name: string;
  job: string;
  admission_date: string;
  phone: string;
  image: string;
}

interface TableProps {
  searchTerm: string;
}

const Table: React.FC<TableProps> = ({ searchTerm }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [expandedEmployeeId, setExpandedEmployeeId] = useState<number | null>(null);

  useEffect(() => {
    api.get<Employee[]>('/employees').then(response => {
      setEmployees(response.data);
    });
  }, []);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.job.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.phone.includes(searchTerm)
  );

  const toggleDetails = (employeeId: number) => {
    setExpandedEmployeeId(expandedEmployeeId === employeeId ? null : employeeId);
  };

  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <TableHeader>FOTO</TableHeader>
            <TableHeader>NOME</TableHeader>
            <TableHeader>CARGO</TableHeader>
            <TableHeader>DATA DE ADMISSÃO</TableHeader>
            <TableHeader>TELEFONE</TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map(employee => (
            <TableRow key={employee.id}>
              <TableCell><Avatar src={employee.image} alt={employee.name} /></TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.job}</TableCell>
              <TableCell>{formatDate(employee.admission_date)}</TableCell>
              <TableCell>{formatPhone(employee.phone)}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>

      <ListContainer>
        <MobileTableHeader>
          <span>FOTO</span>
          <span>NOME</span>
        </MobileTableHeader>
        {filteredEmployees.map(employee => (
          <ListItem key={employee.id}>
            <EmployeeContainer onClick={() => toggleDetails(employee.id)}>
              <EmployeeAvatar src={employee.image} alt={employee.name} />
              <EmployeeName>{employee.name}</EmployeeName>
              {expandedEmployeeId === employee.id ? (
                  <FiChevronUp size={20} />
              ) : (
                  <FiChevronDown size={20} />
              )}
            </EmployeeContainer>
            {expandedEmployeeId === employee.id && (
              <DetailsContainer>
                <DetailRow>
                  <DetailLabel>Cargo:</DetailLabel>
                  <DetailValue>{employee.job}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Data de Admissão:</DetailLabel>
                  <DetailValue>{formatDate(employee.admission_date)}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Telefone:</DetailLabel>
                  <DetailValue>{formatPhone(employee.phone)}</DetailValue>
                </DetailRow>
              </DetailsContainer>
            )}
          </ListItem>
        ))}
      </ListContainer>
    </TableContainer>
  );
};

export default Table;
