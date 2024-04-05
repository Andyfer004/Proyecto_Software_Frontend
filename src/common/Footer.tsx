import React from "react";
import { StyleSheet, Text, View } from "react-native";


const Footer: React.FC = () => {
    return (
        <View style={styles.footer}>
            <Text style={styles.footerText}>FOOTER</Text>
        </View>
    );
};

export default Footer;


const styles = StyleSheet.create({
    
    footer: {
        height: 60,
        width: '100%',
        backgroundColor: '#e9f5db',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute', // Posiciona absolutamente el footer
        bottom: 0, // Alinea el footer a la parte inferior
        left: 0, // Alinea el footer a la izquierda
        right: 0, 
      },
      footerText: {
        fontWeight: 'bold',
        fontSize: 18,
      },
  });
  