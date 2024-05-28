import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddressForm from '../components/AddressForm';
import { Container, Typography, Grid, Box } from '@mui/material';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const RegisterAddress = ({ onAddAddress }) => {
  const navigate = useNavigate();

  const handleSave = async (address, cep, addressType) => {
    try {
      const data = { address };
      if (addressType === 'Terra') {
        data.cep = cep;
      }
      if (addressType) {
        data.addressType = addressType;
      }
      await addDoc(collection(db, 'addresses'), data);
      onAddAddress(data);
      navigate('/'); // Volta para a página inicial após salvar
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  return (
    <Container>
      <Box my={4}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              Cadastro de Endereço
            </Typography>
            <AddressForm onSave={handleSave} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default RegisterAddress;
