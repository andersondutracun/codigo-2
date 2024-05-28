import React from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const UserAddresses = ({ addresses, onDeleteAddress }) => {
  const handleDelete = async (id) => {
    try {
      if (!id) {
        console.error('ID do endereço não está definido');
        return;
      }
      await deleteDoc(doc(db, 'addresses', id));
      onDeleteAddress(id);
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Seus Endereços Cadastrados
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Endereço</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {addresses.map((address) => (
              <TableRow key={address.id}>
                <TableCell>{address.address}</TableCell>
                <TableCell>{address.addressType}</TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    to={`/edit-address/${address.id}`}
                    variant="contained"
                    color="primary"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(address.id)}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserAddresses;
