import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextField, Card, CardContent, Typography } from "@mui/material";
import { getProfile, updateProfile } from "../api/profileApi"; // Adjust this path if necessary

const UpdateAccountScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState<File | null>(null); // Image file
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const userId = 1; // Replace with the actual user ID
        const profile = await getProfile(userId);
        
        setName(profile.name);
        setEmail(profile.email);
        setPhone(profile.phone);
        
        // Assume `profile.image` is a URL or path. Leave `image` as null if no file is being uploaded
        setImage(null); // Only set if there's an actual file input
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    setLoading(true);

    // Create a FormData instance and append necessary fields
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone', phone);

    // Append the image field if available
    if (image) {
      formData.append('image', image); // Add image file if available
    } else {
      formData.append('image', ''); // Placeholder if image is required
    }

    try {
      const userId = 1; // Replace with the actual user ID
      const response = await updateProfile(userId, formData);
      console.log("Profile updated successfully:", response);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h5" textAlign="center" style={styles.heading}>
            Update Account
          </Typography>
          <View style={styles.form}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              style={styles.input}
              variant="outlined"
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              style={styles.input}
              variant="outlined"
            />
            <TextField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              fullWidth
              style={styles.input}
              variant="outlined"
            />
            <TextField
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              fullWidth
              style={styles.input}
              variant="outlined"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdate}
              style={styles.button}
              fullWidth
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </View>
        </CardContent>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  card: {
    width: "100%",
    maxWidth: 500,
    padding: 20,
    borderRadius: 30,
  },
  heading: {
    marginBottom: 20,
    color: "#333",
  },
  form: {
    width: "100%",
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
  },
});

export default UpdateAccountScreen;
