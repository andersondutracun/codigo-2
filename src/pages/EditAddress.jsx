import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddressForm from '../components/AddressForm';
import { Container, Typography, Grid, Box } from '@mui/material';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const EditAddress = ({ onUpdateAddress }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [address, setAddress] = useState('');
  const [world, setWorld] = useState('');

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        console.log('ID do endereço:', id); // Verifica o valor de id
        const addressDoc = await getDoc(doc(db, 'addresses', id));
        if (addressDoc.exists()) {
          const data = addressDoc.data();
          console.log('Dados do endereço:', data); // Verifica os dados do endereço recuperado
          setAddress(data.address);
          setWorld(data.world); // Define o mundo do endereço
        } else {
          console.error('Document not found');
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    };

    fetchAddress();
  }, [id]);

  const handleSave = async (updatedAddress) => {
    try {
      const addressDoc = doc(db, 'addresses', id);
      await updateDoc(addressDoc, { address: updatedAddress, world }); // Salva o endereço e o mundo
      onUpdateAddress(id, updatedAddress);
      navigate('/'); // Volta para a página inicial após salvar
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  return (
    <Container>
      <Box my={4}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              Edição de Endereço
            </Typography>
            <AddressForm initialAddress={address} onSave={handleSave} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default EditAddress;
