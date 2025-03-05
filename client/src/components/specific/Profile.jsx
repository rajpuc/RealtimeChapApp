import { Avatar, Stack, Typography } from "@mui/material";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import React from "react";
import moment from 'moment'


const Profile = () => {
  return (
    <Stack direction={"column"} alignItems={"center"} spacing={"2rem"}>
      <Avatar
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard heading={"Bio"} text={"lorem ipsum so what things"} />
      <ProfileCard heading={"Username"} text={"rajeshjoy"} Icon={<UserNameIcon/>}/>
      <ProfileCard heading={"Name"} text={"Rajesh Pal Ajoy"} Icon={<FaceIcon/>} />
      <ProfileCard heading={"Joined"} text={moment('2025-03-02T03:35:17.058Z').fromNow()} Icon={<CalendarIcon/>} />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    color={"white"}
    textAlign={"center"}
  >
    {Icon && Icon}
    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography color={"gray"} variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
