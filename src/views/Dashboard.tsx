import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Grid, Paper } from "@mui/material";

const DashboardScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Dashboard</Text>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper elevation={3} style={styles.paper}>
            <Text style={styles.paperText}>Total Users: 100</Text>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} style={styles.paper}>
            <Text style={styles.paperText}>Total Orders: 50</Text>
          </Paper>
        </Grid>
        {/* Add more Grid items for additional dashboard elements */}
      </Grid>
      <Button variant="contained" color="primary" style={styles.button}>
        Create New
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  paper: {
    padding: 20,
    textAlign: "center",
    height: 100,
    justifyContent: "center",
  },
  paperText: {
    fontSize: 18,
  },
  button: {
    marginTop: 20,
  },
});

export default DashboardScreen;
