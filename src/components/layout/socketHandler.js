import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  updateUser,
  addNewRoom,
  removeRoom,
  changeDescription,
  changeName,
  updateSetting,
  addSeat,
  removePlayer,
  updateLeaderboard
} from "../../redux/feature/reducer";
import { socket } from "../../socket";
import { useHistory } from "react-router-dom";

export const SocketHandler = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // This is demo data. Please remove it when run on production
    dispatch(updateLeaderboard({
      roomID: "1885e5c6-581c-439a-91b8-59bc73755622",
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

    // User
    socket.on("loadUser", (data) => {
      dispatch(updateUser(data));
    });
    socket.on("updateUserDetail", (data) => {
      dispatch(updateUser(data));
    });

    // Room
    socket.on("addRoom", (data) => {
      dispatch(addNewRoom(data));
    });
    socket.on("removeRoom", (data) => {
      dispatch(removeRoom(data));
    });

    // Dashboard
    socket.on("updateRoomName", (data) => {
      dispatch(changeName(data));
    });
    socket.on("updateRoomDescription", (data) => {
      dispatch(changeDescription(data));
    });

    // Option
    socket.on("updateRoomSetting", (data) => {
      dispatch(updateSetting(data));
    });

    // Player
    socket.on("addRoomSeat", (data) => {
      dispatch(addSeat(data));
    });
    socket.on("removeRoomSeat", (data) => {
      dispatch(removePlayer(data));
    });

    // Leader page
    socket.on("updateLeaderboard", (data) => {
      dispatch(updateLeaderboard(data));
    });

    // Error handler
    socket.on("connect_error", (err) => {
      if (err.message.indexOf('JsonWebTokenError') > -1) {
        history.push("/login");
      }
      console.log(err.message);
    });

    socket.on("error", (err) => {
      if (err.message.indexOf('JsonWebTokenError') > -1) {
        history.push("/login");
      }
      console.log(err.message);
    });

    // Component unmount
    return () => {

    };
  }, [dispatch, history]);

  return (
    <div></div>
  );
}