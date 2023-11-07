import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import SectionHeader from './SectionHeader';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { COUNTDOWN_SECONDS, defaultColors, staticIds } from '../Constants';
import { MeshGradient } from 'react-native-patterns';
import ListSpacer from './ListSpacer';

const List = () => {
  const [randomIds, setRandomIds] = useState<string[]>(
    new Array(10).fill(null).map(() => uuid())
  );
  const [countdown, setCountdown] = useState<number>(COUNTDOWN_SECONDS);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (countdown <= 0) {
        setCountdown(COUNTDOWN_SECONDS);
        setRandomIds(new Array(5).fill(null).map(() => uuid()));
        return;
      }
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [countdown]);

  return (
    <SectionList
      bounces={false}
      contentContainerStyle={styles.sectionListContainer}
      sections={[
        { title: 'Static', data: staticIds },
        { title: 'Random', data: randomIds },
      ]}
      renderSectionHeader={({ section: { title } }) => {
        if (title === 'Random') {
          return (
            <SectionHeader
              title={`${title} - Updating ids in ${countdown} seconds`}
            />
          );
        }

        return <SectionHeader title={title} />;
      }}
      keyExtractor={(item, index) => `${index}-${item}`}
      renderItem={({ item, index, section: { title } }) => (
        <View style={styles.itemContainer}>
          <MeshGradient
            uniqueKey={item}
            width={50}
            height={50}
            blurRadius={title === 'Random' ? Number(`0.${index}`) : 0.3}
            colors={title === 'Random' ? undefined : defaultColors}
            style={{ borderRadius: 10 }}
          />
          <Text style={styles.itemText}>{item}</Text>
        </View>
      )}
      ItemSeparatorComponent={() => (
        <ListSpacer orientation="vertical" size={10} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  sectionListContainer: {
    paddingBottom: 100,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 10,
  },
  itemText: {
    fontSize: 10,
  },
});

export default List;
