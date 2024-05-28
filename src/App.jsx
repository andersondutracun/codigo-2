import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  Button,
  Grid,
  Box,
} from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth, db } from './firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, getDocs } from 'firebase/firestore';

import RegisterAddress from './pages/RegisterAddress';
import EditAddress from './pages/EditAddress';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import UserAddresses from './pages/UserAddresses';

const App = () => {
  const [addresses, setAddresses] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchAddresses = async () => {
      const querySnapshot = await getDocs(collection(db, 'addresses'));
      const addressesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAddresses(addressesList);
    };

    fetchAddresses();
  }, []);

  const addAddress = (address) => {
    setAddresses([...addresses, address]);
  };

  const updateAddress = (index, updatedAddress) => {
    const newAddresses = addresses.slice();
    newAddresses[index] = updatedAddress;
    setAddresses(newAddresses);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <Router>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Space Delivery
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            {user ? (
              <>
                <Button color="inherit" component={Link} to="/register-address">
                  Cadastro de Endereço
                </Button>
                <Button color="inherit" component={Link} to="/user-addresses">
                  Seus Endereços
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/register">
                  Register
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
        <Container style={{ flexGrow: 1 }}>
          <Box my={4} style={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Home />} />
              <Route element={<PrivateRoute />}>
                <Route
                  path="/addresses"
                  element={
                    <div>
                      <Typography variant="h4" gutterBottom>
                        Endereços Cadastrados
                      </Typography>
                      <List>
                        {addresses.map((address, index) => (
                          <ListItem key={index}>
                            <ListItemText primary={address.address} />
                            <Button
                              component={Link}
                              to={`/edit/${address.id}`}
                              variant="contained"
                              color="primary"
                            >
                              Editar
                            </Button>
                          </ListItem>
                        ))}
                      </List>
                    </div>
                  }
                />
                <Route
                  path="/user-addresses"
                  element={<UserAddresses addresses={addresses} />}
                />
                <Route
                  path="/register-address"
                  element={<RegisterAddress onAddAddress={addAddress} />}
                />
                <Route
                  path="/edit-address/:id"
                  element={
                    <EditAddress
                      addresses={addresses}
                      onUpdateAddress={updateAddress}
                    />
                  }
                />
              </Route>
            </Routes>
          </Box>
        </Container>
      </div>
    </Router>
  );
};

export default App;
