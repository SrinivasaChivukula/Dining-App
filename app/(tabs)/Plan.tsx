import React, {useEffect, useState } from 'react';
import { StyleSheet, Image, Platform, Text, View, Button, Linking, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore"
import Ionicons from '@expo/vector-icons/Ionicons';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


//Ionicons size={310} name="code-slash" style={styles.headerImage}
//headerImage={<Text style={styles.headerText}>UNT</Text>}

//<Image source={require('@/assets/images/unt-banner.png')} style={{ alignSelf: 'center' }} />

/*
headerBackgroundColor={{ light: '#38CB82', dark: '#198450' }}
headerImage={<Image source={require('@/assets/images/unt-banner.png')} style={styles.headerImage}>
*/
const PlanScreen = () => {

  const navigation = useNavigation();
  const [data, setData] = useState<any[]>([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await db.collection('breakfast').get(); //Breakfast is just one collection name
        const documents = snapshot.docs.map(doc => doc.data());
        setData(documents);
      } catch (error) {
        console.error("Error fetching Firestore data: ", error);
      }
    };

    fetchData();
  }, []);
  const homeButtonPress = () => {
    //navigation.navigate('Calculate'); // Navigating to the 'Calculate' tab
    navigation.navigate('index');
  };

  return (
    
      
      <View style={styles.headerText}>
      <ThemedView style={styles.mainContent}>
        <ThemedText>Plan functionality</ThemedText>
      </ThemedView>
      
      <TouchableOpacity 
        style={styles.button3} //changes the style of the button to the button style at the bottom
        onPress={homeButtonPress} //takes you to calculate tab when pressed
        > 

          <Text style={styles.buttonText3}>Back Home</Text>

        </TouchableOpacity>

        <View style={styles.mainContent}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText>Plan Functionality</ThemedText>
      </ThemedView>

      {/* Scrollable Box */}
      <ScrollView style={styles.scrollBox}>
        <Text style={styles.scrollText}>This is an example of scrollable text. Add more content here to see the scrolling effect.</Text>
        <Text style={styles.scrollText}>You can add multiple lines of text or even other components to fill this scrollable box.</Text>
        <Text style={styles.scrollText}>This box allows for vertical scrolling if the content exceeds the height of the box.</Text>
        {data.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.name}</Text> {/* Change 'name' to the appropriate field in your Firestore data */}
            </View>
          ))}
      </ScrollView>

      <TouchableOpacity style={styles.button3} onPress={homeButtonPress}>
        <Text style={styles.buttonText3}>Back Home</Text>
      </TouchableOpacity>
    </View>



      </View>
  
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 310,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: '70%',
    height: '70%', // Adjust as needed for your image size
    resizeMode: 'contain',
    position: 'absolute',
  },
  titleContainer: {
    backgroundColor: 'lightgreen',
    flexDirection: 'row',
    gap: 8,
  },
  headerText: {
    fontSize: 130, //title font size
    color: 'white',  //title colour or color if your AmERicAn
    textAlign: 'center',
    marginTop: 60, //distance from top of screen
  },
  mainContent: {
    backgroundColor: 'lightgreen', // Set your desired background color here
    padding: 50,
  },
  scrollBox: {
    height: 600, // Set the height for your scrollable area
    width: '90%', // Set the width for your scrollable area
    backgroundColor: '#FFFFFF', // Background color for the scrollable box
    padding: 10,
    marginBottom: 20,
  },
  scrollText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10, // Space between paragraphs
  },
  button3: {
    backgroundColor: '#808080', // Set your desired button color here
    width: 200,
    height: 100,
    borderRadius: 1, // Make it a circle
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button2: {
    backgroundColor: '#808080', // Set your desired button color here
    width: 300,
    height: 300,
    borderRadius: 1, // Make it a circle
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText3: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  buttonText2: {
    fontSize: 70,
    color: 'white',
    fontWeight: 'bold',
  },
  itemContainer: {
    padding: 10, 
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
  },
  itemText: {
    fontSize: 18,
  },
});

export default PlanScreen