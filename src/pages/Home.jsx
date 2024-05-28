import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Home = () => {
  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Bem-vindo à Space Delivery
        </Typography>
        <Typography variant="body1">
          Com a expansão da SpaceX na década de 2050 e o barateamento dos
          custos, a humanidade passou a exportar grande parte da produção e
          estoques de dispositivos eletrônicos para Marte. Estamos aqui para
          facilitar o processo de entrega entre Marte e a Terra.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
