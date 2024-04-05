import React from "react";
import { StyleSheet, Text, View } from "react-native";


const Header: React.FC = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>HEADER</Text>
        </View>
    );
};

export default Header;


const styles = StyleSheet.create({
    
    header: {
      height: 60,
      width: '100%',
      backgroundColor: '#a6c48a',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 36,
      position: 'absolute', // Posiciona absolutamente el header
      top: 0, // Alinea el header a la parte superior
      left: 0, // Alinea el header a la izquierda
      right: 0, 
    },
    headerText: {
      fontWeight: 'bold',
      fontSize: 18,
    }
  });
  