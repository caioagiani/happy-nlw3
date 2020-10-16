import React, { useState } from 'react';
import { StyleSheet, Text, View , Dimensions } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import mapMarker from '../images/map-marker.png';

import api from '../services/api';

interface OrphanagesItem {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const OrphanagesMap: React.FC = () => {
  const navigation = useNavigation();

  const [orphanages, setOrphanages] = useState<OrphanagesItem[]>([]);

  useFocusEffect(() => {
    api.get('/orphanages').then(({ data }) => {
      setOrphanages(data)
    })
  });

  const handleNavigationToOrphanagesDetails = (id: number) => {
    navigation.navigate('OrphanageDetails', { id }); 
  }

  const handleToCreateOrphanage = () => {
    navigation.navigate('SelectMapPosition');
  }

  return (
    <View style={styles.container}>
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.map} 
        initialRegion={{ 
          latitude: -23.5077632,
          longitude: -46.2979072, 
          latitudeDelta: 0.008, 
          longitudeDelta:  0.008
        }} 
      >

        {orphanages.map(orphanage => {
          return (
            <Marker 
              key={orphanage.id}
              icon={mapMarker}
              calloutAnchor={{
                x: 2.7,
                y: 0.9
              }}
              coordinate={{
                latitude: orphanage.latitude, 
                longitude: orphanage.longitude, 
              }}
            >
              <Callout tooltip onPress={() => { handleNavigationToOrphanagesDetails(orphanage.id) }}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>
            </Marker>
          )
        })}
      
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} Orfanatos encontrados</Text>
        
        <RectButton style={styles.createOrphanageButton} onPress={handleToCreateOrphanage}>
          <Feather name='plus' size={20} color='#fff' />
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center'
  },

  calloutText: {
    color: '#0089a5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold'
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#fff',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3
  },

  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8fa7b3'
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default OrphanagesMap;