import React from "react";
import styles from "./leaderList.module.css";
import { ListItem } from "./listItem";

const colorPlace = {
  first: "rgba(254, 181, 71, 0.68)",
  second: "rgba(180, 180, 180,  0.68)",
  third: "rgba(173, 138, 86,  0.68)",
  other: "rgba(255, 255, 255,  0.68)",
};

export const ListLeader = ({ arrayList }) => {
  const listItems = arrayList
    .sort((a, b) => b.score - a.score)
    .map((data, index) => {
      const place = index + 1;

      return (
        <ListItem
          key={data.id}
          name={data.name}
          rank={place}
          color={
            place === 1
              ? colorPlace.first
              : place === 2
              ? colorPlace.second
              : place === 3
              ? colorPlace.third
              : colorPlace.other
          }
          score={data.score}
        />
      );
    });
  return (
    <>
      <div className={styles.listTopNames}>
        <div className={`${styles.rank} ${styles.cellLeader} `}>
          <p>rank</p>
        </div>
        <div className={`${styles.name} ${styles.cellLeader} `}>
          <p>name</p>
        </div>
        <div className={`${styles.score} ${styles.cellLeader} `}>
          <p>score</p>
        </div>
      </div>
      <div className={styles.containerScroll}>{listItems}</div>
    </>
  );
};
