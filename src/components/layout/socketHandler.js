import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addNewRoom,
  changeDescription,
  changeName,
  removeRoom,
  updateLeaderboard
} from "../../redux/feature/reducer";
import { socket } from "../../socket";

export const SocketHandler = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // This is demo data. Please remove it when run on production
    dispatch(updateLeaderboard({
      roomID: "31991a9e-5c66-46f8-b62b-a3f49c68ccf2",
      leaderboard: [
        {
          name: "Matthew Choi",
          class: "4B",
          score: 500,
          state: "connected"
        },
        {
          name: "Stephen Yip",
          class: "3B",
          score: 400,
          state: "disconnected"
        },
        {
          name: "Edison chan",
          class: "4B",
          score: 300,
          state: "connected"
        },
        {
          name: "Francis Lo",
          class: "4B",
          score: 300,
          state: "connected"
        },
      ]
    }));

    // Room page
    socket.on("addRoom", (data) => {
      dispatch(addNewRoom(data));
    });
    socket.on("removeRoom", (data) => {
      dispatch(removeRoom(data));
    });

    // Dashboard
    socket.on("updateRoomDescription", (data) => {
      dispatch(changeDescription(data));
    });
    socket.on("updateRoomName", (data) => {
      dispatch(changeName(data));
    });

    // Leader page
    socket.on("updateLeaderboard", (data) => {
      dispatch(updateLeaderboard(data));
    });

    /**
     * Off event
     */
    return () => {
      // Room page
      socket.off("addRoom", (data) => {
        console.log(data);
      });
      socket.off("removeRoom", (data) => {
        console.log(data);
      });

      // Dashboard
      socket.off("updateRoomName", (data) => {
        console.log("updateRoomName", data);
      });
      socket.off("updateRoomDescription", (data) => {
        console.log("updateRoomDescription", data);
      });

      // Leader page
      socket.off("updateLeaderboard", (data) => {
        console.log(data);
      });
    };
  }, [dispatch]);

  return (
    <div></div>
  );
}