import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import axios from 'axios';

const AddressForm = ({ initialAddress = '', onSave }) => {
  const [addressType, setAddressType] = useState('Marte'); // Valor padrão 'Marte'
  const [address, setAddress] = useState(initialAddress);
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(address, addressType); // Chama a função onSave com o endereço atual e o tipo de endereço
  };

  const handleChange = (e) => {
    setAddress(e.target.value); // Atualiza o endereço conforme o usuário digita
  };

  const handleCepChange = async (e) => {
    const newCep = e.target.value;
    setCep(newCep);

    if (newCep.length === 8) {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${newCep}/json/`,
        );
        const data = response.data;
        setAddress(
          `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`,
        );
      } catch (error) {
        console.error('Error fetching address:', error);
      }
      setLoading(false);
    }
  };

  const handleAddressTypeChange = (event, newAddressType) => {
    if (newAddressType !== null) {
      setAddressType(newAddressType);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <ToggleButtonGroup
        value={addressType}
        exclusive
        onChange={handleAddressTypeChange}
        aria-label="Tipo de Endereço"
      >
        <ToggleButton value="Marte" aria-label="Marte">
          Marte
        </ToggleButton>
        <ToggleButton value="Terra" aria-label="Terra">
          Terra
        </ToggleButton>
      </ToggleButtonGroup>
      {addressType === 'Terra' && (
        <>
          <TextField
            fullWidth
            label="CEP"
            value={cep}
            onChange={handleCepChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Endereço"
            value={address}
            onChange={handleChange}
            disabled={loading}
            required
            margin="normal"
          />
          {/* Adicione outros campos de endereço conforme necessário */}
        </>
      )}
      {addressType === 'Marte' && (
        <TextField
          fullWidth
          label="Endereço (lote de 4 dígitos em Marte)"
          value={address}
          onChange={handleChange} // Chama a função handleChange ao modificar o texto
          inputProps={{ pattern: '\\d{4}' }} // Aceita apenas 4 dígitos em Marte
          required
          margin="normal"
        />
      )}
      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary">
          Salvar
        </Button>
      </Box>
    </Box>
  );
};

export default AddressForm;
