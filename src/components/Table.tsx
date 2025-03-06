import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import { formatDate, formatPhone } from '../utils/formatters';

const TableContainer = styled.div`
  margin-top: 20px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  
`;

const TableHeader = styled.th`
  background-color: #003EFF;
  color: #fff;
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

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #fffff;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

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
    </TableContainer>
  );
};

export default Table;
