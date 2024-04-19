import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Grid, Paper, AppBar, Toolbar, Typography, Card, CardContent, IconButton, Box } from "@mui/material";

const DashboardScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>

      <View style={styles.content}>
        <Text style={styles.heading}>Overview</Text>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Card style={styles.card}>
              <CardContent>
                <Text style={styles.cardText}>Total Users: 100</Text>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card style={styles.card}>
              <CardContent>
                <Text style={styles.cardText}>Total remiders</Text>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card style={styles.card}>
              <CardContent>
                <Text style={styles.cardText}>Calendar</Text>
              </CardContent>
            </Card>
          </Grid>
          {/* Add more Grid items for additional dashboard elements */}
        </Grid>
        <Button variant="contained" color="primary" style={styles.button}>
          Create New
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  flex: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    padding: 20,
    height: 100,
    justifyContent: "center",
  },
  cardText: {
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
  },
});

export default DashboardScreen;
