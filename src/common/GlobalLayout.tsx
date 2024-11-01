import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from './Header';
import Footer from './Footer';

interface GlobalLayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean; // Agregamos la prop hideFooter
}

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children, hideFooter }) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Header />
        <View style={styles.content}>{children}</View>
        {!hideFooter && <Footer />} {/* Footer solo se muestra si hideFooter es false o undefined */}
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
    width: "100%",
    height: "100%"
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
