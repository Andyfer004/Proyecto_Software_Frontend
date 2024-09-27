import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from 'src/common/Header';
import Footer from 'src/common/Footer';

// Definición de la interfaz para las props de GlobalLayout
interface GlobalLayoutProps {
  children: React.ReactNode;
}

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children }) => {
  return (
    <View style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
            <Header />
            <View style={styles.content}>{children}</View>
            <Footer />
        </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    width:"100%",
    height:"100%"
  },
  scrollView: {
    width: '100%',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GlobalLayout;
